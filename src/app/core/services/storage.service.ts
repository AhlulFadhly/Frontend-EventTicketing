import { Injectable } from '@angular/core';

import { APP } from '../constants/app.constants';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  setToken(token: string): void {
    localStorage.setItem(APP.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(APP.TOKEN_KEY);
  }

  removeToken(): void {
    localStorage.removeItem(APP.TOKEN_KEY);
  }

  setUser(user: unknown): void {
    localStorage.setItem(
      APP.USER_KEY,
      JSON.stringify(user)
    );
  }

  getUser<T>(): T | null {

    const data = localStorage.getItem(APP.USER_KEY);

    return data ? JSON.parse(data) : null;

  }

  removeUser(): void {
    localStorage.removeItem(APP.USER_KEY);
  }

  clear(): void {
    localStorage.clear();
  }

}