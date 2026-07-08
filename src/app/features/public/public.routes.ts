import { Routes } from '@angular/router';
import { EventList } from './event-list/event-list';
import { Home } from './home/home';
import { About } from './about/about';

export const PUBLIC_ROUTES: Routes = [
  {
    path: '',
    component: Home,
  },

  {
    path: 'events',
    component: EventList,
  },

  {
    path: 'events/:id',
    loadComponent: () => import('./event-detail/event-detail').then((m) => m.EventDetail),
  },

  {
    path: 'about',
    component: About,
  },

  
];
