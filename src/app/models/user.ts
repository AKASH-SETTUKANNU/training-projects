export interface User {
  userName: string;
  userEmail: string;
  userPassword: string;
  userRole: string;
  userBirthDate: string;
  events?: Event[]; 
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
