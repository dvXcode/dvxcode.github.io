---
title: "How to use User Secrets and JSON file configuration in an Azure Functions app"
categories:
  - Blog
tags:
  - BestPractice
  - AzureFunction
  - UserSecrets
---

To use User Secrets in an Azure Functions app, you need to first install the Microsoft.Extensions.Configuration.UserSecrets package from NuGet. This will also add a GUID to your project file. Once this is done, you can use User Secrets as you normally would through Visual Studio or the .NET CLI.

Note that the code sample below includes a call to the AddUserSecrets method. If you do not plan to use User Secrets, you can skip this step and remove the call to the AddUserSecrets method.

To use a JSON file for configuration, you can create the JSON file and then use the following code sample to read from it:

```cs
using My.Project;

// register assembly
[assembly: FunctionsStartup(typeof(Startup))]
namespace My.Project
{
    // inherit FunctionsStartup
    public class Startup : FunctionsStartup
    {
        // override configure method
        public override void Configure(IFunctionsHostBuilder builder)
        {
            var config = new ConfigurationBuilder()
               .SetBasePath(Environment.CurrentDirectory)
               .AddJsonFile("appsettings.json", false)
               .AddUserSecrets(Assembly.GetExecutingAssembly(), false)
               .AddEnvironmentVariables()
               .Build();

            builder.Services.AddSingleton<IConfiguration>(config);
            
            // register your other services
        }
    }
}
```

This code creates a new ConfigurationBuilder and sets the base path to the current directory. It then adds the JSON file, User Secrets, and environment variables to the configuration. The resulting configuration is then used to register the IConfiguration service in the DI container.
To access the IConfiguration service in an Azure Functions app, you can use dependency injection (DI). Here's an example of how you can do this in an Azure Functions app that uses the Startup class:
```cs
public static class MyFunction
{
    [FunctionName("MyFunction")]
    public static void Run(
        [HttpTrigger(AuthorizationLevel.Function, "get", "post", Route = null)] HttpRequest req,
        ILogger log,
        [Inject] IConfiguration config)
    {
        // Use the config object to access User Secrets or JSON file configuration values
        var mySecret = config["MySecret"];
        log.LogInformation($"My secret value is: {mySecret}");
    }
}
```
In this example, the IConfiguration service is injected into the MyFunction Azure Functions using the [Inject] attribute. You can then use the config object to access the User Secrets or JSON file configuration values.

I hope this helps clarify how to access the IConfiguration service in an Azure Functions app.
