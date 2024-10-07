using Serializer;

class Program
{
    public static void Main()
    {
        // Test with Person class
        Person person = new Person { Name = "John Doe", Age = 30 };
        string personSerialized = Serializer.objectSerializer.serializeObject(person);
        Console.WriteLine(personSerialized);

        // Test with Car class
        Car car = new Car { Make = "Toyota", Model = "Camry", Year = 2020 };
        string carSerialized = Serializer.objectSerializer.serializeObject(car);
        Console.WriteLine(carSerialized);
    }
}