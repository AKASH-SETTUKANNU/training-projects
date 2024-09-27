import { Component, OnInit } from '@angular/core';
import { Agenda, Event } from '../../models/user';
import { AgendaService } from '../../services/agenda.service';
import { EventImageService } from '../../services/event-image.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-agenda',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-agenda.component.html',
  styleUrls: ['./admin-agenda.component.css']
})
export class AdminAgendaComponent implements OnInit {
  events: Event[] = [];
  selectedEventId: number = 0;
  agendas: Agenda[] = [];
  agendaId: number = 0;
  agendaLocation: string = '';
  agendaDate: string = '';
  agendaStartTime: string = '';
  agendaEndTime: string = '';
  agendaDescription: string = '';
  eventImageUrl: string | undefined;

  constructor(private agendaService: AgendaService, private eventService: EventImageService) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.events = this.eventService.getEventItems(); 
  }

  onEventChange(eventId: number): void {
    this.selectedEventId = eventId;
    this.loadAgendas();
 
  }

  loadAgendas(): void {
    console.log("enter load agenda");
    if (this.selectedEventId) {
      console.log("enter selected agenda");
      this.agendas = this.agendaService.getAgendas(this.selectedEventId);
      console.log(this.agendas);
    } else {
      this.agendas = [];
    }
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
      console.log("eneter the update agenda add ");
      this.agendaService.updateAgenda(this.selectedEventId, newAgenda);
    } else {
      console.log("eneter the new agenda add ");
      this.agendaService.addAgenda(this.selectedEventId, newAgenda);
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
    this.agendaService.deleteAgenda(this.selectedEventId, agendaId);
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
}
