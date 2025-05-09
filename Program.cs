using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Dynamic;
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
          if (request.Path == "verifyUserId")
          {
            var userId = request.GetBody<string>();

            var exists = database.Users.Any(user => user.Id == userId);

            response.Send(exists);
          }
          else if (request.Path == "signUp")
          {
            var (username, password) = request.GetBody<(string, string)>();

            var exists = database.Users.Any(user => user.Username == username);

            string? userId = null;

            if (!exists)
            {
              userId = Guid.NewGuid().ToString();
              var user = new User(userId, username, password);
              database.Users.Add(user);
            }

            response.Send(userId);
          }
          else if (request.Path == "logIn")
          {
            var (username, password) = request.GetBody<(string, string)>();

            var user = database.Users
              .FirstOrDefault(user => user.Username == username && user.Password == password);

            response.Send(user?.Id);
          }
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
}


class Database() : DbBase("database")
{
  /*──────────────────────────────╮
  │ Add your database tables here │
  ╰──────────────────────────────*/
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