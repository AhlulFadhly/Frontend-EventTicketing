import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../../core/models/api-response.model';
import { API } from '../../../core/constants/api.constants';
import { environment } from '../../../../environments/environment';
import { DashboardSummary } from '../models/dashboard.model';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private http = inject(HttpClient);

  private api = environment.apiUrl;

  getOrganizerDashboard() {

  return this.http.get<ApiResponse<DashboardSummary>>(
    `${this.api}${API.DASHBOARD}/organizer`
  );

}

}