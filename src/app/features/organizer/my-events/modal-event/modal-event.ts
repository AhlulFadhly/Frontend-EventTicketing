import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Category } from '../../models/category.model';
import { Venue } from '../../models/venue.model';
import { EventService } from '../../services/event.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal-event',
  imports: [MatIconModule, ReactiveFormsModule],
  templateUrl: './modal-event.html',
  styleUrl: './modal-event.scss',
})
export class ModalEvent {
  private eventService = inject(EventService);
  private fb = inject(FormBuilder);

  categories: Category[] = [];
  venues: Venue[] = [];

  loading = false;
  @Input() isEdit: boolean = false;
  @Input() eventData: any = null;
  @Output() onClose = new EventEmitter<void>();
  @Output() onSubmit = new EventEmitter<any>();

  form = this.fb.group({
    banner: ['', Validators.required],
    title: ['', Validators.required],
    categoryId: ['', Validators.required],
    venueId: ['', Validators.required],
    description: ['', Validators.required],
    time: ['', Validators.required],
  });

  ngOnInit(): void {
    this.eventService.getCategories().subscribe({
      next: (res) => {
        this.categories = res.data;
      },
      error: (err) => {
        console.error('Failed load categories', err);
      },
    });

    this.eventService.getVenues().subscribe({
      next: (res) => {
        this.venues = res.data;
      },
      error: (err) => {
        console.error('Failed load venues', err);
      },
    });

    if (this.isEdit && this.eventData) {
      console.log(this.eventData);
      this.form.patchValue({
        banner:this.eventData.banner,
        title: this.eventData.title,
        categoryId: this.eventData.categoryId,
        venueId: this.eventData.venueId,
        description: this.eventData.description,
        time: this.eventData.time,
      });
    }
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    const f = this.form.getRawValue();
    const body = {
      banner: f.banner,
      title: f.title,
      categoryId: Number(f.categoryId),
      venueId: Number(f.venueId),
      description: f.description,
      time: f.time,
    };

    if (!this.isEdit) {
      // CREATE
      this.eventService.createEvent(body).subscribe({
        next: () => {
          this.loading = false;

          this.eventService.refreshEvent();
          this.onClose.emit();
        },
        error: () => {
          this.loading = false;
        },
      });
    }
    else {
      // EDIT
      this.eventService.updateEvent(this.eventData!.id, body).subscribe({
        next: () => {
          this.loading = false;

          this.eventService.refreshEvent();
          this.onClose.emit();
        },
        error: () => {
          this.loading = false;
        },
      });
    }
  }
}
