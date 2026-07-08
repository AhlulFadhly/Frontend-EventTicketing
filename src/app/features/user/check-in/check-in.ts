import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { StaffService } from '../services/staff.service';

@Component({
  selector: 'app-check-in',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
  ],
  templateUrl: './check-in.html',
  styleUrl: './check-in.scss',
})
export class CheckIn {

  private staffService = inject(StaffService);

  private route = inject(ActivatedRoute);

  eventId = Number(this.route.snapshot.paramMap.get('eventId'));

  ticketCode = '';

  loading = false;

  success = '';

  error = '';

  submit() {

    if (!this.ticketCode.trim()) {
      return;
    }

    this.loading = true;

    this.success = '';

    this.error = '';

    this.staffService.checkIn(this.ticketCode).subscribe({

      next: (res) => {

        this.loading = false;

        this.success = res.message || 'Check In Success';

        this.ticketCode = '';

      },

      error: (err) => {

        this.loading = false;

        this.error = err.error?.message || 'Check In Failed';

      },

    });

  }

}