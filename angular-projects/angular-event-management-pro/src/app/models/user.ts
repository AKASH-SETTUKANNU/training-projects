export interface User {
  userName: string;
  userEmail: string;
  userPassword: string;
  userRole: string;
  userBirthDate: string;
  userLocation?: string;
  events?: Event[];
 
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
