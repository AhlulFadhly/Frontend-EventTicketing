import { Routes } from '@angular/router';

export const AUTH_ROUTES: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login').then(m => m.Login)
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./register-user/register-user').then(m => m.RegisterUser)
  },
  {
    path: 'register-organizer',
    loadComponent: () =>
      import('./register-organizer/register-organizer').then(m => m.RegisterOrganizer)
  }
];