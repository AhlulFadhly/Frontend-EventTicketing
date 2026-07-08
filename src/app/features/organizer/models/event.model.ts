import { Organizer } from './organizer.model';
import { Ticket } from './ticket.model';

export interface Event {

  id: number;

  title: string;

  description: string;

  banner: string;

  category: string;

  venue: string;

  address: string;

  city: string;

  status: string;

  time: string;

  organizer: Organizer;

  tickets: Ticket[];

}