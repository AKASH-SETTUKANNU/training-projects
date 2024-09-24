import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { StorageService } from '../storage/storage.service';
@Injectable({
  providedIn: 'root',
})
export class UserService {

  private users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
  
  constructor(private storageService: StorageService) {}

  getAllUsers(): User[] {
    return this.users;
  }
  
  getUserByEmail(email: string): User | undefined {
    return this.users.find(user => user.userEmail.trim() === email);
  }
  isUserExists(email: string): boolean {
    return this.users.some(user => user.userEmail.trim() === email);
  }

  getUserEventItems(): any[] | undefined {
    const user=this.storageService.getLoggedInUser();
    return user?user.events:undefined;
  }
}
