export interface User {
  userName: string;
  userEmail: string;
  userPassword: string;
  userRole: string;
  userBirthDate: string;
  userLocation?:string;
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
  guestId:number;
  guestName: string;
  guestEmail: string;
  guestBirthDate: string;
  guestLocation?:string;
}