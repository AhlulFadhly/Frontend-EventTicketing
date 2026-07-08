import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TicketManagement } from "../ticket-management/ticket-management";
import { AttendeeManagement } from "../attendee-management/attendee-management";
import { StaffManagement } from "../staff-management/staff-management";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-event-hub',
  imports: [MatIconModule, TicketManagement, AttendeeManagement, StaffManagement, CommonModule],
  templateUrl: './event-hub.html',
  styleUrl: './event-hub.scss',
})
export class EventHub {
  @Input() event: any;

  @Output() onBack = new EventEmitter<void>();
  @Output() onPublish = new EventEmitter<any>();
  @Output() onCancel = new EventEmitter<any>();
  @Output() onAddTicket = new EventEmitter<void>();
  @Output() onEditTicket = new EventEmitter<any>();
  
  subTab: 'tickets' | 'attendees' | 'staffs' = 'tickets';
  
}
