import { Routes } from '@angular/router';
import { authGuard } from '../../core/guards/auth-guard';
import { roleGuard } from '../../core/guards/role-guard';


export const ADMIN_ROUTES: Routes = [

  {
    path: 'approve-event',
    canActivate: [authGuard, roleGuard],
    data: {
      roles: ['ADMIN']
    },
    loadComponent: () =>
      import('./approve-event/approve-event').then(m => m.ApproveEvent)
  }

];