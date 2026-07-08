import { Role } from './role.constants';

export interface SidebarItem {
  label: string;
  icon: string;
  route: string;
}

export const SIDEBAR_MENU: Record<Role, SidebarItem[]> = {

  [Role.ORGANIZER]: [

    {
      label: 'Dashboard',
      icon: 'dashboard',
      route: '/organizer/dashboard'
    },

    {
      label: 'My Events',
      icon: 'event',
      route: '/organizer/events'
    },

    {
      label: 'Create Event',
      icon: 'add_circle',
      route: '/organizer/events/create'
    }

  ],

  [Role.ADMIN]: [

    {
      label: 'Dashboard',
      icon: 'dashboard',
      route: '/admin/dashboard'
    },

    {
      label: 'Waiting Approval',
      icon: 'approval',
      route: '/admin/waiting-approval'
    }

  ],

  [Role.USER]: [

    {
      label: 'Dashboard',
      icon: 'dashboard',
      route: '/user/dashboard'
    },

    {
      label: 'My Booking',
      icon: 'confirmation_number',
      route: '/user/my-bookings'
    },

    {
      label: 'Booking History',
      icon: 'history',
      route: '/user/booking-history'
    },

    {
      label: 'Profile',
      icon: 'person',
      route: '/user/profile'
    }

  ],

};