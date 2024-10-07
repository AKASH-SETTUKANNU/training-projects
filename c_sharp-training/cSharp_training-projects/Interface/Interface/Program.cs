using Interface;

public class Program
{
    public static void Main()
    {
        Icar myCar = new Tata();

        Console.WriteLine("Enter the Car name: ");
        myCar.Name = Console.ReadLine();

        Console.WriteLine("Enter the Color:");
        myCar.Color = Console.ReadLine();

        Console.WriteLine("Enter the Car year: ");
        myCar.year = Console.ReadLine();

        myCar.start();

        Console.WriteLine("Enter the Speed to accelerate:");
        int speed = 0;
        while(!int.TryParse(Console.ReadLine(),out  speed))
        {

            Console.WriteLine("Enter the valid Input");
        }
        myCar.Accelerate(speed);

        myCar.stop();





    }
}