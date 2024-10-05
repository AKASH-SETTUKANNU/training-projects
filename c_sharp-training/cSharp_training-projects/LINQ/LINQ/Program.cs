using LINQ;

class Program
{
    public static void Main()
    {
        List<Product> products = new List<Product>
        {
             new Product("Laptop", "Electronics", 999.99m),
            new Product("Smartphone", "Electronics", 699.99m),
            new Product("Shirt", "Clothing", 29.99m),
            new Product("Pants", "Clothing", 49.99m),
            new Product("Coffee Maker", "Appliances", 89.99m),
            new Product("Microwave", "Appliances", 199.99m),
            new Product("Headphones", "Electronics", 199.99m),
            new Product("Jacket", "Clothing", 89.99m)
        };
        Console.WriteLine("The products are:");
        foreach (var product in products)
        {
            Console.WriteLine($"\nProduct Name:{product.Name}  \nProduct Category:{product.Category}  \nProduct Price:{product.Price}");
        }
        Console.WriteLine("Enter the Product Category: ");
        string specificCategory=Console.ReadLine();

        var productsList=products.Where(p=>p.Category==specificCategory).ToList();

        decimal averagePrice=productsList.Any() ? productsList.Average(p=>p.Price) : 0;

        Console.WriteLine($"Average Price of products in the {specificCategory} category:{averagePrice}");

        var groupByCategory = from p in products
                              group p by p.Category into g
                              select new
                              {
                                  category = g.Key,
                                  count = g.Count(),
                                  averagePrice = g.Average(p => p.Price)
                              };
        var orderedGroups = groupByCategory.OrderByDescending(g => g.count);

        Console.WriteLine("\nProducts grouped by category and ordered by count:");

        foreach (var group in orderedGroups)
        {
            Console.WriteLine($"Category: {group.category}, Count: {group.count}, Average Price: {group.averagePrice}");
        }

    }
}