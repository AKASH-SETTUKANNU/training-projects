import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-weather-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './weather-dashboard.component.html',
  styleUrls: ['./weather-dashboard.component.css']
})
export class WeatherDashboardComponent {
  cityName: string = '';
  weatherData: any;
  weatherIcon: string = '';
  errorMessage: string = '';

  constructor(private weatherService: WeatherService) { } 

  onSubmit() {
    if (this.cityName) {
      this.weatherService.getWeather(this.cityName).subscribe({
        next: (data) => {
          this.weatherData = data;
          this.weatherIcon = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
          this.errorMessage = '';
        },
        error: (err) => {
          this.errorMessage = 'Error fetching weather data... Enter valid City.';
          console.error('Error fetching weather data:', err);
          this.weatherData = null;
          this.weatherIcon = '';
        }
      });
    }
  }
}
