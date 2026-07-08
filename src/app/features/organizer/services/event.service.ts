import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

import { environment } from '../../../../environments/environment';

import { ApiResponse } from '../../../core/models/api-response.model';
import { Event } from '../models/event.model';
import { Page } from '../../public/models/page.model';
import { Category } from '../models/category.model';
import { API } from '../../../core/constants/api.constants';
import { Venue } from '../models/venue.model';
import { Attendee } from '../models/attendee.model';
import { Staff } from '../models/staff.model';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private http = inject(HttpClient);

  private api = environment.apiUrl;

  getEvents(page = 0, size = 10, keyword = '', category = '', status = '') {
    let params = new HttpParams().set('page', page).set('size', size);

    if (keyword) params = params.set('keyword', keyword);
    if (category) params = params.set('category', category);
    if (status) params = params.set('status', status);

    return this.http.get<ApiResponse<Page<Event>>>(`${this.api}${API.EVENTS}`, { params });
  }

  getCategories() {
    return this.http.get<ApiResponse<Category[]>>(`${this.api}${API.EVENTS}/categories`);
  }

  getVenues() {
    return this.http.get<ApiResponse<Venue[]>>(`${this.api}${API.EVENTS}/venues`);
  }

  getEvent(id: number) {
    return this.http.get<ApiResponse<Event>>(`${this.api}${API.EVENTS}/${id}`);
  }

  getMyEvents() {
    return this.http.get<ApiResponse<Event[]>>(`${this.api}${API.EVENTS}/my`);
  }

  createEvent(payload: any) {
    return this.http.post(`${this.api}/events`, payload);
  }

  updateEvent(id: number, body: any) {
    return this.http.patch(
      `${this.api}/events/${id}`,

      body,
    );
  }

  private refreshEventSource = new Subject<void>();
  refreshEvent$ = this.refreshEventSource.asObservable();
  refreshEvent() {
    this.refreshEventSource.next();
  }

  publishEvent(id: number) {
    return this.http.patch(
      `${this.api}/events/${id}/publish`,
      {},
    );
  }

  cancelEvent(id: number) {
    return this.http.patch(
      `${this.api}/events/${id}/cancel`,

      {},
    );
  }

  getTickets(eventId: number) {
    return this.http.get<ApiResponse<any[]>>(`${this.api}/events/${eventId}/tickets`);
  }

  createTicket(body: any) {
    return this.http.post<ApiResponse<any>>(`${this.api}/tickets`, body);
  }

  updateTicket(id: number, body: any) {
    return this.http.patch<ApiResponse<any>>(`${this.api}/tickets/${id}`, body);
  }

  private refreshTicketsSource = new Subject<void>();
  refreshTickets$ = this.refreshTicketsSource.asObservable();
  refreshTickets() {
    this.refreshTicketsSource.next();
  }

  disableTicket(id: number) {
    return this.http.patch<ApiResponse<any>>(`${this.api}/tickets/${id}/disable`, {});
  }

  getAttendees(Id: number) {
    return this.http.get<ApiResponse<Attendee[]>>(`${this.api}/events/${Id}/attendees`);
  }

  getStaffs(eventId: number) {
    return this.http.get<ApiResponse<Staff[]>>(`${this.api}/events/${eventId}/staffs`);
  }

  addStaff(eventId: number, email: string) {
    return this.http.post<ApiResponse<any>>(`${this.api}/events/${eventId}/staffs`, {
      email,
    });
  }
}
