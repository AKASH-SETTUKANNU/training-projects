using System;
namespace BasicOperation
{
    class operations
    {
        public static void Main(String[] args)
        {
            string employeeName = "employee";
            int hoursWorked = 20;
            double hourlyRate = 20.20;
            double bonous = 100;
            bool isFullTime = true;

            double totalSalary = hoursWorked * hourlyRate;

            if (isFullTime)
            {
                totalSalary += bonous;
            }

          

            Console.WriteLine($"Employee Name:{employeeName}");
            Console.WriteLine($"Number of Hours worked:{hoursWorked}");
            Console.WriteLine($"Employee salary per hour:${hourlyRate}");
            Console.WriteLine($"Employee bonous:${bonous}");
            Console.WriteLine($"The employee is Full Time Employee:{isFullTime}");
            if (isFullTime && totalSalary >= 300)
            {
                Console.WriteLine($"{employeeName} is eligible for bonous");
            }
            Console.WriteLine($"Employee Total salary:${totalSalary}");
        }
    }
}