using System;
namespace numberGuess
{
    class numberGuessGame
    {
        public static void Main(string[] args)
        {
            Random random = new Random();
            int target = random.Next(1, 101);
            int guess = 0;

            Console.WriteLine("I've selected a number between 1 and 100. Can you guess it?");

            while(guess != target)
            {
                Console.WriteLine("Enter a guess Number:");
                string input = Console.ReadLine();
                
                if (int.TryParse(input, out guess))
                {
                    if(guess < target)
                    {
                        Console.WriteLine("Too low try again...");
                    }
                    else if(guess > target)
                    {
                        Console.WriteLine("Too high try again...");
                    }
                    else
                    {
                        Console.WriteLine($"congrats! you guessed the correct number{target}!");
                    }
                }
                else
                {
                    Console.WriteLine("Invalid input , Enter the Number form 1 to 100.");
                }
            }
        }
    }
}
