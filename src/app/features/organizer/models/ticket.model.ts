export interface Ticket {

  id: number;

  name: string;

  price: number;

  remaining: number;

  soldOut: boolean;

  quota?: number;

  saleStart?: string;

  saleEnd?: string;

}