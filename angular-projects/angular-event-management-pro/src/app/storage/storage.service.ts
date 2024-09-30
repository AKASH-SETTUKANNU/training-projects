import { Injectable } from '@angular/core';
import { User } from '../models/user';
@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private users: User[] = JSON.parse(localStorage.getItem('users') || '[]');

  constructor() {
    // Initialize notifications if they don't exist
    this.users.forEach(user => {
      if (!user.notifications) {
        user.notifications = [];
      }
    });
    localStorage.setItem('users', JSON.stringify(this.users));
  }

  addUser(user: User): void {
    this.users.push(user);
    localStorage.setItem('users', JSON.stringify(this.users));
  }

  updateUser(user: User): void {
    const index = this.users.findIndex(u => u.userEmail === user.userEmail);
    if (index !== -1) {
      this.users[index] = user; // Update the user in memory
      localStorage.setItem('users', JSON.stringify(this.users)); // Save changes to local storage
    }
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
}
