import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Guests } from '../../models/user';
import { StorageService } from '../../storage/storage.service';
@Component({
  selector: 'app-admin-guests',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './admin-guests.component.html',
  styleUrl: './admin-guests.component.css'
})
export class AdminGuestsComponent {
    guestName: string = '';
    guestEmail: string = '';
    guestLocation: string = '';
    guests: Guests[] = [];
    searchEmail: string = '';
    searchResults: any[] = [];
    nameError: string = '';
    emailError: string = '';
    locationError: string = '';
    successMessage: string = '';
    resultGuestError: string = 'Enter Guest Email to Find the...';
  
    constructor(private guestService:Guests){}
    addGuest(): void {
      if (this.validateGuest()) {
        const newGuest:Guests = {
          name: this.guestName,
          email: this.guestEmail,
          location: this.guestLocation
        };
       this.addGuest(newGuest);
        this.successMessage = 'Guest added successfully!';
        this.resetForm();
      }
    }
  
    findGuest(): void {
      const foundGuest = this.guests.find(guest => guest.email === this.searchEmail);
      this.searchResults = foundGuest ? [foundGuest] : [];
      this.resultGuestError = foundGuest ? '' : 'Guest not found';
    }
  
    validateGuest(): boolean {
      let isValid = true;
      this.nameError = '';
      this.emailError = '';
      this.locationError = '';
  
      if (!this.guestName) {
        this.nameError = 'Name is required.';
        isValid = false;
      }
  
      if (!this.guestEmail) {
        this.emailError = 'Email is required.';
        isValid = false;
      }
  
      if (!this.guestLocation) {
        this.locationError = 'Location is required.';
        isValid = false;
      }
  
      return isValid;
    }
  
    resetForm(): void {
      this.guestName = '';
      this.guestEmail = '';
      this.guestLocation = '';
      this.successMessage = '';
    }
  }

