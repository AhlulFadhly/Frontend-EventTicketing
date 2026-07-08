import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../../environments/environment';
import { ApiResponse } from '../../../core/models/api-response.model';
import { Booking } from '../models/booking.model';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private http = inject(HttpClient);

  private api = environment.apiUrl;

  createBooking(body: { ticketId: number; quantity: number }) {
    return this.http.post<ApiResponse<any>>(`${this.api}/bookings`, body);
  }

  payBooking(id: number, method: string) {
    return this.http.post<ApiResponse<any>>(`${this.api}/bookings/${id}/pay`, { method });
  }

  getMyBookings() {
    return this.http.get<ApiResponse<Booking[]>>(`${this.api}/bookings/my`);
  }

  cancelBooking(id: number) {
    return this.http.patch<ApiResponse<any>>(`${this.api}/bookings/${id}/cancel`, {});
  }

  getQr(id: number) {
    return this.http.get<
      ApiResponse<{
        bookingId: number;
        qrValue: string;
        ticketCode: string;
      }>
    >(`${this.api}/bookings/${id}/qr`);
  }
}
