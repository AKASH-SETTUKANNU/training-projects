import { Injectable } from '@angular/core';
import { StorageService } from '../storage/storage.service';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class EventImageService {
  private eventImages: Record<string, string> = {
    birthday: './birthday.jfif',
    wedding: './wedding.png',
    conference: './conference.jfif',
  };

  private users: User[] = JSON.parse(localStorage.getItem('users') || '[]');

  constructor(private storageService: StorageService) {}

  getImageUrl(category: string): string | undefined {
    return this.eventImages[category];
  }

  saveEventItems(events: any[]): void {
    const user = this.storageService.getLoggedInUser();
    const currentUser = this.users.find((u: User) => u.userEmail === user?.userEmail);
    if (currentUser) {
      currentUser.events = events;
      localStorage.setItem('users', JSON.stringify(this.users));
    }
  }

  getEventItems(): any[] {
    const user = this.storageService.getLoggedInUser();
    const currentUser = this.users.find((u: User) => u.userEmail === user?.userEmail);
    return currentUser ? currentUser.events || [] : [];
  }

  updateEventItem(updatedEvent: any): void {
    const user = this.storageService.getLoggedInUser();
    const currentUser = this.users.find((u: User) => u.userEmail === user?.userEmail);
    if (currentUser && currentUser.events) {
      const index = currentUser.events.findIndex(event => event.id === updatedEvent.id);
      if (index !== -1) {
        currentUser.events[index] = updatedEvent;
        localStorage.setItem('users', JSON.stringify(this.users));
      }
    }
  }

  deleteEventItem(id: number): void {
    const user = this.storageService.getLoggedInUser();
    const currentUser = this.users.find((u: User) => u.userEmail === user?.userEmail);
    if (currentUser && currentUser.events) {
      currentUser.events = currentUser.events.filter(event => event.id !== id);
      localStorage.setItem('users', JSON.stringify(this.users));
    }
  }
}
