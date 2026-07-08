import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { BookingService } from '../services/booking.service';
import { Barcode } from "../barcode/barcode";

@Component({
  selector: 'app-booking-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule, Barcode],
  templateUrl: './booking-checkout.html',
  styleUrls: ['./booking-checkout.scss'],
})
export class BookingCheckout implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private location = inject(Location);
  private bookingService = inject(BookingService);

  eventTitle: string = '';
  ticketData: any = { id: null, name: '', price: 0 };

  currentStep: 1 | 2 = 1;
  quantity: number = 1;
  selectedMethod: 'QRIS' | 'BANK_TRANSFER' = 'QRIS';
  isLoading: boolean = false;

  generatedBookingId: number | null = null;

  ngOnInit(): void {
  this.route.queryParams.subscribe(params => {
    this.eventTitle = params['eventTitle'] || 'Premium Event';
    this.ticketData = {
      id: params['ticketId'] ? Number(params['ticketId']) : null,
      name: params['tierName'] || 'Regular',
      price: params['price'] ? Number(params['price']) : 0
    };

    if (params['bookingId'] && params['step'] === '2') {
      this.generatedBookingId = Number(params['bookingId']);
      this.currentStep = 2; // Langsung kunci tampilan di form Step 2 (Pilih Metode VA / QRIS)
    }
  });
}

  increaseQty() {
    this.quantity++;
  }

  decreaseQty() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  goBack() {
    this.location.back();
  }

  proceedToBooking() {
    this.isLoading = true;

    const bookingPayload = {
      ticketId: this.ticketData.id,
      quantity: this.quantity,
    };

    this.bookingService.createBooking(bookingPayload).subscribe({
      next: (response) => {
        this.isLoading = false;

        this.generatedBookingId = response.data.id;
        this.currentStep = 2;

        console.log('Booking ID:', this.generatedBookingId);
      },
      error: (err) => {
        this.isLoading = false;
        console.error(err);

        alert(err.error?.message ?? 'Failed to create booking');
      },
    });
  }

  executePayment() {
    if (!this.generatedBookingId) return;

    this.isLoading = true;

    this.bookingService.payBooking(this.generatedBookingId, this.selectedMethod).subscribe({
      next: (response) => {
        this.isLoading = false;

        alert(response.message ?? 'Payment successful');

        this.router.navigate(['/user/my-booking']);
      },
      error: (err) => {
        this.isLoading = false;
        console.error(err);

        alert(err.error?.message ?? 'Payment failed');
      },
    });
  }
}
