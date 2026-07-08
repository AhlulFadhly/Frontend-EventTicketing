import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { DashboardSummary } from '../models/dashboard.model';
import { DashboardService } from '../services/dashboard.service';
import { MatIconModule } from '@angular/material/icon';
import { MyEvents } from '../my-events/my-events';
import { StatusChip } from '../../../shared/status-chip/status-chip';
import { EventHub } from '../event-hub/event-hub';
import { ModalTicket } from '../ticket-management/modal-ticket/modal-ticket';
import { ModalEvent } from '../my-events/modal-event/modal-event';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-organizer-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MyEvents,
    StatusChip,
    EventHub,
    ModalTicket,
    ModalEvent,
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {
  private route = inject(ActivatedRoute);
  private dashboardService = inject(DashboardService);
  private eventService = inject(EventService);

  activeTab: 'overview' | 'events' | 'transactions' = 'overview';
  selectedEvent: any = null;
  showEventModal = false;
  isEditEvent = false;
  currentEventData: any = null;
  showTicketModal = false;
  isEditTicket = false;
  currentTicketData: any = null;
  summary?: DashboardSummary;

  loading = true;

  ngOnInit(): void {
    this.loadDashboard();
  }

  loadDashboard(): void {
    this.loading = true;

    this.dashboardService.getOrganizerDashboard().subscribe({
      next: (res) => {
        this.summary = res.data;
        this.loading = false;
      },

      error: (err) => {
        console.error(err);
        this.loading = false;
      },
    });
  }
  openEventModal(type: 'create' | 'edit', data?: any) {
    this.isEditEvent = type === 'edit';
    this.currentEventData = data || null;
    this.showEventModal = true;
  }

  openTicketModal(type: 'create' | 'edit', data?: any) {
    this.isEditTicket = type === 'edit';
    this.currentTicketData = data || null;
    this.showTicketModal = true;
  }

  publishEvent(event: any) {
    if (!confirm(`Publish "${event.title}" ?`)) {
      return;
    }
    this.eventService.publishEvent(event.id).subscribe({
      next: () => {
        this.eventService.refreshEvent();
      }
    });
  }

  cancelEvent(event: any) {
    if (!confirm(`Cancel "${event.title}" ?`)) {
      return;
    }
    this.eventService.cancelEvent(event.id).subscribe({
      next: () => {
        this.eventService.refreshEvent();
      }
    });
  }
}
