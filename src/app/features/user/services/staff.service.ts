import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../../environments/environment';
import { ApiResponse } from '../../../core/models/api-response.model';
import { StaffEvent } from '../models/staff-event.model';

@Injectable({
  providedIn: 'root',
})
export class StaffService {

  private http = inject(HttpClient);

  private api = environment.apiUrl;

  getMyEvents() {

  return this.http.get<ApiResponse<StaffEvent[]>>(
    `${this.api}/staffs/my-events`
  );

}

  checkIn(ticketCode: string) {

    return this.http.post<ApiResponse<any>>(
      `${this.api}/check-ins`,
      {
        ticketCode
      }
    );

  }

}