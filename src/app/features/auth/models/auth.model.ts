export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  id: number;
  fullName: string;
  email: string;
  token: string;
}

export interface RegisterUserRequest {
  fullName: string;
  email: string;
  phone: string;
  password: string;
}

export interface RegisterOrganizerRequest {
  fullName: string;
  email: string;
  phone: string;
  password: string;
}