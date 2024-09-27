import { Injectable } from '@angular/core';
import { StorageService } from '../storage/storage.service';
import { User, Guests } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class GuestService {
  private users: User[] = JSON.parse(localStorage.getItem('users') || '[]');

  constructor(private storageService: StorageService) {}

  getGuestsList(eventId: number): Guests[] {
    const loggedInUser = this.storageService.getLoggedInUser();
    const currentUser = this.users.find((u: User) => u.userEmail === loggedInUser?.userEmail);
    
    if (currentUser && currentUser.events) {
        const event = currentUser.events.find(e => e.id === Number(eventId));
        return event?.guests || [];
    }
    return [];
}

addGuests(eventId: string, guests: Guests[]): void { 
    const loggedInUser = this.storageService.getLoggedInUser();
    const currentUser = this.users.find((u: User) => u.userEmail === loggedInUser?.userEmail);
    if (currentUser) {
        const eventNumberId = Number(eventId);
        const event = currentUser.events?.find(e => e.id === eventNumberId);

        if (event) {
            event.guests = event.guests || [];
            event.guests.push(...guests); 
            localStorage.setItem('users', JSON.stringify(this.users)); 
        } else {
            console.error('Event not found');
        }
    } else {
        console.error('Current user not found');
    }
}




  findEditGuest(eventId: number, guestId: number): Guests | undefined {
    const loggedInUser = this.storageService.getLoggedInUser();
    const currentUser = this.users.find((u: User) => u.userEmail === loggedInUser?.userEmail);

    if (currentUser) {
      const event = currentUser.events?.find(e => e.id === Number(eventId));
      return event?.guests?.find((guest: Guests) => guest.guestId === Number(guestId));
    }

    console.error('Current user not found or event not found');
    return undefined;
  }

  updateGuest(eventId: number, updatedGuest: Guests): void {
    const loggedInUser = this.storageService.getLoggedInUser();
    const currentUser = this.users.find((u: User) => u.userEmail === loggedInUser?.userEmail);
    if (currentUser) {
        const event = currentUser.events?.find(e => e.id === Number(eventId));
        if (event && event.guests) {
            const index = event.guests.findIndex((guest: Guests) => guest.guestId === updatedGuest.guestId);
            if (index !== -1) {
                event.guests[index] = updatedGuest; 
                localStorage.setItem('users', JSON.stringify(this.users)); 
            } else {
                console.error('Guest not found in the event');
            }
        } else {
            console.error('Event not found or has no guests');
        }
    } else {
        console.error('Current user not found');
    }
}

deleteGuest(eventId: number, guestId: number): void {
  const loggedInUser = this.storageService.getLoggedInUser();
  const currentUser = this.users.find((u: User) => u.userEmail === loggedInUser?.userEmail);

  if (currentUser) {
      const event = currentUser.events?.find(e => e.id === Number(eventId));

      if (event && event.guests) {
          event.guests = event.guests.filter((guest: Guests) => guest.guestId !== guestId);
          localStorage.setItem('users', JSON.stringify(this.users)); 
      } else {
          console.error('Event not found or has no guests');
      }
  } else {
      console.error('Current user not found');
  }
}


}
