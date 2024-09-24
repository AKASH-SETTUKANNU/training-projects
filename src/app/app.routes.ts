import { Routes } from '@angular/router';
import { AdminIndexComponent } from './admin/admin-index/admin-index.component';
import { AdminGuestsComponent } from './admin/admin-guests/admin-guests.component';
import { AdminEventsComponent } from './admin/admin-events/admin-events.component';
import { AdminAgendaComponent } from './admin/admin-agenda/admin-agenda.component';
import { AdminUsermanagementComponent } from './admin/admin-usermanagement/admin-usermanagement.component';
import { AdminBackupComponent } from './admin/admin-backup/admin-backup.component';
import { GuestIndexComponent } from './guest/guest-index/guest-index.component';
import { GuestEventsComponent } from './guest/guest-events/guest-events.component';
import { GuestGuestManagementComponent } from './guest/guest-guest-management/guest-guest-management.component';
import { GuestAgendaComponent } from './guest/guest-agenda/guest-agenda.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },

    {
        path: 'login',
        loadComponent: () => Promise.resolve(LoginComponent)
    },
    {
        path: 'signup',
        loadComponent: () => Promise.resolve(SignupComponent)
    },
    {
        path: 'admin/admin-index',
        loadComponent: () => Promise.resolve(AdminIndexComponent)
    },
    {
        path: 'admin/admin-events',
        loadComponent: () => Promise.resolve(AdminEventsComponent)
    },
    {
        path: 'admin/admin-guests',
        loadComponent: () => Promise.resolve(AdminGuestsComponent)
    },
    {
        path: 'admin/admin-agenda',
        loadComponent: () => Promise.resolve(AdminAgendaComponent)
    },
    {
        path: 'admin/admin-usermanagement',
        loadComponent: () => Promise.resolve(AdminUsermanagementComponent)
    },
    {
        path: 'admin/admin-backup',
        loadComponent: () => Promise.resolve(AdminBackupComponent)
    },
    {
        path: 'guest/guest-index',
        loadComponent: () => Promise.resolve(GuestIndexComponent)
    },
    {
        path: 'guest/guest-events',
        loadComponent: () => Promise.resolve(GuestEventsComponent)
    },
    {
        path: 'guest/guest-guest-management',
        loadComponent: () => Promise.resolve(GuestGuestManagementComponent)
    },
    {
        path: 'guest/guest-agenda',
        loadComponent: () => Promise.resolve(GuestAgendaComponent)
    }
];
