import { Component, OnInit } from '@angular/core';
import { Agenda } from '../../models/user';
import { AgendaService } from '../../services/agenda.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-agenda',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-agenda.component.html',
  styleUrl: './admin-agenda.component.css'
})
export class AdminAgendaComponent implements OnInit {
  agendas: Agenda[] = [];
  agendaId: number = 0;
  agendaLocation: string = '';
  agendaDate: string = '';
  agendaStartTime: string = '';
  agendaEndTime: string = '';
  agendaDescription: string = '';

  constructor(private agendaService: AgendaService) {}

  ngOnInit(): void {
    this.loadAgendas();
  }

  loadAgendas(): void {
    this.agendas = this.agendaService.getAgendas();
  }

  saveEventLocationDetails(): void {
    const newAgenda: Agenda = {
      agendaId: this.agendaId || Date.now(),
      agendaLocation: this.agendaLocation,
      agendaDate: this.agendaDate ? new Date(this.agendaDate).toISOString().split('T')[0] : '',
      agendaStartTime: this.agendaStartTime,
      agendaEndtime: this.agendaEndTime,
      agendaDescription: this.agendaDescription
    };

    if (this.agendaId) {
      this.agendaService.updateAgenda(newAgenda);
    } else {
      this.agendaService.addAgenda(newAgenda);
    }

    this.resetForm();
    this.loadAgendas();
  }

  editAgenda(agendaId: number): void {
    const agenda = this.agendas.find(a => a.agendaId === agendaId);
    if (agenda) {
      this.agendaId = agenda.agendaId;
      this.agendaLocation = agenda.agendaLocation;
      this.agendaDate = agenda.agendaDate;
      this.agendaStartTime = agenda.agendaStartTime;
      this.agendaEndTime = agenda.agendaEndtime;
      this.agendaDescription = agenda.agendaDescription;
    }
  }

  deleteAgenda(agendaId: number): void {
    this.agendaService.deleteAgenda(agendaId);
    this.loadAgendas();
  }

  resetForm(): void {
    this.agendaId = 0;
    this.agendaLocation = '';
    this.agendaDate = '';
    this.agendaStartTime = '';
    this.agendaEndTime = '';
    this.agendaDescription = '';
  }

  validateOnBlur(field: string): void {}
}