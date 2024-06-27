﻿using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Utils;
using File = Utils.File;

class Program
{
  static void Main()
  {
    int port = 5000;

    var server = new Server(port);

    Console.WriteLine($"The server is running");
    Console.WriteLine($"Main Page: http://localhost:{port}/website/index.html");

    var database = new Database("database");

    while (true)
    {
      (var request, var response) = server.WaitForRequest();

      Console.WriteLine($"Recieved a request with the path: {request.Path}");

      var file = File.Read(request.Path);

      if (file != null)
      {
        response.Send(file);
      }
      else if (request.ExpectsHtml())
      {
        file = File.Read("website/404.html");
        response.Send(file, 404);
      }
      else
      {
        try
        {
          /*──────────────────────────────────╮
          │ Handle your custome requests here │
          ╰──────────────────────────────────*/
          if (request.Path == "hello")
          {
            string name = request.GetBody<string>();
            response.Send($"Hello there, {name}!");
          }

          database.SaveChanges();
        }
        catch (Exception exception)
        {
          Log.PrintException(exception);
        }
      }

      response.Close();
    }
  }
}

class Database(string name) : DbBase(name)
{
  /*──────────────────────────────╮
  │ Add your database tables here │
  ╰──────────────────────────────*/
  public DbSet<User> Users { get; set; }
}

public class User(string id, string name, int age)
{
  [Key] public string Id { get; set; } = id;
  public string Name { get; set; } = name;
  public int Age { get; set; } = age;
}
