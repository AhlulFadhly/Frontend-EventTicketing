export interface CreateTicketRequest {

  eventId: number;

  name: string;

  price: number;

  quota: number;

  saleStart: string;

  saleEnd: string;

}