using Abstract;

class Program
{
    public static void Main()
    {
        Console.WriteLine("Enter the Radius of the Circle:");
        double result = 0;
        double radius = 0;
        while (!double.TryParse(Console.ReadLine(), out  radius))
        {
            Console.WriteLine("Enter the valid input;");
        }

        Shape circleArea = new Circle();

        result=circleArea.getArea(radius);

        Console.WriteLine(result);

    }
}
