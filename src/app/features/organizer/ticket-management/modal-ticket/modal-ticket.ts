import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Ticket } from '../../models/ticket.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-modal-ticket',
  imports: [MatIconModule, MatFormFieldModule, CommonModule, ReactiveFormsModule],
  templateUrl: './modal-ticket.html',
  styleUrl: './modal-ticket.scss',
})
export class ModalTicket {
  @Input() eventId!: number;

  @Input() isEdit = false;
  @Input() ticketData?: Ticket;

  @Output() onClose = new EventEmitter<void>();
  @Output() onSave = new EventEmitter<Ticket>();

  private fb = inject(FormBuilder);
  private eventService = inject(EventService);

  loading = false;

  form = this.fb.group({
    name: ['', Validators.required],
    price: [0, Validators.required],
    quota: [1, Validators.required],
    saleStart: ['', Validators.required],
  });

  ngOnInit() {
    if (this.isEdit && this.ticketData) {
      this.form.patchValue({
        name: this.ticketData.name,
        price: this.ticketData.price,
        quota: this.ticketData.quota,
        saleStart: this.ticketData.saleStart,
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
      eventId: this.eventId,
      name: f.name!,
      price: Number(f.price),
      quota: Number(f.quota),
      saleStart: f.saleStart!,
    };

    if (!this.isEdit) {
      // CREATE
      this.eventService.createTicket(body).subscribe({
        next: () => {
          this.loading = false;

          this.eventService.refreshTickets();
          this.onClose.emit();
        },
        error: () => {
          this.loading = false;
        },
      });
    } else {
      // EDIT
      this.eventService.updateTicket(this.ticketData!.id, body).subscribe({
        next: () => {
          this.loading = false;

          this.eventService.refreshTickets();
          this.onClose.emit();
        },
        error: () => {
          this.loading = false;
        },
      });
    }
  }
}
