import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';

import { Event } from '../../organizer/models/event.model';
import { EventService } from '../../organizer/services/event.service';

@Component({
  selector: 'app-event-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    MatDialogModule,
  ],
  templateUrl: './event-detail.html',
  styleUrl: './event-detail.scss',
})
export class EventDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private eventService = inject(EventService);
  private router = inject(Router);

  @Output() onTicketSelected = new EventEmitter<{ ticket: any; eventTitle: string }>();

  event?: Event;

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.eventService.getEvent(id).subscribe({
      next: (res) => {
        this.event = res.data;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
  
  isTicketLocked(startSaleDate: string | Date | undefined): boolean {
    if (!startSaleDate) return false;
    const saleTime = new Date(startSaleDate).getTime();
    const now = new Date().getTime();
    return saleTime > now;
  }

  selectTicket(ticket: any) {
    console.log('Select Ticket');

    this.router.navigate(['user', 'checkout'], {
      queryParams: {
        ticketId: ticket.id,
        price: ticket.price,
        tierName: ticket.name,
        eventTitle: this.event?.title || '',
      },
    });
  }
}
