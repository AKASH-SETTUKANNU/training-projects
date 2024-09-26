import { Injectable } from '@angular/core';
import { StorageService } from '../storage/storage.service';
import { User, Guests } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class GuestsService {
  private users: User[] = JSON.parse(localStorage.getItem('users') || '[]');

  constructor(private storageService: StorageService) {}

  // Add a guest to the specified event
  addGuest(eventId: string, newGuest: Guests): void {
    const user = this.storageService.getLoggedInUser();
    const currentUser = this.users.find(u => u.userEmail === user?.userEmail);

    if (currentUser) {
      const event = currentUser.events?.find(event => event.id === eventId);
      if (event) {
        event.guests = event.guests || []; // Initialize guests if undefined
        event.guests.push(newGuest); // Add the new guest
        localStorage.setItem('users', JSON.stringify(this.users));
      }
    }
  }

  // Get guests for a specific event
  getGuests(eventId: string): Guests[] {
    const user = this.storageService.getLoggedInUser();
    const currentUser = this.users.find(u => u.userEmail === user?.userEmail);

    if (currentUser) {
      const event = currentUser.events?.find(event => event.id === eventId);
      return event ? event.guests || [] : [];
    }
    return [];
  }

  // Update an existing guest's details
  updateGuest(eventId: string, updatedGuest: Guests): void {
    const user = this.storageService.getLoggedInUser();
    const currentUser = this.users.find(u => u.userEmail === user?.userEmail);

    if (currentUser) {
      const event = currentUser.events?.find(event => event.id === eventId);
      if (event && event.guests) {
        const index = event.guests.findIndex(guest => guest.guestId === updatedGuest.guestId);
        if (index !== -1) {
          event.guests[index] = updatedGuest; // Update guest
          localStorage.setItem('users', JSON.stringify(this.users));
        }
      }
    }
  }

  // Delete a guest from the specified event
  deleteGuest(eventId: string, guestId: number): void {
    const user = this.storageService.getLoggedInUser();
    const currentUser = this.users.find(u => u.userEmail === user?.userEmail);

    if (currentUser) {
      const event = currentUser.events?.find(event => event.id === eventId);
      if (event && event.guests) {
        event.guests = event.guests.filter(guest => guest.guestId !== guestId); // Remove guest
        localStorage.setItem('users', JSON.stringify(this.users));
      }
    }
  }
}
