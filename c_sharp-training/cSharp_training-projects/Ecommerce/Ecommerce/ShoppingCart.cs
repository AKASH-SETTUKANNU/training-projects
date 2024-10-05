

namespace Ecommerce
{
    public class ShoppingCart
    {
        private List<Product> cartProducts = new List<Product>();

        public void AddProduct(Product product)
        {
            cartProducts.Add(product);
            Console.WriteLine($"{product.Name} added to the cart.");
        }

        public void RemoveProduct(int productId)
        {
            var product = cartProducts.Find(p => p.Id == productId);
            if (product != null)
            {
                cartProducts.Remove(product);
                Console.WriteLine($"{product.Name} removed from the cart");
            }
            else
            {
                Console.WriteLine("Product not found in your cart");
            }
        }

        public void DisplayCart()
        {
            if (cartProducts.Count == 0)
            {
                Console.WriteLine("your cart is empty.");
                return;
            }

            Console.WriteLine("Products in your cart: ");
            foreach (var product in cartProducts)
            {
                product.DisplayProduct();

            }
        }
        public decimal calculateTotal()
        {
            decimal total = 0;
            foreach (var product in cartProducts)
            {
                total += product.Price;
            }
            return total;
        }
    }
}
