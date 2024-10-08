
using Microsoft.Extensions.DependencyInjection;
using System;

public class Program
{
    static void Main(string[] args)
    {
        var serviceProvider = new ServiceCollection()
            .AddTransient<ILogger, ConsoleLogger>()
            .AddTransient<FileLogger>(sp => new FileLogger("C:\\Users\\akash.settukannu\\OneDrive - Claysys Technologies Pvt Ltd -1\\Desktop\\training_projects\\training-projects\\c_sharp-training\\cSharp_training-projects\\Interface\\Interface\\log.txt"))
            .BuildServiceProvider();

        var logger = serviceProvider.GetService<ILogger>();
        var fileLogger = serviceProvider.GetService<FileLogger>();

        logger.LogInfo("This is an info message from ConsoleLogger");
        logger.LogWarning("This is a warning message from ConsoleLogger");
        logger.LogError("This is an error message from ConsoleLogger");

        fileLogger.LogInfo("This is an info message from FileLogger");
        fileLogger.LogWarning("This is a warning message from FileLogger");
        fileLogger.LogError("This is an error message from FileLogger");
    }
}