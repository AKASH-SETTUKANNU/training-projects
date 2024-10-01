import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { StorageService } from '../storage/storage.service';
import { Invitation, User, Event } from '../models/user';
import { MenuService } from '../services/menu.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'] 
})
export class HeaderComponent implements OnInit {
  showEventAddBlock = false;
  showNotificationDisplay = false;
  showProfileEditArea = false;
  searchText: string = '';
  
  ismenuDisplay: boolean = false;
  isrespondSend: boolean = true;
  isShowNotificationInfo: boolean = false;
  notifications: Invitation[] = [];
  detailNotification: Invitation | undefined;

  profile: { name: string; dateOfBirth: string };

  constructor(private storageService: StorageService, private menuService: MenuService) {
    const currentUserDetails = JSON.parse(localStorage.getItem('loggedInUser') || 'null');
    this.profile = {
      name: currentUserDetails ? currentUserDetails.userName : 'Guest',
      dateOfBirth: currentUserDetails ? currentUserDetails.userBirthDate : 'unknown'
    };
  }
  menuItems: Array<{ name: string; link: string; icon: string }> = [];

  setMenuItems() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || 'null');
    const userRole = loggedInUser ? loggedInUser.userRole : ''; 
    console.log(userRole);
    this.menuItems = this.menuService.getMenuItems(userRole); 
  }

  ngOnInit(): void {
    this.setMenuItems();
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

  menubarDisplay() {
    this.ismenuDisplay = !this.ismenuDisplay;
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

  invitationRespond(respond: string, eventId: number | undefined) {
    const loggedUser = this.storageService.getLoggedInUser();
    const users = this.storageService.getUsers();
    
    const user = users.find((u: User) => u.userEmail === loggedUser?.userEmail);
    console.log("enter1");
    if (user) {
        const events = user.events || [];
        const event = events.find((eve: Event) => eve.id === eventId);
        console.log("enter1");
        if (event) {
          console.log("enter2");
            // Update response count based on user action
            if (respond === 'accept') {
                event.accept = (event.accept || 0) + 1;
            } else if (respond === 'pending') {
                event.pending = (event.pending || 0) + 1;
            } else if (respond === 'reject') {
                event.reject = (event.reject || 0) + 1;
            }
            console.log(user.notifications);
            // Safely check notifications
            if (user.notifications) {
                const notificationIndex = user.notifications.findIndex((n: Invitation) => n.eventId === eventId);
                console.log(typeof eventId);
                if (notificationIndex >= 0) {
                  console.log(  user.notifications[notificationIndex].invitationSent);
                    user.notifications[notificationIndex].invitationSent = true;
                    this.detailNotification = user.notifications[notificationIndex]; // Update detailNotification
                } else {
                    console.error("Notification not found.");
                }
            } else {
                console.error("Notifications are undefined for the user.");
            }

            // Update the user in storage
            this.storageService.updateUser(user);
            console.log(`Response recorded: ${respond} for event ID: ${eventId}`);
        } else {
            console.error(`Event with ID ${eventId} not found.`);
        }
    } else {
        console.error("User not found");
    }
}



}
