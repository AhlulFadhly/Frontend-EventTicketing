import { Component, inject } from '@angular/core';
import { Page } from '../models/page.model';
import { EventService } from '../../organizer/services/event.service';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Event } from '../../organizer/models/event.model';

@Component({
  selector: 'app-home',
  imports: [
    MatIconModule,
    CommonModule,
    MatButtonModule,
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  private eventService = inject(EventService);

  page?: Page<Event>;

  pageIndex = 0;
  pageSize = 10;
  keyword = '';
  category = '';
  status = '';

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.eventService
      .getEvents(this.pageIndex, this.pageSize, this.keyword, this.category, this.status)
      .subscribe({
        next: (res) => {
          console.log('SUCCESS API:', res);

          this.page = res.data;
        },

        error: (err) => {
          console.log('ERROR API:', err);
        },
      });
  }
}
