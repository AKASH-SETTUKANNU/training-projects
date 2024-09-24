import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  showEventAddBlock = false;
  showNotificationDisplay = false;
  showProfileEditArea = false;
  searchText:string='';

  profile: { name: string; dateOfBirth: string };

  constructor() {
    const currentUserDetails = JSON.parse(localStorage.getItem('loggedInUser') || 'null');
    
    this.profile = {
      name: currentUserDetails ? currentUserDetails.userName : 'Guest',
      dateOfBirth:currentUserDetails ? currentUserDetails.userBirthDate:'unknown'
    };
  }

  notifications = [
    { name: 'Koushikk', message: 'Inviting for his marriage ajadhjadsftfwefwe7 wdo d' },
  ];

  eventCategories = [
    { name: 'Birthday', icon: 'fa-solid fa-cake-candles' },
    { name: 'Marriage', icon: 'fa-solid fa-ring' },
    { name: 'Conference', icon: 'fa-regular fa-handshake' },
    { name: 'Others', icon: 'fa-solid fa-gift' },
  ];

  menubarDisplay() {
  }

  addEvent() {
    this.showEventAddBlock = !this.showEventAddBlock;
  }

  displayNotification() {
    this.showNotificationDisplay = !this.showNotificationDisplay;
  }

  displayLogout() {
    this.showProfileEditArea = !this.showProfileEditArea;
  }
}