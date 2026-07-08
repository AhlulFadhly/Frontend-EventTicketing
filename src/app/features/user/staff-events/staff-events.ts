import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { StaffService } from '../services/staff.service';
import { StaffEvent } from '../models/staff-event.model';

@Component({
  selector: 'app-staff-events',
   standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
  ],
  templateUrl: './staff-events.html',
  styleUrl: './staff-events.scss',
})
export class StaffEvents implements OnInit {

  private staffService = inject(StaffService);

  events: StaffEvent[] = [];

  loading = true;

  ngOnInit(): void {

    this.staffService.getMyEvents().subscribe({

      next: (res) => {

        this.events = res.data;

        this.loading = false;

      },

      error: () => {

        this.loading = false;

      }

    });

  }

}
