using System;

namespace AbstractShapes
{
    public class Circle : AbstractClass
    {
        private double _radius;

        public Circle(double radius)
        {
            _radius = radius;
        }

        public override double GetArea()
        {
            return Math.PI * _radius * _radius;
        }

        public override double GetPerimeter()
        {
            return 2 * Math.PI * _radius;
        }
    }
}
