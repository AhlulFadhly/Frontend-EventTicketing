import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { EventService } from '../services/event.service';
import { Event } from '../models/event.model';
import { StatusChip } from '../../../shared/status-chip/status-chip';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-my-events',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    StatusChip,
    MatMenuModule
  ],
  templateUrl: './my-events.html',
  styleUrl: './my-events.scss'
})
export class MyEvents implements OnInit {
// Menerima data daftar event dari parent dashboard
  @Input() events: any[] = [];

  // Event Emitter untuk mengirim aksi ke parent dashboard
  @Output() onCreateEvent = new EventEmitter<void>();
  @Output() onEditEvent = new EventEmitter<any>();
  @Output() onSelectEvent = new EventEmitter<any>();


  private eventService = inject(EventService);

  filteredEvents: Event[] = [];

  searchControl = new FormControl('');

  panelOpen = false;

  mode: 'create' | 'edit' = 'create';

  selectedEvent: any = null;

  loading = false;

  showEventModal = false;
  isEditEvent = false;

  ngOnInit(): void {

    this.loadEvents();

    this.eventService.refreshEvent$.subscribe(() => {
        this.loadEvents();
    });
  }

  loadEvents() {

    this.eventService.getMyEvents().subscribe({
      next: (res) => {
        this.events = res.data;
        this.filteredEvents = res.data;
      }
    });

  }
  
  openEventModal(type: 'create' | 'edit', eventData?: any) {
    this.isEditEvent = type === 'edit';
    this.showEventModal = true;
    if (this.isEditEvent && eventData) {
    }
  }

  cancelEvent(event: Event) {

    if (!confirm(`Cancel "${event.title}" ?`)) {

      return;

    }

    this.eventService.cancelEvent(event.id).subscribe({

      next: () => {

        this.loadEvents();

      }

    });

  }
}
