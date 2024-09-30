import { GuestService } from './../../services/guest.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StorageService } from '../../storage/storage.service';
import { Guests, User, Event, Invitation, Agenda } from '../../models/user'; 

@Component({
  selector: 'app-guest-guest-management',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './guest-guest-management.component.html',
  styleUrl: './guest-guest-management.component.css'
})
export class GuestGuestManagementComponent implements OnInit {
  guestId: number = 0;
  respondAcceptCount:number=0;
  respondPendingCount:number=0;
  respondCancelCount:number=0;

  guestName: string = '';
  guestEmail: string = '';
  guestBirthDate: string = '';
  guestLocation: string = '';
  guests: Guests[] = [];
  users: User[] = [];
  events: Event[] = [];
  agendas: Agenda[] = [];  
  searchEmail: string = '';
  searchResults: Guests[] = [];
  invites: Invitation[] = [];
  nameError: string = 'Name is required!';
  emailError: string = '';
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
  updateResponseCounts(): void {
    const currentUser = this.storageService.getLoggedInUser();
    const user = this.storageService.getUsers().find((u: User) => u.userEmail === currentUser?.userEmail);
    const events = user?.events || [];
    const event = events.find((e: Event) => e.id === Number(this.selectedEventId));
  
    if (event) {
      console.log("enter.,.,.");
      this.respondAcceptCount = event.accept || 0;
      this.respondPendingCount = event.pending || 0;
      this.respondCancelCount = event.reject || 0;
    } else {
      this.respondAcceptCount = 0;
      this.respondPendingCount = 0;
      this.respondCancelCount = 0;
    }
  }
  loadEvents(): void {
    const loggedInUser = this.storageService.getLoggedInUser();
    this.users = this.storageService.getUsers();
    const currentUser = this.users.find((u: User) => u.userEmail === loggedInUser?.userEmail);
    this.events = currentUser?.events || [];
    this.agendas = currentUser?.events?.flatMap(event => event.agendas || []) || []; 
    console.log('Loaded events:', this.events);
  }
  

  addGuest(): void {
    if (this.validateGuest() && this.selectedEventId !== null) {
      const existingGuest = this.guestService.findEditGuest(this.selectedEventId, this.guestId);
      const emailExists = this.isEmailExists(this.guestEmail);

      if (!this.iseditGuest && emailExists) {
        this.showEmailError = true;
        this.emailError = 'guest already Added...!';
        return;
      }
       if(this.guestService.findGuest(this.guestEmail)){
      const newGuest: Guests = {
        guestId: this.guestId || this.generateGuestId(),
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
      }}
      else{
        this.emailError = 'User Not exists...!';
      }

      this.iseditGuest = false;
      this.resetForm();
      this.refreshGuestsList();
      this.updateResponseCounts();
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
  }

  refreshGuestsList(): void {
    if (this.selectedEventId > 0) {
      this.guests = this.guestService.getGuestsList(this.selectedEventId);
    } else {
      this.guests = [];
    }
  }

  inviteGuests(): void {
    if (this.guests.length > 0 && this.selectedEventId > 0) {
      const selectedEvent = this.events.find(event => event.id === Number(this.selectedEventId));
      
      // Get agendas from the selected event directly
      const eventAgendas = selectedEvent?.agendas || []; 
  
      if (selectedEvent && eventAgendas.length > 0) {
        const agenda = eventAgendas[0];
        this.invites = [];
  
        this.guests.forEach(guest => {
          const { guestEmail } = guest;
  
          const user = this.users.find(user => user.userEmail === guestEmail);
          const loggedInUser=this.storageService.getLoggedInUser();
          if (user) {
            const invitation: Invitation = {
              senderEmail: loggedInUser?.userEmail || '', 
              senderName: loggedInUser?.userName || '',  
              guestEmail: guest.guestEmail,
              eventId: selectedEvent.id,
              eventName: selectedEvent.eventName,
              eventLocation: agenda.agendaLocation,
              eventDate: selectedEvent.eventDate,
              eventDescription: selectedEvent.eventDescription,
              agendaLocation: agenda.agendaLocation,
              agendaDate: agenda.agendaDate,
              agendaStartTime: agenda.agendaStartTime,
              agendaEndTime: agenda.agendaEndtime,
              agendaDescription: agenda.agendaDescription,
              invitationSent: false
            };
  
            this.invites.push(invitation);
            if (!user.notifications) {
              user.notifications = [];
            }
            user.notifications.push(invitation);
  
            // Update the user in storage after adding the notification
            this.storageService.updateUser(user);
          }
        });
  
        console.log('Invitations sent with agendas:', this.invites);
        alert('Invitations sent successfully!');
      } else {
        alert('No agendas found for the selected event.');
      }
    } else {
      alert('No guests or event selected.');
    }
  }
  onEventChange(): void {
    this.refreshGuestsList(); 
    this.updateResponseCounts();
  }
  

  
  
}
