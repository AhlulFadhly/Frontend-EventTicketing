import { Routes } from '@angular/router';
import { authGuard } from '../../core/guards/auth-guard';
import { roleGuard } from '../../core/guards/role-guard';
import { ProfileComponent } from './profile/profile';
import { BookingCheckout } from './booking-checkout/booking-checkout';

export const USER_ROUTES: Routes = [
  {
    path: 'my-booking',
    canActivate: [authGuard, roleGuard],
    data: {
      roles: ['USER'],
    },
    loadComponent: () =>
      import('./my-booking/my-booking').then(
        (m) => m.MyBooking
      ),
  },

  {
    path: 'profile',
    canActivate: [authGuard],
    component: ProfileComponent,
  },
  {
    path: 'checkout',
    canActivate: [authGuard],
    component: BookingCheckout,
  },

  {
    path: 'staff-events',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./staff-events/staff-events').then(
        (m) => m.StaffEvents
      ),
  },

  {
    path: 'check-in/:eventId',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./check-in/check-in').then(
        (m) => m.CheckIn
      ),
  },
];