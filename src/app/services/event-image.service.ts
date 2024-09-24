import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventImageService {
  private eventImages:any = {
    birthday: './birthday.jfif',
    wedding: './wedding.png',
    conference: './conference.jfif',
  };

  constructor() {}

  getImageUrl(category: string): string | undefined {
    return this.eventImages[category];
  }
  
}
