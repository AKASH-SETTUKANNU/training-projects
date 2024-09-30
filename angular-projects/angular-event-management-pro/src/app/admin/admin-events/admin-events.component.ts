import { Invitation } from './../../models/user';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { StorageService } from '../../storage/storage.service';
import { UserService } from '../../services/user.service';
import { User, Event,Guests} from '../../models/user';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { EventImageService } from '../../services/event-image.service';

@Component({
  selector: 'app-admin-index',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatInputModule, MatFormFieldModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule],
  templateUrl: './admin-events.component.html',
  styleUrls: ['./admin-events.component.css'],
})
export class AdminEventsComponent  {
  eventForm: FormGroup;
  user: User | null = null;
  events: Event[] = [];
  birthdayEvents: Event[] = [];
  weddingEvents: Event[] = [];
  conferenceEvents: Event[] = [];
  successMessage: string | null = null;
  
  errorMessages = {
    eventName: 'Event name is required.',
    eventDate: 'Event date is required.',
    eventDescription: 'Event description is required.',
    eventStatus: 'Event status is required.',
    eventCategory: 'Event category is required.',
  };
 
  constructor(private fb: FormBuilder, private storageService: StorageService, private userService: UserService,private eventImageService:EventImageService) {
    this.eventForm = this.fb.group({
      eventName: ['', Validators.required],
      eventDate: ['', Validators.required],
      eventDescription: ['', Validators.required],
      eventStatus: ['', Validators.required],
      eventCategory: ['', Validators.required],
    });
  }


  saveEvent(): void {
    if (this.eventForm.valid) {
      const { eventName, eventDate, eventDescription, eventStatus, eventCategory } = this.eventForm.value;
       this.events=this.eventImageService.getEventItems();
      const newEvent: Event = {
        id: this.generateUniqueId(),
        eventName,
        eventDate,
        eventDescription,
        eventStatus,
        eventCategory,
        imageUrl:this.eventImageService.getImageUrl(eventCategory),
        guests: [],
        agendas:[],
      };
      this.events.push(newEvent);
      this.eventImageService.saveEventItems(this.events); 
      this.resetForm();
      this.successMessage = 'Event saved successfully!';

    }
  }

  private generateUniqueId(){
    return this.events.length + 1;
  }



  private resetForm(): void {
    this.eventForm.reset();
    this.successMessage = null;
  }
}