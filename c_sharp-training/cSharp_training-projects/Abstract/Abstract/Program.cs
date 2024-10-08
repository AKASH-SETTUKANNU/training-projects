using System;

namespace AbstractShapes
{
    class Program
    {
        public static void Main()
        {
            Console.WriteLine("Enter the option to Find:");
            Console.WriteLine("1. Get the Area of Circle.");
            Console.WriteLine("2. Get The Area of Rectangle");

            int option;
            if (int.TryParse(Console.ReadLine(), out option))
            {
                AbstractClass shape = null;

                switch (option)
                {
                    case 1:
                        Console.WriteLine("Enter the Radius of the Circle: ");
                        double radius = double.Parse(Console.ReadLine());
                        shape = new Circle(radius);
                        break;

                    case 2:
                        Console.Write("Enter the width of the rectangle: ");
                        double width = double.Parse(Console.ReadLine());
                        Console.Write("Enter the height of the rectangle: ");
                        double height = double.Parse(Console.ReadLine());
                        shape = new Rectangle(width, height);
                        break;

                    default:
                        Console.WriteLine("Invalid option.");
                        return;
                }

                Console.WriteLine($"Area: {shape.GetArea()}");
                Console.WriteLine($"Perimeter: {shape.GetPerimeter()}");
            }
            else
            {
                Console.WriteLine("Invalid input. Please enter a number.");
            }
        }
    }
}
