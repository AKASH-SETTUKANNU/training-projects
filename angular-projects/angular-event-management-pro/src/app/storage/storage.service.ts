import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Guests } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private users: User[] = JSON.parse(localStorage.getItem('users') || '[]');

  addUser(user: User): void {
    this.users.push(user);
    localStorage.setItem('users', JSON.stringify(this.users));
  }

  getUsers(): User[] {
    return JSON.parse(localStorage.getItem('users') || '[]');
  }

  setLoggedInUser(user: User): void {
    localStorage.setItem('loggedInUser', JSON.stringify(user));
  }

  getLoggedInUser(): User | null {
    const loggedInUser = localStorage.getItem('loggedInUser');
    return loggedInUser ? JSON.parse(loggedInUser) : null;
  }

  saveEventItems(events: any[]): void {
    const user = this.getLoggedInUser();
    const currentUser = this.users.find((u: User) => u.userEmail === user?.userEmail);
    if (currentUser) {
      currentUser.events = events;
      localStorage.setItem('users', JSON.stringify(this.users));
    }
  }

  getEventItems(): any[] {
    const user = this.getLoggedInUser();
    const currentUser = this.users.find((u: User) => u.userEmail === user?.userEmail);
    return currentUser ? currentUser.events || [] : [];
  }

  updateEventItem(updatedEvent: any): void {
    const user = this.getLoggedInUser();
    const currentUser = this.users.find((u: User) => u.userEmail === user?.userEmail);
    if (currentUser && currentUser.events) {
      const index = currentUser.events.findIndex(event => event.id === updatedEvent.id);
      if (index !== -1) {
        currentUser.events[index] = updatedEvent;
        localStorage.setItem('users', JSON.stringify(this.users));
      }
    }
  }

  deleteEventItem(id: string): void {
    const user = this.getLoggedInUser();
    const currentUser = this.users.find((u: User) => u.userEmail === user?.userEmail);
    if (currentUser && currentUser.events) {
      currentUser.events = currentUser.events.filter(event => event.id !== id);
      localStorage.setItem('users', JSON.stringify(this.users));
    }
  }

  getGuestsList(): Guests[] {
    const loggedInUser = this.getLoggedInUser();
    const currentUser = this.users.find((u: User) => u.userEmail === loggedInUser?.userEmail);
    return currentUser?.guests || [];
  }

  addGuests(guests: Guests[]): void {
    const loggedInUser = this.getLoggedInUser();
    const currentUser = this.users.find((u: User) => u.userEmail === loggedInUser?.userEmail);
    if (currentUser) {
      currentUser.guests = currentUser.guests || [];
      currentUser.guests.push(...guests);
      localStorage.setItem('users', JSON.stringify(this.users));
    }
  }

  findEditGuest(guestId: number): Guests | undefined {
    const loggedInUser = this.getLoggedInUser();
    const currentUser = this.users.find((u: User) => u.userEmail === loggedInUser?.userEmail);
    return currentUser?.guests?.find((guest: Guests) => guest.guestId === guestId);
  }

  updateGuest(updatedGuest: Guests): void {
    const loggedInUser = this.getLoggedInUser();
    const currentUser = this.users.find((u: User) => u.userEmail === loggedInUser?.userEmail);
    if (currentUser && currentUser.guests) {
      const index = currentUser.guests.findIndex((guest: Guests) => guest.guestId === updatedGuest.guestId);
      if (index !== -1) {
        currentUser.guests[index] = updatedGuest;
        localStorage.setItem('users', JSON.stringify(this.users));
      }
    }
  }

  deleteGuest(guestId: number): void {
    const loggedInUser = this.getLoggedInUser();
    const currentUser = this.users.find((u: User) => u.userEmail === loggedInUser?.userEmail);
    if (currentUser && currentUser.guests) {
      currentUser.guests = currentUser.guests.filter((guest: Guests) => guest.guestId !== guestId);
      localStorage.setItem('users', JSON.stringify(this.users));
    }
  }
}
