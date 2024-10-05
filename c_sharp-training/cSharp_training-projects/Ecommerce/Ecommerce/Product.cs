

namespace Ecommerce
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }

        public Product(int id, string name, decimal price, int quantity)
        {
            Id = id;
            Name = name;
            Price = price;
            Quantity = quantity;
        }

        public void DisplayProduct()
        {
            Console.WriteLine($"ID:{Id},Name:{Name},Price:{Price},Quantity:{Quantity}");
        }

    }
}
