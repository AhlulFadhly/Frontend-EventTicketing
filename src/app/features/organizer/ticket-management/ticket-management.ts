import { Component, EventEmitter, Input, OnInit, Output, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule, MatDrawer } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { EventService } from '../services/event.service';
import { Ticket } from '../models/ticket.model';

@Component({
  selector: 'app-ticket-management',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatCardModule,
  ],
  templateUrl: './ticket-management.html',
  styleUrl: './ticket-management.scss',
})
export class TicketManagement implements OnInit {
  private eventService = inject(EventService);

  @Input() eventId!: number;

  @Output() onAddTicket = new EventEmitter<void>();
  @Output() onEditTicket = new EventEmitter<Ticket>();

  tickets: any[] = [];
  mode: 'create' | 'edit' = 'create';
  loading = false;

  ngOnInit(): void {
    this.loadTickets();

     this.eventService.refreshTickets$.subscribe(() => {
        this.loadTickets();
    });
  }

  loadTickets() {
    this.loading = true;
    this.eventService.getTickets(this.eventId).subscribe({
      next: (res) => {
        this.tickets = res.data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  disableTicket(ticket: any) {
    if (!confirm(`Disable "${ticket.name}" ?`)) return;
    this.eventService.disableTicket(ticket.id).subscribe({
      next: () => {
        this.loadTickets();
      },
    });
  }
}
