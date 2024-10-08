using System;
using System.IO;

public class FileLogger : ILogger
{
    private readonly string _filePath;

    public FileLogger(string filePath)
    {
        _filePath = filePath;
    }

    public void LogInfo(string message)
    {
        LogToFile("INFO", message);
    }

    public void LogWarning(string message)
    {
        LogToFile("WARNING", message);
    }

    public void LogError(string message)
    {
        LogToFile("ERROR", message);
    }

    private void LogToFile(string logType, string message)
    {
        using (StreamWriter writer = new StreamWriter(_filePath, true))
        {
            writer.WriteLine($"{logType}: {message} - {DateTime.Now}");
        }
    }
}