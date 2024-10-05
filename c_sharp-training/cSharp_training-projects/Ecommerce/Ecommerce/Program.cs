

namespace Ecommerce
{
    internal class Program
    {
        static void Main(string[] args)
        {
            List<Product> products = new List<Product>
            {
                new Product(1, "Laptop", 1000m, 10),
                new Product(2, "Smartphone", 499.99m, 20),
                new Product(3, "Tablet", 299.99m, 15)
            };

            ShoppingCart cart = new ShoppingCart();
            bool running = true;

            while (running)
            {
                Console.WriteLine("\n----- E-Commerce Menu -----");
                Console.WriteLine("1. View Products");
                Console.WriteLine("2. Add to cart");
                Console.WriteLine("3. View Cart");
                Console.WriteLine("4. Remove from cart");
                Console.WriteLine("5. Checkout");
                Console.WriteLine("0. Exit");
                Console.Write("Select an Option: ");

                string input = Console.ReadLine();

                try
                {
                    int option = int.Parse(input);

                    switch (option)
                    {
                        case 1:
                            Console.WriteLine("Available Products:");
                            foreach (var product in products)
                            {
                                product.DisplayProduct();
                            }
                            break;
                        case 2:
                            Console.Write("Enter the product ID to add to cart: ");
                            int addId = int.Parse(Console.ReadLine());
                            var productToAdd = products.Find(p => p.Id == addId);

                            if (productToAdd != null)
                            {
                                cart.AddProduct(productToAdd);
                            }
                            else
                            {
                                Console.WriteLine("Invalid product ID.");
                            }
                            break;
                        case 3:
                            cart.DisplayCart();
                            break;
                        case 4:
                            Console.Write("Enter the product ID to remove from Cart: ");
                            int removeId = int.Parse(Console.ReadLine());
                            cart.RemoveProduct(removeId);
                            break;
                        case 5:
                            decimal total = cart.calculateTotal();
                            Console.WriteLine($"Total amount to pay: {total:C}");  // Format as currency
                            cart.DisplayCart();
                            running = false;
                            break;
                        case 0:
                            running = false;
                            break;
                        default:
                            Console.WriteLine("Invalid option. Please try again.");
                            break;
                    }
                }
                catch (FormatException)
                {
                    Console.WriteLine("Invalid Input. Please enter a number.");
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"An error occurred: {ex.Message}");
                }
            }
        }
    }
}
