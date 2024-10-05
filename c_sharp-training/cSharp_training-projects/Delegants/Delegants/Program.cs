using System;

class Program
{
    public delegate int MathOperation(int a, int b);

  
    public static int Add(int a, int b)
    {
        return a + b;
    }

   
    public static int Subtract(int a, int b)
    {
        return a - b;
    }

   
    public static int Multiply(int a, int b)
    {
        return a * b;
    }

    public static int Divide(int a, int b)
    {
        if (b == 0)
        {
            Console.WriteLine("Division by zero is not allowed.");
            return 0;
        }
        return a / b;
    }

    static void Main(string[] args)
    {
      
        MathOperation add = Add;
        MathOperation subtract = Subtract;
        MathOperation multiply = Multiply;
        MathOperation divide = Divide;

        Console.WriteLine("Addition: " + add(10, 5));
        Console.WriteLine("Subtraction: " + subtract(10, 5));
        Console.WriteLine("Multiplication: " + multiply(10, 5));
        Console.WriteLine("Division: " + divide(10, 5));
    }
}
