import { Component, Inject, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MAT_DIALOG_DATA,
  MatDialogModule
} from '@angular/material/dialog';

import { MatButtonModule } from '@angular/material/button';

import { QRCodeComponent } from 'angularx-qrcode';

import { BookingService } from '../services/booking.service';

@Component({
  selector: 'app-ticket-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    QRCodeComponent
  ],
  templateUrl: './ticket-dialog.html',
  styleUrl: './ticket-dialog.scss'
})
export class TicketDialog implements OnInit {

  private bookingService = inject(BookingService);

  qr = '';

  ticketCode = '';

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: any
  ) {}

  ngOnInit() {

    this.bookingService
      .getQr(this.data.bookingId)
      .subscribe(res => {

        this.qr = res.data.qrValue;

        this.ticketCode = res.data.ticketCode;

      });

  }

}