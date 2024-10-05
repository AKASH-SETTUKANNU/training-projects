using System;
using System.Timers;
using Timer = System.Timers.Timer;

public class Clock
{
    public event EventHandler OnTick;
    private Timer timer;

    public Clock()
    {
        timer = new Timer(1000);
        timer.Elapsed += Tick;
        timer.AutoReset = true;
    }

    public void Start()
    {
        timer.Start();
    }

    public void Stop()
    {
        timer.Stop();
    }

    private void Tick(object sender, ElapsedEventArgs e)
    {
        OnTick?.Invoke(this, EventArgs.Empty);
    }
}

public class Display
{
    public void Subscribe(Clock clock)
    {
        clock.OnTick += ShowTime;
    }

    private void ShowTime(object sender, EventArgs e)
    {
        Console.WriteLine($"Event triggered by: {sender.GetType().Name}");
        Console.WriteLine($"Current time: {DateTime.Now}");
    }
}

class Program
{
    static void Main(string[] args)
    {
        Clock clock = new Clock();
        Display display = new Display();

        display.Subscribe(clock);

        clock.Start();

        Console.WriteLine("Press Enter to stop the clock.");
        Console.ReadLine();

        clock.Stop();
    }
}
