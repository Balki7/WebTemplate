using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

class Program
{
  static void Main()
  {
    int port = 5001;

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
          else if (request.Path == "addcar")
          {
            var body = request.GetBody<Dictionary<string, object>>();

            if (!body.TryGetValue("userId", out var userIdObj) || userIdObj == null)
            {
              response.SetStatusCode(401);
              response.Send("Missing user ID.");
            }
            else
            {
              var userId = userIdObj.ToString() ?? "";

              var car = new Car
              {
                Id = Guid.NewGuid().ToString(),
                UserId = userId,
                name = body["name"]?.ToString() ?? "",
                model = body["model"]?.ToString() ?? "",
                price = int.TryParse(body["price"]?.ToString(), out var p) ? p : 0,
                year = int.TryParse(body["year"]?.ToString(), out var y) ? y : 0,
                Horsepower = body["Horsepower"]?.ToString() ?? ""
              };

              database.Cars.Add(car);
              response.Send(new { success = true });
            }
          }
          else if (request.Path == "getcars")
          {
            var body = request.GetBody<Dictionary<string, object>>();

            if (!body.TryGetValue("userId", out var userIdObj) || userIdObj == null)
            {
              response.SetStatusCode(401);
              response.Send("Missing user ID.");
            }
            else
            {
              var userId = userIdObj.ToString() ?? "";

              var userCars = database.Cars
                  .Where(car => car.UserId == userId)
                  .Select(car => new
                  {
                    car.name,
                    car.model,
                    car.price,
                    car.year,
                    car.Horsepower
                  })
                  .ToList();

              response.Send(new { cars = userCars });
            }
          }
          else if (request.Path == "getallcars")
          {
            var allCars = database.Cars
                .Select(car => new
                {
                  car.name,
                  car.model,
                  car.price,
                  car.year,
                  car.Horsepower
                })
                .ToList();
            response.Send(new { cars = allCars });
          }
          else if (request.Path == "saveComparison")
          {
            var body = request.GetBody<Dictionary<string, object>>();


            var categoriesJsonRaw = "";
            if (body.TryGetValue("categoriesJson", out var catJsonObj) && catJsonObj != null)
            {
              categoriesJsonRaw = catJsonObj.ToString() ?? "";
            }

            try
            {
              if (string.IsNullOrWhiteSpace(categoriesJsonRaw))
              {
                categoriesJsonRaw = "{}";
              }
              else
              {
                using var jsonDoc = JsonDocument.Parse(categoriesJsonRaw);
              }
            }
            catch (JsonException)
            {
              categoriesJsonRaw = "{}";
            }

            var history = new ComparisonHistory
            {
              Id = Guid.NewGuid().ToString(),
              UserId = body["userId"]?.ToString() ?? "",
              LeftCarName = body["leftCar"]?.ToString() ?? "",
              RightCarName = body["rightCar"]?.ToString() ?? "",
              WinningCarName = body["winner"]?.ToString() ?? "",
              CategoriesJson = categoriesJsonRaw,
              Timestamp = DateTime.Now
            };

            database.ComparisonHistories.Add(history);
            response.Send(new { success = true });
          }
          else if (request.Path == "getComparisonHistory")
          {
            var userId = request.GetBody<string>();
            var history = database.ComparisonHistories
              .Where(h => h.UserId == userId)
              .OrderByDescending(h => h.Timestamp)
              .ToList();
            response.Send(history);
          }
          else if (request.Path == "getusername")
          {
            var userId = request.GetBody<string>();
            var user = database.Users.FirstOrDefault(u => u.Id == userId);
            response.Send(new { username = user?.Username });
          }
          else
          {
            response.SetStatusCode(405);
          }

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
  public DbSet<User> Users { get; set; } = default!;
  public DbSet<Car> Cars { get; set; } = default!;
  public DbSet<ComparisonHistory> ComparisonHistories { get; set; } = default!;
}

class User(string id, string username, string password)
{
  [Key] public string Id { get; set; } = id;
  public string Username { get; set; } = username;
  public string Password { get; set; } = password;
}

class Car
{
  [Key] public string Id { get; set; } = "";
  public string UserId { get; set; } = "";
  public string name { get; set; } = "";
  public string model { get; set; } = "";
  public int price { get; set; }
  public int year { get; set; }
  public string Horsepower { get; set; } = "";
}

class ComparisonHistory
{
  [Key] public string Id { get; set; } = "";
  public string UserId { get; set; } = "";
  public string LeftCarName { get; set; } = "";
  public string RightCarName { get; set; } = "";
  public string WinningCarName { get; set; } = "";
  public string CategoriesJson { get; set; } = ""; // Stores color info like: { "price": "green", ... }
  public DateTime Timestamp { get; set; }
}