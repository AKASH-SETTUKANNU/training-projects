using System;

namespace AbstractShapes
{
    public class Rectangle : AbstractClass
    {
        private double _width;
        private double _height;

        public Rectangle(double width, double height)
        {
            _width = width;
            _height = height;
        }

        public override double GetArea()
        {
            return _width * _height;
        }

        public override double GetPerimeter()
        {
            return 2 * (_width + _height);
        }
    }
}
