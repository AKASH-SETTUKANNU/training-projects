document.addEventListener('DOMContentLoaded', () => {
    const submitBtn = document.getElementById('search-button');
    const cityInputName = document.getElementById('city-name-input');
    const cityName = document.getElementById('city-name');
    const cityTemperature = document.getElementById('city-temperature');
    const cityHumidity = document.getElementById('city-humidity');
    const weatherIcon = document.getElementById('weather-icon');

    document.getElementById('weather-form').addEventListener('submit', async (event) => {
        event.preventDefault();
        document.getElementById('data-error').innerHTML = '';
        const city = cityInputName.value.trim();
        if (city) {
            try {
                const weatherData = await fetchData(city);
                updateWeatherInfo(weatherData);
            } catch (error) {
                document.getElementById('data-error').innerHTML = 'Error fetching weather data... Enter valid City.';
                console.error('Error fetching weather data:', error);
            }
        }
    });

    async function fetchData(name) {
        const apiKey = '3a14e7bdd92e1badab6180b645706664';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(name)}&appid=${apiKey}&units=metric`;

        console.log(`Fetching data from URL: ${url}`);

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const weatherData = await response.json();
        console.log(weatherData);
        return weatherData;
    }

    function updateWeatherInfo(data) {
        if (data && data.weather && data.weather.length > 0) {
            cityName.textContent = data.name;
            cityTemperature.textContent = `${data.main.temp} °C`;
            cityHumidity.textContent = `${data.main.humidity}%`;
            const iconCode = data.weather[0].icon;
            weatherIcon.src = `http://openweathermap.org/img/wn/${iconCode}.png`;
            weatherIcon.style.display = "block";
        } else {
            cityName.textContent = 'City not found';
            cityTemperature.textContent = '';
            cityHumidity.textContent = '';
            weatherIcon.src = ''; 
            weatherIcon.style.display = "none";
        }
    }
});
