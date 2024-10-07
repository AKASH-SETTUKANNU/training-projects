using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Interface
{
    internal class Tata : Icar
    {
        public string Name { get; set; }
        public string Color { get; set; }
        public string year { get; set; }

        public void Accelerate(int speed)
        {
            Console.WriteLine($"Car:{Name} Color:{Color} Year:{year} accelerated to {speed} km/hr");
        }

        public void start()
        {
            Console.WriteLine($"Car:{Name} Color:{Color} Year:{year} started..");
        }

        public void stop()
        {
            Console.WriteLine($"Car:{Name} Color:{Color} Year:{year} stoped..");
        }
    }
}
