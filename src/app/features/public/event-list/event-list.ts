import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs';

import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';

import { EventService } from '../../organizer/services/event.service';
import { Event } from '../../organizer/models/event.model';
import { Page } from '../models/page.model';

import { SearchBar } from '../../../shared/search-bar/search-bar';
import { StatusChip } from '../../../shared/status-chip/status-chip';
import { FilterBar } from '../../../shared/filter-bar/filter-bar';
import { Category } from '../../organizer/models/category.model';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatButtonModule,
    SearchBar,
    StatusChip,
    FilterBar,
    RouterLink,
    MatIconModule
  ],
  templateUrl: './event-list.html',
  styleUrl: './event-list.scss',
})
export class EventList implements OnInit {
  private eventService = inject(EventService);

  page?: Page<Event>;

  pageIndex = 0;
  pageSize = 10;

  keyword = '';

  category = '';

  categories: Category[] = [];

  status = '';

  searchControl = new FormControl('');

  ngOnInit(): void {
    this.loadEvents();
    this.eventService.getCategories().subscribe((res) => {
      this.categories = res.data;
    });

    this.searchControl.valueChanges.pipe(debounceTime(400)).subscribe((value) => {
      this.keyword = value ?? '';

      this.pageIndex = 0;

      this.loadEvents();
    });
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

  changePage(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;

    this.loadEvents();
  }

  onCategoryChange(category: string): void {
    console.log('CATEGORY:', category);

    this.category = category;
    this.pageIndex = 0;

    this.loadEvents();
  }

  onStatusChange(status: string): void {
    console.log('STATUS:', status);

    this.status = status;
    this.pageIndex = 0;

    this.loadEvents();
  }

  resetFilter(): void {
    this.category = '';
    this.status = '';
    this.keyword = '';
    this.searchControl.setValue('', { emitEvent: false });
    this.pageIndex = 0;
    this.loadEvents();
  }
}
