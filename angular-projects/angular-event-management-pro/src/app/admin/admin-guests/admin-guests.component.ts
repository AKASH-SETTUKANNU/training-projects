import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StorageService } from '../../storage/storage.service';
import { Guests } from '../../models/user';

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

  constructor(private storageService: StorageService) {}

  ngOnInit(): void {
    this.refreshGuestsList();
  }

  addGuest(): void {
    if (this.validateGuest()) {
      const existingGuest = this.storageService.findEditGuest(this.guestId);
      const emailExists = this.isEmailExists(this.guestEmail);

      if (!this.iseditGuest && emailExists) {
        this.showEmailError = true;
        this.emailError = 'Email already exists!';
        return;
      }

      const newGuest: Guests = {
        guestId: this.guestId,
        guestName: this.guestName,
        guestEmail: this.guestEmail,
        guestBirthDate: this.guestBirthDate,
        guestLocation: this.guestLocation,
      };

      if (existingGuest) {
        this.storageService.updateGuest(newGuest);
        this.successMessage = 'Guest updated successfully!';
      } else {
        this.storageService.addGuests([newGuest]);
        this.successMessage = 'Guest added successfully!';
      }

      this.iseditGuest = false;
      this.resetForm();
      this.refreshGuestsList();
    }
  }

  displayAddGuest(): void {
    this.guestDisplay = !this.guestDisplay;
  }

  findGuest(): void {
    const isEmailValid = this.isValidEmail(this.searchEmail);
  
    if (!isEmailValid) {
      this.resultGuestError = 'Please enter a valid full email address.';
      this.searchResults = []; 
      return;
    }
  
    const foundGuests = this.storageService.getGuestsList();
    this.searchResults = foundGuests.filter(guest => 
      guest.guestEmail.toLowerCase() === this.searchEmail.toLowerCase()
    );
  
    this.resultGuestError = this.searchResults.length > 0 ? '' : 'Guest not found';
  }

  editGuest(guestId: number): void {
    this.guestDisplay = true;
    this.iseditGuest = true;
    const guest = this.storageService.findEditGuest(guestId);
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
    this.storageService.deleteGuest(guestId);
    this.refreshGuestsList();
  }

  validateOnBlur(field: string) {
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
  }

  private refreshGuestsList(): void {
    this.guests = this.storageService.getGuestsList() || [];
    this.guestId = this.guests.length > 0 ? Math.max(...this.guests.map(g => g.guestId)) + 1 : 1;
  }
}
