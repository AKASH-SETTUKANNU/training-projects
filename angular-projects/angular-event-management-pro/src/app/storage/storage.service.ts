import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
  addUser(user: User): void {
    this.users.push(user);
    localStorage.setItem('users', JSON.stringify(this.users));
  }

  getUsers(): any[] {
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
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = this.getLoggedInUser();
    const currentUser = users.find((u:User )=> u.userEmail === user?.userEmail);
    if (currentUser) {
      currentUser.events = events;
      localStorage.setItem('users', JSON.stringify(users)); 
    }
  }

  getEventItems(): any[] {
    const user = this.getLoggedInUser();
    const users=JSON.parse(localStorage.getItem('users')||'[]');
    const currentUser=users.find((u:User)=>u.userEmail===user?.userEmail);
    return currentUser ? currentUser.events || [] : [];
  }

  updateEventItem(updatedEvent: any): void {
    const user = this.getLoggedInUser();
    if (user && user.events) {
      const index = user.events.findIndex(event => event.id === updatedEvent.id);
      if (index !== -1) {
        user.events[index] = updatedEvent;
        this.setLoggedInUser(user);
      }
    }
  }

  deleteEventItem(id: string): void {
    const user = this.getLoggedInUser();
    if (user && user.events) {
      user.events = user.events.filter(event => event.id !== id);
      this.setLoggedInUser(user);
    }
  }
}
