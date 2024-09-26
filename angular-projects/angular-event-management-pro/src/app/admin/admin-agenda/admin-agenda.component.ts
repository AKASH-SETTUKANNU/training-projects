import { Component, OnInit } from '@angular/core';
import { Agenda } from '../../models/user';
import { Event, Guests } from '../../models/user'; // Ensure your paths are correct
import { AgendaService } from '../../services/agenda.service';
import { EventService } from '../../services/event.service'; // Service for event-related data
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
  agendas: Agenda[] = [];
  events: Event[] = []; // List of events
  selectedEventId: string = ''; // Selected event ID
  selectedEventGuests: Guests[] = []; // Guests for the selected event

  // Agenda fields
  agendaId: number = 0;
  agendaLocation: string = '';
  agendaDate: string = '';
  agendaStartTime: string = '';
  agendaEndTime: string = '';
  agendaDescription: string = '';
  isDisplayAddAgendaArea: boolean = false;

  // Error handling
  locationError: string = 'Location is required...!';
  dateError: string = 'Date is required...!';
  startTimeError: string = 'Start time is required...!';
  endTimeError: string = 'End time is required...!';
  descriptionError: string = 'Description is required...!';

  showLocationError: boolean = false;
  showDateError: boolean = false;
  showStartTimeError: boolean = false;
  showEndTimeError: boolean = false;
  showDescriptionError: boolean = false;

  constructor(private agendaService: AgendaService, private eventService: EventService) {}

  ngOnInit(): void {
    this.loadAgendas();
    this.loadEvents(); // Load events on initialization
  }

  loadAgendas(): void {
    this.agendas = this.agendaService.getAgendas();
  }

  loadEvents(): void {
    this.events = this.eventService.getEvents(); // Assuming you have this method
  }

  onEventChange(): void {
    const selectedEvent = this.events.find(event => event.id === this.selectedEventId);
    this.selectedEventGuests = selectedEvent ? selectedEvent.guests || [] : [];
  }

  saveEventLocationDetails(): void {
    const newAgenda: Agenda = {
      agendaId: this.agendaId || Date.now(),
      agendaLocation: this.agendaLocation,
      agendaDate: this.agendaDate,
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
      this.isDisplayAddAgendaArea = true;
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

  displayAddAgenda(): void {
    this.isDisplayAddAgendaArea = !this.isDisplayAddAgendaArea;
  }

  resetForm(): void {
    this.agendaId = 0;
    this.agendaLocation = '';
    this.agendaDate = '';
    this.agendaStartTime = '';
    this.agendaEndTime = '';
    this.agendaDescription = '';
    this.selectedEventId = ''; // Reset selected event
    this.selectedEventGuests = []; // Reset guests list
  }

  validateOnBlur(field: string): void {
    switch (field) {
      case 'eventLocation':
        this.showLocationError = !this.agendaLocation;
        break;
      case 'eventDate':
        this.showDateError = !this.agendaDate;
        break;
      case 'eventStartAt':
        this.showStartTimeError = !this.agendaStartTime;
        break;
      case 'eventEndAt':
        this.showEndTimeError = !this.agendaEndTime;
        break;
      case 'eventDescription':
        this.showDescriptionError = !this.agendaDescription;
        break;
    }
  }
}
