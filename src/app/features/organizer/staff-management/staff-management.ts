import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { EventService } from '../services/event.service';
import { Staff } from '../models/staff.model';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-staff-management',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
  ],
  templateUrl: './staff-management.html',
  styleUrl: './staff-management.scss',
})
export class StaffManagement implements OnInit {
  @Input() eventId!: number;
  @Output() onAssign = new EventEmitter<string>();
  private eventService = inject(EventService);
  staffs: Staff[] = [];
  email = '';
  loading = false;

  ngOnInit() {
    this.load();
  }

  load() {
    this.eventService.getStaffs(this.eventId).subscribe((res) => {
      this.staffs = res.data;
    });
  }

  submit() {
    if (!this.email.trim()) {
      return;
    }
    console.log(this.email);

    this.loading = true;

    this.eventService.addStaff(this.eventId, this.email).subscribe({
      next: () => {
        this.load();
      },

      error: () => {
        this.loading = false;
      },
    });
  }
}
