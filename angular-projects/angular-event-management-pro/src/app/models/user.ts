export interface User {
  userName: string;
  userEmail: string;
  userPassword: string;
  userRole: string;
  userBirthDate: string;
  userLocation?: string;
  events?: Event[];
  invitations?: Invitation[];
  notifications?: Invitation[]; 
}
export interface Invitation {
  senderEmail: string; 
  senderName: string;  
  guestEmail: string;
  eventId: number;
  eventName: string;
  eventLocation: string;
  eventDate: string;
  eventDescription: string;
  agendaLocation: string;
  agendaDate: string;
  agendaStartTime: string;
  agendaEndTime: string;
  agendaDescription: string;
  invitationSent: boolean;
}


export interface Event {
  id: number;
  eventName: string;
  eventDate: string;
  eventDescription: string;
  eventStatus: string;
  eventCategory: string;
  imageUrl?: string;
  guests?: Guests[];
  agendas?: Agenda[];
}

export interface Guests {
  guestId: number;
  guestName: string;
  guestEmail: string;
  guestBirthDate: string;
  guestLocation?: string;
}

export interface Agenda {
  agendaId: number;
  agendaLocation: string;
  agendaDate: string;
  agendaStartTime: string;
  agendaEndtime: string;
  agendaDescription: string;
}
