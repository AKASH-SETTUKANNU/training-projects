import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  getMenuItems(userRole: string): Array<{ name: string; link: string; icon: string }> {
    if (userRole === 'admin') {
      return [
        { name: 'Events List', link: '/admin/admin-index', icon: 'fa-solid fa-house' },
        { name: 'Add Events', link: '/admin/admin-events', icon: 'fa-solid fa-calendar-days' },
        { name: 'Guests List', link: '/admin/admin-guests', icon: 'fa-solid fa-user-group' },
        { name: 'Add Agenda', link: '/admin/admin-agenda', icon: 'fa-solid fa-location-dot' },
        { name: 'Users List', link: '/admin/admin-usermanagement', icon: 'fa-regular fa-user' },
        { name: 'Data Backup', link: '/admin/admin-backup', icon: 'fa-solid fa-database' }
      ];
    } else {
      return [
        { name: 'Events List', link: '/guest/guest-index', icon: 'fa-solid fa-house' },
        { name: 'Add Events', link: '/guest/guest-events', icon: 'fa-solid fa-calendar-days' },
        { name: 'Guests List', link: '/guest/guest-guest-management', icon: 'fa-solid fa-user-group' },
        { name: 'Add Agenda', link: '/guest/guest-agenda', icon: 'fa-solid fa-location-dot' }
      ];
    }
  }
}