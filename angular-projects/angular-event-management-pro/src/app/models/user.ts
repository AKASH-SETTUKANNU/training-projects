export interface User {
  userName: string;
  userEmail: string;
  userPassword: string;
  userRole: string;
  userBirthDate: string;
  events?: Event[]; 
  guests?:Guests[];
}

export interface Event {
  id: string;
  eventName: string;
  eventDate: string;
  eventDescription: string;
  eventStatus: string;
  eventCategory: string;
  imageUrl?: string; 
}

export interface Guests{
  userName: string;
  userEmail: string;
  userBirthDate: string;
}