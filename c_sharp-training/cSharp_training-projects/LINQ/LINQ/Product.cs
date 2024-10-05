using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LINQ
{
    internal class Product
    {
        public string Name { get; set; }
        public string Category { get; set; }
        public decimal Price { get; set; }

        public Product(string name,string category,decimal price)
        {
            Name = name;
            Category = category;
            Price = price;
        }
    }
}
