using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Interface
{
    internal interface Icar
    {
        string Name { get; set; }
        string Color {  get; set; }

        string year { get; set; }

        void start();
        void stop();
        void Accelerate(int speed);
    }
}
