import { Injectable } from '@angular/core';
import { StorageService } from '../storage/storage.service';
import { User } from '../models/user';
import { Guests } from '../models/user';
@Injectable({
  providedIn: 'root'
})
export class GuestService {
  private users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
  constructor(private storageService:StorageService) { }
  getGuestsList(): Guests[] {
    const loggedInUser =this.storageService.getLoggedInUser();
    const currentUser = this.users.find((u: User) => u.userEmail === loggedInUser?.userEmail);
    return currentUser?.guests || [];
  }

  addGuests(guests: Guests[]): void {
    const loggedInUser = this.storageService.getLoggedInUser();
    const currentUser = this.users.find((u: User) => u.userEmail === loggedInUser?.userEmail);
    if (currentUser) {
      currentUser.guests = currentUser.guests || [];
      currentUser.guests.push(...guests);
      localStorage.setItem('users', JSON.stringify(this.users));
    }
  }

  findEditGuest(guestId: number): Guests | undefined {
    const loggedInUser = this.storageService.getLoggedInUser();
    const currentUser = this.users.find((u: User) => u.userEmail === loggedInUser?.userEmail);
    return currentUser?.guests?.find((guest: Guests) => guest.guestId === guestId);
  }

  updateGuest(updatedGuest: Guests): void {
    const loggedInUser = this.storageService.getLoggedInUser();
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
    const loggedInUser = this.storageService.getLoggedInUser();
    const currentUser = this.users.find((u: User) => u.userEmail === loggedInUser?.userEmail);
    if (currentUser && currentUser.guests) {
      currentUser.guests = currentUser.guests.filter((guest: Guests) => guest.guestId !== guestId);
      localStorage.setItem('users', JSON.stringify(this.users));
    }
  }
}
