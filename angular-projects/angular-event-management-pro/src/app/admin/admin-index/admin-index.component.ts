import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User, Event } from '../../models/user';
import { DatePipe } from '@angular/common';
import { StorageService } from '../../storage/storage.service';
import { EventImageService } from '../../services/event-image.service';
@Component({
  selector: 'app-admin-index',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-index.component.html',
  styleUrls: ['./admin-index.component.css'],
  providers: [DatePipe],
})
export class AdminIndexComponent implements OnInit {
  eventToEditId: number= 0;
  user: User | null = null;
  events: Event[] = [];
  eventName: string = '';
  eventDate: string = '';
  eventDescription: string = '';
  eventCategory: string = '';
  eventStatus: string = '';
  showEdit:boolean=false;
  showBackdrop: boolean = false;
  showDetails: boolean = false;
  eventDetail: any = {};
  birthdayEvents: Event[] = [];
  weddingEvents: Event[] = [];
  conferenceEvents: Event[] = [];

  constructor(private storageService:StorageService,private userService: UserService, private datePipe: DatePipe,private eventImageService:EventImageService) {}

  closeBackdrop() {
    this.showBackdrop = false;
   this.showEdit=false;
  }

  ngOnInit(): void {
    this.user = this.storageService.getLoggedInUser();
    this.loadEvents();
  }

  loadEvents(): void {
    this.events = this.eventImageService.getEventItems() || [];
    this.categorizeEvents();
  }

  categorizeEvents(): void {
    this.birthdayEvents = this.events.filter(event => event.eventCategory === 'birthday');
    this.weddingEvents = this.events.filter(event => event.eventCategory === 'wedding');
    this.conferenceEvents = this.events.filter(event => event.eventCategory === 'conference');
  }

  addEventItem(): void {
    const newEvent: Event = {
      id: this.eventToEditId || this.generateUniqueId(),
      eventName: this.eventName,
      eventDate: this.eventDate,
      eventDescription: this.eventDescription,
      eventStatus: this.eventStatus,
      eventCategory: this.eventCategory,
      imageUrl:this.eventImageService.getImageUrl(this.eventCategory),
    };

    if (this.eventToEditId) {
      const eventIndex = this.events.findIndex(event => event.id === this.eventToEditId);
      if (eventIndex !== -1) {
        this.events[eventIndex] = { ...newEvent };
      }
      this.eventToEditId = 0; 
    } else {
      this.events.push(newEvent);
    }

    this.eventImageService.saveEventItems(this.events);

    this.closeBackdrop();
    this.loadEvents();
    this.resetForm();
  }

  private generateUniqueId(): number {
    return this.events.length + 1;
  }

  deleteEvent(id: number): void {
    this.events = this.events.filter(event => event.id !== id);
    this.eventImageService.saveEventItems(this.events);
    this.loadEvents();
  }

  editEvent(id: number): void {
    this.showEdit = true; 
    this.eventToEditId = id; 
    const event = this.events.find(event => event.id === id);
    
    if (event) {
        this.eventName = event.eventName;
        this.eventDate = new Date(event.eventDate).toISOString().split('T')[0];
        this.eventDescription = event.eventDescription;
        this.eventStatus = event.eventStatus;
        this.eventCategory = event.eventCategory;
    } else {
        console.error('Event not found:', id);
    }
}
  viewDetail(event: Event): void {
    this.eventDetail = {
      name: event.eventName,
      date: event.eventDate,
      description: event.eventDescription,
      category: event.eventCategory,
      status: event.eventStatus,
      image: event.imageUrl,
    };
    
    this.showDetails = true;
    this.showBackdrop = true; 
  }
  closeEdit() {
    this.showEdit = false; 
    this.resetForm(); 
  }
  
  closeDetail(): void {
    this.showDetails = false;
    this.showBackdrop = false;
    this.eventDetail = {};
  }

  private resetForm(): void {
    this.eventName = '';
    this.eventDate = '';
    this.eventDescription = '';
    this.eventStatus = '';
    this.eventCategory = '';
  }

  formatDate(dateString: string): string {
    return this.datePipe.transform(dateString, 'dd/MM/yyyy') || '';
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'canceled':
        return 'event-canceled';
      case 'planning':
        return 'event-planning'; 
      case 'finalized':
        return 'event-finalized'; 
      default:
        return ''; 
    }
  }
  
}
