using System;

namespace genericClass
{
    class Program
    {
        public static void Main(string[] args)
        {
            Stack<string> studentStack = new Stack<string>();
            string command;

            Console.WriteLine("Welcome to the Student Stack Manager!");

            do
            {
                Console.WriteLine("\nChoose an option:");
                Console.WriteLine("1. Push a student name");
                Console.WriteLine("2. Pop a student name");
                Console.WriteLine("3. Peek at the top student name");
                Console.WriteLine("4. Show the number of students in the stack");
                Console.WriteLine("5. Exit");
                command = Console.ReadLine();

                switch (command)
                {
                    case "1":
                        Console.Write("Enter the student name to push: ");
                        string nameToPush = Console.ReadLine();
                        studentStack.Push(nameToPush);
                        Console.WriteLine($"Pushed: {nameToPush}");
                        break;

                    case "2":
                        try
                        {
                            string poppedName = studentStack.Pop();
                            Console.WriteLine($"Popped: {poppedName}");
                        }
                        catch (InvalidOperationException e)
                        {
                            Console.WriteLine(e.Message);
                        }
                        break;

                    case "3":
                        try
                        {
                            string topName = studentStack.Peek();
                            Console.WriteLine($"Top student: {topName}");
                        }
                        catch (InvalidOperationException e)
                        {
                            Console.WriteLine(e.Message);
                        }
                        break;

                    case "4":
                        Console.WriteLine($"Number of students in the stack: {studentStack.Count}");
                        break;

                    case "5":
                        Console.WriteLine("Exiting the program.");
                        break;

                    default:
                        Console.WriteLine("Invalid option, please try again.");
                        break;
                }
            } while (command != "5");
        }
    }
}
