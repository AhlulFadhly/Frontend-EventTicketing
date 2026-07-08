import { Routes } from '@angular/router';

import { authGuard } from '../../core/guards/auth-guard';
import { roleGuard } from '../../core/guards/role-guard';

export const ORGANIZER_ROUTES: Routes = [
  {
    path: '',
    canActivate: [authGuard, roleGuard],
    data: {
      roles: ['ORGANIZER'],
    },
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./dashboard/dashboard').then((m) => m.Dashboard),
      },

      {
        path: 'events',
        loadComponent: () => import('./my-events/my-events').then((m) => m.MyEvents),
      },

      {
        path: 'ticket-management/:eventId',
        canActivate: [authGuard, roleGuard],
        data: {
          roles: ['ORGANIZER'],
        },
        loadComponent: () =>
          import('./ticket-management/ticket-management').then((m) => m.TicketManagement),
      },

      {
        path: 'attendee-management/:eventId',
        canActivate: [authGuard, roleGuard],
        data: {
          roles: ['ORGANIZER'],
        },
        loadComponent: () =>
          import('./attendee-management/attendee-management').then((m) => m.AttendeeManagement),
      },

      {
        path: 'staff-management/:eventId',
        canActivate: [authGuard, roleGuard],
        data: {
          roles: ['ORGANIZER'],
        },
        loadComponent: () =>
          import('./staff-management/staff-management').then((m) => m.StaffManagement),
      },
    ],
  },
];
