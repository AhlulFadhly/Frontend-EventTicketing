export interface Booking {

  id: number;

  ticket: string;

  quantity: number;

  total: number;

  status: string;

  paymentMethod: string | null;

  ticketCode: string | null;

  expiredAt: string;

  qrValue: string | null;

}