using System;
namespace calculator
{
    class matCalculator
    {
        public static void Main(string[] args)
        {
            string repeat;
            do
            {
                Console.WriteLine("choose the Operation to Do:");
                Console.WriteLine("1. Addition");
                Console.WriteLine("2. Subraction");
                Console.WriteLine("3. Multiplication");
                Console.WriteLine("4. Division");
                Console.WriteLine("5. Modulus");

                Console.WriteLine("Enter the Option Number:");
                int op = getValidOption();

                int a = GetValidInput("Enter the Number 1:");
                int b = GetValidInput("Enter the Number 2:");





                switch (op)
                {
                    case 1:
                        Console.WriteLine($"The Result of ({a}+{b}) is:{a + b}");
                        break;
                    case 2:
                        Console.WriteLine($"The Result of ({a}-{b}) is:{Math.Max(a, b) - Math.Min(a, b)}");
                        break;
                    case 3:
                        Console.WriteLine($"The Result of ({a}*{b}) is:{a * b}");
                        break;
                    case 4:
                        if (b != 0)
                        {
                            Console.WriteLine($"The Result of ({a}/{b}) is:{a / b}");
                        }
                        else
                        {
                            Console.WriteLine("Enter the Valid Number ,The Number is not Divisible by Zero...");
                        }

                        break;
                    case 5:
                        Console.WriteLine($"The Result of ({a}%{b}) is:{a % b}");
                        break;
                    default:
                        Console.WriteLine("Enter the Valid Option");
                        break;
                }
                Console.WriteLine("Do you want to continue Yes or NO :");
                repeat = Console.ReadLine();
            } while (repeat == "yes");
        }
        public static int getValidOption()
        {
            int option;
            while (true)
            {
                string input = Console.ReadLine();
                if (int.TryParse(input, out option) && option >= 1 && option <= 5)
                {
                    return option;
                }
                else
                {
                    Console.WriteLine("Enter the valid option.");
                }
            }

        }
        public static int GetValidInput(string message)
        {
            int number;
            while (true)
            {

                Console.WriteLine(message);
                string input = Console.ReadLine();
                if (int.TryParse(input, out number))
                {
                    return number;
                }
                else
                {
                    Console.WriteLine("Enter the valid input number");
                }
            }
        }
    }
}
