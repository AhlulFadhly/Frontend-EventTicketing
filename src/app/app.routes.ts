import { Routes } from '@angular/router';

import { PublicLayout } from './layouts/public-layout/public-layout';
import { AuthLayout } from './layouts/auth-layout/auth-layout';
import { DashboardLayout } from './layouts/dashboard-layout/dashboard-layout';
import { authGuard } from './core/guards/auth-guard';
import { roleGuard } from './core/guards/role-guard';

export const routes: Routes = [
  // PUBLIC
  {
    path: '',
    component: PublicLayout,
    children: [
      {
        path: '',
        loadChildren: () => import('./features/public/public.routes').then((m) => m.PUBLIC_ROUTES),
      },
    ],
  },

  // AUTH
  {
    path: '',
    component: AuthLayout,
    children: [
      {
        path: 'login',
        loadComponent: () => import('./features/auth/login/login').then((m) => m.Login),
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./features/auth/register-user/register-user').then((m) => m.RegisterUser),
      },
      {
        path: 'register-organizer',
        loadComponent: () =>
          import('./features/auth/register-user/register-user').then((m) => m.RegisterUser),
      },
    ],
  },

  // ADMIN
  {
    path: 'admin',
    component: DashboardLayout,
    canActivate: [authGuard, roleGuard],
    data: {
      roles: ['ADMIN'],
    },
    children: [
      {
        path: '',
        loadChildren: () => import('./features/admin/admin.routes').then((m) => m.ADMIN_ROUTES),
      },
    ],
  },

  // ORGANIZER
  {
    path: 'organizer',
    component: DashboardLayout,
    canActivate: [authGuard, roleGuard],
    data: {
      roles: ['ORGANIZER'],
    },
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./features/organizer/organizer.routes').then((m) => m.ORGANIZER_ROUTES),
      },
    ],
  },

  // USER
  {
    path: 'user',
    component: DashboardLayout,
    canActivate: [authGuard, roleGuard],
    data: {
      roles: ['USER'],
    },
    children: [
      {
        path: '',
        loadChildren: () => import('./features/user/user.routes').then((m) => m.USER_ROUTES),
      },
    ],
  },

  {
    path: '**',
    redirectTo: '',
  },
];
