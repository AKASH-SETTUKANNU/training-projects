import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StorageService } from '../storage/storage.service';
import { Invitation, User } from '../models/user';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  showEventAddBlock = false;
  showNotificationDisplay = false;
  showProfileEditArea = false;
  searchText: string = '';

  isShowNotificationInfo: boolean = false;
  notifications: Invitation[] = [];
  detailNotification: Invitation | undefined;

  profile: { name: string; dateOfBirth: string };

  constructor(private storageService: StorageService) {
    const currentUserDetails = JSON.parse(localStorage.getItem('loggedInUser') || 'null');
    this.profile = {
      name: currentUserDetails ? currentUserDetails.userName : 'Guest',
      dateOfBirth: currentUserDetails ? currentUserDetails.userBirthDate : 'unknown'
    };
  }

  ngOnInit(): void {
    console.log('Component initialized');
    this.loadNotifications();
  }

  loadNotifications(): void {
    const loggedUser = this.storageService.getLoggedInUser();
    const users = this.storageService.getUsers();
    
    const user = users.find((u: User) => u.userEmail === loggedUser?.userEmail);
    
    if (user) {
      this.notifications = user.notifications || [];
      console.log("Notifications loaded:", this.notifications);
    } else {
      console.error("User not found");
    }
  }

  eventCategories = [
    { name: 'Birthday', icon: 'fa-solid fa-cake-candles' },
    { name: 'Marriage', icon: 'fa-solid fa-ring' },
    { name: 'Conference', icon: 'fa-regular fa-handshake' },
    { name: 'Others', icon: 'fa-solid fa-gift' },
  ];

  menubarDisplay() {}

  addEvent() {
    this.showEventAddBlock = !this.showEventAddBlock;
  }

  displayNotification() {
    this.showNotificationDisplay = !this.showNotificationDisplay;
  }

  displayLogout() {
    this.showProfileEditArea = !this.showProfileEditArea;
  }

  showNotificationInfo(notificationId: number) {
    this.isShowNotificationInfo = true;
    const loggedUser = this.storageService.getLoggedInUser();
    const users = this.storageService.getUsers();
    
    const user = users.find((u: User) => u.userEmail === loggedUser?.userEmail);
    
    if (user) {
      this.detailNotification = user.notifications?.find((n: Invitation) => n.eventId === notificationId);
    } else {
      console.error("User not found");
    }
  }

  closenotification(): void {
    this.isShowNotificationInfo = false;
  }
}
