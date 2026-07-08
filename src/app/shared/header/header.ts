import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../features/auth/services/auth.service';
import { Profile } from '../../features/auth/models/profile.model';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {

  private authService = inject(AuthService);

  private router = inject(Router);

  menuOpen = false;

  get user(): Profile | null {
    return this.authService.getCurrentUser();
  }

  openDashboard(): void {

    if (!this.user) return;

    switch (this.user.roles) {

      case 'ADMIN':
        this.router.navigate(['/admin/approve-event']);
        break;

      case 'ORGANIZER':
        this.router.navigate(['/organizer/dashboard']);
        break;

      case 'USER':
        this.router.navigate(['/user/my-booking']);
        break;

    }

  }

  logout(): void {

    this.authService.logout();

    this.router.navigate(['/']);

  }

}