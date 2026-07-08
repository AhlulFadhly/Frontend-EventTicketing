import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { StorageService } from '../../../core/services/storage.service';
import { LoginRequest, LoginResponse, RegisterOrganizerRequest, RegisterUserRequest } from '../models/auth.model';
import { ApiResponse } from '../../../core/models/api-response.model';
import { API } from '../../../core/constants/api.constants';
import { environment } from '../../../../environments/environment';
import { Profile } from '../models/profile.model';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);

  private readonly storage = inject(StorageService);

  private readonly baseUrl = environment.apiUrl;

  login(request: LoginRequest): Observable<ApiResponse<LoginResponse>> {
    return this.http
      .post<ApiResponse<LoginResponse>>(`${this.baseUrl}${API.AUTH}/login`, request)
      .pipe(
        tap((response) => {
          this.storage.setToken(response.data.token);
        }),
      );
  }

  registerUser(request: RegisterUserRequest): Observable<ApiResponse<void>> {
    return this.http.post<ApiResponse<void>>(`${this.baseUrl}${API.AUTH}/register`, request);
  }

  registerOrganizer(request: RegisterOrganizerRequest): Observable<ApiResponse<void>> {
    return this.http.post<ApiResponse<void>>(
      `${this.baseUrl}${API.AUTH}/register-organizer`,
      request,
    );
  }

  getProfile(): Observable<ApiResponse<Profile>> {
    return this.http.get<ApiResponse<Profile>>(`${this.baseUrl}${API.AUTH}/profile`);
  }

  saveUser(user: Profile): void {
    this.storage.setUser(user);
  }

  logout(): void {
    this.storage.clear();
  }

  isLoggedIn(): boolean {
    return !!this.storage.getToken();
  }

  getCurrentUser(): Profile | null {
    return this.storage.getUser<Profile>();
  }

  getToken(): string | null {
    return this.storage.getToken();
  }
}
