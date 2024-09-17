import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-weather-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './weather-dashboard.component.html',
  styleUrls: ['./weather-dashboard.component.css']
})
export class WeatherDashboardComponent {
  cityName: string = '';
  weatherData: any;
  weatherIcon: string = '';
  errorMessage: string = '';
  private apiKey: string = '3a14e7bdd92e1badab6180b645706664';
  private baseUrl: string = 'https://api.openweathermap.org/data/2.5/weather';

  constructor(private http: HttpClient) { }

  getWeather(city: string): Observable<any> {
    const url = `${this.baseUrl}?q=${encodeURIComponent(city)}&appid=${this.apiKey}&units=metric`;
    return this.http.get<any>(url);
  }

  onSubmit() {
    if (this.cityName) {
      this.getWeather(this.cityName).subscribe({
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
