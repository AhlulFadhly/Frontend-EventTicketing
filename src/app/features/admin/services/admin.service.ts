import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../../environments/environment';
import { ApiResponse } from '../../../core/models/api-response.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private http = inject(HttpClient);

  private api = environment.apiUrl;

  getEventApprovals() {

    return this.http.get<ApiResponse<any[]>>(
      `${this.api}/admin/event-approvals`
    );

  }

  approveEvent(id:number){

    return this.http.patch<ApiResponse<any>>(
      `${this.api}/admin/event-approvals/${id}/approve`,
      {}
    );

  }

}