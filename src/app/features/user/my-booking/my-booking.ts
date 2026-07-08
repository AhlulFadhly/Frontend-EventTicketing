import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { BookingService } from '../services/booking.service';
import { Booking } from '../models/booking.model';
import { MatDialog } from '@angular/material/dialog';
import { TicketDialog } from '../ticket-dialog/ticket-dialog';
import { MatIconModule } from '@angular/material/icon';
import { StatusChip } from '../../../shared/status-chip/status-chip';
import { Barcode } from '../barcode/barcode';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-bookings',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, StatusChip, Barcode],
  templateUrl: './my-booking.html',
  styleUrl: './my-booking.scss',
})
export class MyBooking implements OnInit {
  private router = inject(Router);
  private bookingService = inject(BookingService);

  showBarcodeModal: boolean = false;
  selectedInvoiceId: string = '';
  selectedEventTitle: string = '';

  myBookings: any[] = [];

  ngOnInit() {
    this.loadBookings();
  }

  loadBookings() {
    this.bookingService.getMyBookings().subscribe({
      next: (res) => {
        this.myBookings = res.data;
        console.log(this.myBookings);
        
      },
    });
  }

  
  navigateToPayment(booking: any) {
    this.router.navigate(['/checkout'], {
      queryParams: {
        ticketId: booking.ticketId,
        price: booking.totalAmount / booking.quantity, 
        tierName: booking.ticketTier,
        eventTitle: booking.eventTitle,
        bookingId: booking.id,
        step: 2,
      },
    });
  }

  openBarcode(invoiceCode: string, eventTitle: string) {
    this.selectedInvoiceId = invoiceCode;
    this.selectedEventTitle = eventTitle;
    this.showBarcodeModal = true;
  }
}
