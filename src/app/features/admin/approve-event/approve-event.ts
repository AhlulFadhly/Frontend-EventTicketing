import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-approve-event',
  imports: [CommonModule, RouterLink, MatCardModule, MatButtonModule],
  templateUrl: './approve-event.html',
  styleUrl: './approve-event.scss',
})
export class ApproveEvent {
  private adminService = inject(AdminService);

  events: any[] = [];

  ngOnInit() {
    this.load();
  }

  load() {
    this.adminService.getEventApprovals().subscribe((res) => {
      this.events = res.data;
    });
  }

  approve(event: any) {
    if (!confirm(`Approve "${event.title}" ?`)) {
      return;
    }

    this.adminService.approveEvent(event.id).subscribe(() => {
      this.load();
    });
  }
}
