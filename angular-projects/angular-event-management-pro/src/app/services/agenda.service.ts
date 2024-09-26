import { Injectable } from '@angular/core';
import { Agenda, User } from '../models/user';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {
  private users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
  private currentUser: User | undefined;
  private agendas: Agenda[] = [];

  constructor(private storageService: StorageService) {
    const loggedInUser = this.storageService.getLoggedInUser();
    this.currentUser = this.users.find((u: User) => u.userEmail === loggedInUser?.userEmail);
    this.agendas = this.currentUser?.agendas || [];
  }

  getAgendas(): Agenda[] {
    return this.agendas;
  }

  addAgenda(agenda: Agenda): void {
    this.agendas.push(agenda);
    this.saveAgendas();
  }

  updateAgenda(updatedAgenda: Agenda): void {
    const index = this.agendas.findIndex(a => a.agendaId === updatedAgenda.agendaId);
    if (index !== -1) {
      this.agendas[index] = updatedAgenda;
      this.saveAgendas();
    }
  }

  deleteAgenda(agendaId: number): void {
    this.agendas = this.agendas.filter(a => a.agendaId !== agendaId);
    this.saveAgendas();
  }

  private saveAgendas(): void {
    if (this.currentUser) {
      const updatedUser: User = {
        ...this.currentUser,
        agendas: this.agendas
      };

      const updatedUsers = this.users.map(user => 
        user.userEmail === updatedUser.userEmail ? updatedUser : user
      );

      localStorage.setItem('users', JSON.stringify(updatedUsers));
    }
  }
}
