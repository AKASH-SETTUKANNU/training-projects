import { Injectable } from '@angular/core';
import { Agenda, User } from '../models/user';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {
  private users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
  private currentUser: User | undefined;

  constructor(private storageService: StorageService) {
    const loggedInUser = this.storageService.getLoggedInUser();
    this.currentUser = this.users.find((u: User) => u.userEmail === loggedInUser?.userEmail);
  }

  getAgendas(eventId: number): Agenda[] {
    const event = this.currentUser?.events?.find(e => e.id === Number(eventId));
    return event && event.agendas ? event.agendas : []; 
  }

  addAgenda(eventId: number, agenda: Agenda): void {
    console.log("eneter the ad....");
    const event = this.currentUser?.events?.find(e => e.id === Number(eventId));
    console.log(event);
    if (event) {
      console.log("eneter the event");
      if (!event.agendas) {
        event.agendas = []; 
      }
      event.agendas.push(agenda);
      this.saveAgendas();
    }
  }

  updateAgenda(eventId: number, updatedAgenda: Agenda): void {
    const event = this.currentUser?.events?.find(e => e.id === Number(eventId));
    if (event && event.agendas) {
      const index = event.agendas.findIndex(a => a.agendaId === updatedAgenda.agendaId);
      if (index !== -1) {
        event.agendas[index] = updatedAgenda;
        this.saveAgendas();
      }
    }
  }

  deleteAgenda(eventId: number, agendaId: number): void {
    const event = this.currentUser?.events?.find(e => e.id === Number(eventId));
    if (event && event.agendas) {
      event.agendas = event.agendas.filter(a => a.agendaId !== Number(agendaId));
      this.saveAgendas();
    }
  }

  private saveAgendas(): void {
    if (this.currentUser) {
      const updatedUser: User = {
        ...this.currentUser,
        events: this.currentUser.events 
      };

      const updatedUsers = this.users.map(user => 
        user.userEmail === updatedUser.userEmail ? updatedUser : user
      );

      localStorage.setItem('users', JSON.stringify(updatedUsers));
    }
  }
}
