using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;

class Program
{
  static void Main()
  {
    int port = 5555;

    var server = new Server(port);

    Console.WriteLine("The server is running");
    Console.WriteLine($"Main Page: http://localhost:{port}/website/pages/index.html");

    var database = new Database();

    while (true)
    {
      (var request, var response) = server.WaitForRequest();

      Console.WriteLine($"Received a request with the path: {request.Path}");

      if (File.Exists(request.Path))
      {
        var file = new File(request.Path);
        response.Send(file);
      }
      else if (request.Path == "/api/auth/register" && request.HttpMethod == "POST")
      {
        try
        {
          // Read request body
          string requestBody = request.GetBodyString();
          var userData = JsonSerializer.Deserialize<UserRegistrationRequest>(requestBody);
          
          if (userData == null || string.IsNullOrWhiteSpace(userData.Username) || string.IsNullOrWhiteSpace(userData.Password))
          {
            // Bad request - missing data
            response.SetStatusCode(400);
            response.Send("{ \"success\": false, \"message\": \"Username and password are required\" }");
            continue;
          }

          // Check if username already exists
          var existingUser = database.Users.FirstOrDefault(u => u.Username == userData.Username);
          if (existingUser != null)
          {
            // Conflict - username already exists
            response.SetStatusCode(409);
            response.Send("{ \"success\": false, \"message\": \"Username already exists\" }");
            continue;
          }

          // Hash the password
          string hashedPassword = HashPassword(userData.Password);
          
          // Create new user
          var user = new User(Guid.NewGuid().ToString(), userData.Username, hashedPassword);
          database.Users.Add(user);
          database.SaveChanges();

          // Return success
          response.Send("{ \"success\": true, \"message\": \"Registration successful\" }");
        }
        catch (Exception ex)
        {
          Console.WriteLine($"Registration error: {ex.Message}");
          response.SetStatusCode(500);
          response.Send("{ \"success\": false, \"message\": \"Server error\" }");
        }
      }
      else if (request.Path == "/api/auth/login" && request.HttpMethod == "POST")
      {
        try
        {
          // Read request body
          string requestBody = request.GetBodyString();
          var loginData = JsonSerializer.Deserialize<UserLoginRequest>(requestBody);
          
          if (loginData == null || string.IsNullOrWhiteSpace(loginData.Username) || string.IsNullOrWhiteSpace(loginData.Password))
          {
            // Bad request - missing data
            response.SetStatusCode(400);
            response.Send("{ \"success\": false, \"message\": \"Username and password are required\" }");
            continue;
          }

          // Find user
          var user = database.Users.FirstOrDefault(u => u.Username == loginData.Username);
          if (user == null || !VerifyPassword(loginData.Password, user.Password))
          {
            // Unauthorized - invalid credentials
            response.SetStatusCode(401);
            response.Send("{ \"success\": false, \"message\": \"Invalid username or password\" }");
            continue;
          }

          // Generate a simple token (in production, use JWT)
          string token = GenerateToken(user);

          // Return success with token
          response.Send("{ \"success\": true, \"token\": \"" + token + "\" }");
        }
        catch (Exception ex)
        {
          Console.WriteLine($"Login error: {ex.Message}");
          response.SetStatusCode(500);
          response.Send("{ \"success\": false, \"message\": \"Server error\" }");
        }
      }
      else if (request.ExpectsHtml())
      {
        var file = new File("website/pages/404.html");
        response.SetStatusCode(404);
        response.Send(file);
      }
      else
      {
        try
        {
          response.SetStatusCode(405);
          database.SaveChanges();
        }
        catch (Exception exception)
        {
          Log.WriteException(exception);
        }
      }

      response.Close();
    }
  }

  // Helper method to hash passwords
  private static string HashPassword(string password)
  {
    using (var sha256 = SHA256.Create())
    {
      var hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
      return Convert.ToBase64String(hashedBytes);
    }
  }

  // Helper method to verify passwords
  private static bool VerifyPassword(string password, string hashedPassword)
  {
    string hashedInput = HashPassword(password);
    return hashedInput == hashedPassword;
  }

  // Helper method to generate a simple token
  private static string GenerateToken(User user)
  {
    // In production, use a proper JWT library
    string tokenData = $"{user.Id}:{user.Username}:{DateTime.UtcNow.AddDays(1).Ticks}";
    byte[] tokenBytes = Encoding.UTF8.GetBytes(tokenData);
    return Convert.ToBase64String(tokenBytes);
  }
}

// Request models
class UserRegistrationRequest
{
  public required string Username { get; set; }
  public required string Password { get; set; }
}

class UserLoginRequest
{
  public required string Username { get; set; }
  public required string Password { get; set; }
}

class Database : DbBase
{
  public Database() : base("database") { }
  
  public DbSet<User> Users { get; set; }
}

class User
{
  // Default constructor for EF Core
  public User() { }

  public User(string id, string username, string password)
  {
    Id = id;
    Username = username;
    Password = password;
  }
  
  [Key] public string Id { get; set; }
  public string Username { get; set; }
  public string Password { get; set; }  // Stores hashed password
}