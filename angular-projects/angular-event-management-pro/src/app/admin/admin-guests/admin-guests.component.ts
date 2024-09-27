import { GuestService } from './../../services/guest.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StorageService } from '../../storage/storage.service';
import { Guests, User, Event } from '../../models/user';

@Component({
  selector: 'app-admin-guests',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './admin-guests.component.html',
  styleUrls: ['./admin-guests.component.css']
})
export class AdminGuestsComponent implements OnInit {
  guestId: number = 0;
  guestName: string = '';
  guestEmail: string = '';
  guestBirthDate: string = '';
  guestLocation: string = '';
  guests: Guests[] = [];
  users: User[] = [];
  events: Event[] = [];
  searchEmail: string = '';
  searchResults: Guests[] = [];
  nameError: string = 'Name is required!';
  emailError: string = 'Valid email is required!';
  locationError: string = 'Location is required!';
  dateError: string = 'Date of Birth is required!';
  successMessage: string = '';

  guestDisplay: boolean = false;
  iseditGuest: boolean = false;
  resultGuestError: string = '';
  showNameError: boolean = false;
  showEmailError: boolean = false;
  showBirtDateError: boolean = false;
  showLocationError: boolean = false;
  selectedEventId: number = 0;

  constructor(private storageService: StorageService, private guestService: GuestService) {}

  ngOnInit(): void {
    this.loadEvents();
    this.refreshGuestsList();
  }

  loadEvents(): void {
    const loggedInUser = this.storageService.getLoggedInUser();
    this.users = this.storageService.getUsers();
    const currentUser = this.users.find((u: User) => u.userEmail === loggedInUser?.userEmail);
    this.events = currentUser?.events || [];
    console.log('Loaded events:', this.events);
  }

  addGuest(): void {
    if (this.validateGuest() && this.selectedEventId !== null) {
      const existingGuest = this.guestService.findEditGuest(this.selectedEventId, this.guestId);
      const emailExists = this.isEmailExists(this.guestEmail);

      if (!this.iseditGuest && emailExists) {
        this.showEmailError = true;
        this.emailError = 'Email already exists!';
        return;
      }

      const newGuest: Guests = {
        guestId: this.guestId|| this.generateGuestId(),
        guestName: this.guestName,
        guestEmail: this.guestEmail,
        guestBirthDate: this.guestBirthDate,
        guestLocation: this.guestLocation,
      };

      if (existingGuest) {
        this.guestService.updateGuest(this.selectedEventId, newGuest);
        this.successMessage = 'Guest updated successfully!';
      } else {
        this.guestService.addGuests(String(this.selectedEventId), [newGuest]);

        this.successMessage = 'Guest added successfully!';
      }

      this.iseditGuest = false;
      this.resetForm();
      this.refreshGuestsList();
    }
  }
  private generateGuestId(): number {
    return Math.max(0, ...this.guests.map(g => g.guestId)) + 1; 
}
  displayAddGuest(): void {
    this.guestDisplay = !this.guestDisplay;
  }

  findGuest(): void {
    if (!this.isValidEmail(this.searchEmail)) {
      this.resultGuestError = 'Please enter a valid full email address.';
      this.searchResults = []; 
      return;
    }

    const foundGuests = this.guestService.getGuestsList(this.selectedEventId);
    this.searchResults = foundGuests.filter(guest => guest.guestEmail.toLowerCase() === this.searchEmail.toLowerCase());
    this.resultGuestError = this.searchResults.length > 0 ? '' : 'Guest not found';
  }

  editGuest(guestId: number): void {
    this.guestDisplay = true;
    this.iseditGuest = true;
    const guest = this.guestService.findEditGuest(this.selectedEventId, guestId);
    if (guest) {
      this.guestId = guest.guestId; 
      this.guestName = guest.guestName;
      this.guestEmail = guest.guestEmail;
      this.guestBirthDate = guest.guestBirthDate;
      this.guestLocation = guest.guestLocation || '';
    } else {
      console.error('Guest not found');
    }
  }
  
  deleteGuest(guestId: number): void {
      this.guestService.deleteGuest(this.selectedEventId, guestId);
      this.refreshGuestsList();
  }
  



  validateOnBlur(field: string): void {
    switch(field) {
      case 'guestName':
        this.showNameError = !this.guestName;
        break;
      case 'guestEmail':
        this.showEmailError = !this.guestEmail;
        break;
      case 'guestBirthDate':
        this.showBirtDateError = !this.guestBirthDate;
        break;
      case 'guestLocation':
        this.showLocationError = !this.guestLocation;
        break;
    }
  }

  validateGuest(): boolean {
    this.showNameError = !this.guestName;
    this.showEmailError = !this.guestEmail || !this.isValidEmail(this.guestEmail);
    this.showBirtDateError = !this.guestBirthDate;
    this.showLocationError = !this.guestLocation;

    return !(this.showNameError || this.showEmailError || this.showBirtDateError || this.showLocationError);
  }

  isValidEmail(email: string): boolean {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }

  isEmailExists(email: string): boolean {
    return this.guests.some(guest => guest.guestEmail === email);
  }

  resetForm(): void {
    this.guestName = '';
    this.guestEmail = '';
    this.guestLocation = '';
    this.guestBirthDate = ''; 
    this.successMessage = '';
    this.guestId = 0; 
    this.selectedEventId =0; 
  }

  refreshGuestsList(): void {
    if (this.selectedEventId > 0) {
      this.guests = this.guestService.getGuestsList(this.selectedEventId);
    } else {
      this.guests = [];
    }
  }
}
