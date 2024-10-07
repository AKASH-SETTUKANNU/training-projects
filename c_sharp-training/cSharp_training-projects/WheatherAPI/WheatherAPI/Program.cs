using System;
using System.Net.Http;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;

class Program
{
    private static readonly string apiKey = "3a14e7bdd92e1badab6180b645706664";
    private static readonly string apiUrl = "https://api.openweathermap.org/data/2.5/weather?q={0}&appid={1}&units=metric";

    static async Task Main(string[] args)
    {
        bool exit = false;

        while (!exit)
        {
            Console.WriteLine("Enter a city name: ");
            string city = Console.ReadLine();

            if (!string.IsNullOrEmpty(city))
            {
                await GetWeatherAsync(city.Trim());
            }
            else
            {
                Console.WriteLine("City name cannot be empty.");
            }

            Console.WriteLine("Do you want to continue? Yes / No:");
            string input = Console.ReadLine()?.Trim().ToLower();

            if (input == "no")
            {
                exit = true;
            }
        }

        Console.WriteLine("Exiting program...");
    }

    public static async Task GetWeatherAsync(string city)
    {
        try
        {
            using HttpClient client = new HttpClient();
            string requestUrl = string.Format(apiUrl, city, apiKey);
            HttpResponseMessage response = await client.GetAsync(requestUrl);

            if (response.IsSuccessStatusCode)
            {
                string responseBody = await response.Content.ReadAsStringAsync();
                JObject weatherData = JObject.Parse(responseBody);

                string cityName = weatherData["name"].ToString();
                string temperature = weatherData["main"]["temp"].ToString();
                string condition = weatherData["weather"][0]["description"].ToString();

                Console.WriteLine($"\nCity: {cityName}");
                Console.WriteLine($"Temperature: {temperature}°C");
                Console.WriteLine($"Condition: {condition}");
            }
            else
            {
                Console.WriteLine($"Error: Unable to fetch data for {city}. Status Code: {response.StatusCode}");
            }
        }
        catch (HttpRequestException e)
        {
            Console.WriteLine($"Error fetching weather data for {city}: {e.Message}");
        }
        catch (Exception e)
        {
            Console.WriteLine($"An unexpected error occurred: {e.Message}");
        }
    }
}
