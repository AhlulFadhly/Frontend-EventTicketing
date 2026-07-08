import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

import { Category } from '../../features/organizer/models/category.model';

@Component({
  selector: 'app-filter-bar',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatSelectModule, MatButtonModule],
  templateUrl: './filter-bar.html',
  styleUrl: './filter-bar.scss',
})
export class FilterBar {
  @Input() categories: Category[] = [];

  @Input() category = '';

  @Output() categoryChange = new EventEmitter<string>();

  @Output() reset = new EventEmitter<void>();
}
