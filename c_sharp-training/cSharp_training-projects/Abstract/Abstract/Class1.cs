using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Abstract
{
    public abstract class Shape
    {
        public abstract double getArea(double radius);

    }

    public class Circle: Shape
    {
        public override double getArea(double radius)
        {
           return Math.PI * radius*radius;
        }
    }
}
