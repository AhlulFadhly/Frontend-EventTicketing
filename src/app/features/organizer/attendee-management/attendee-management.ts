import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../services/event.service';
import { Attendee } from '../models/attendee.model';

@Component({
  selector: 'app-attendee-management',
  standalone: true,

  imports: [CommonModule, MatTableModule],
  templateUrl: './attendee-management.html',
  styleUrl: './attendee-management.scss',
})
export class AttendeeManagement implements OnInit {

  @Input() eventId!: number;

  private eventService = inject(EventService);

  attendees: Attendee[] = [];

  ngOnInit() {

    console.log(this.eventId);
    
    this.eventService.getAttendees(this.eventId).subscribe({
      next: (res) => {
        this.attendees = res.data;
      },
    });
  }
}
