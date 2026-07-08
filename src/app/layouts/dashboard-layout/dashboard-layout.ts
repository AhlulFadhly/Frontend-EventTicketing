import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';

import { DashboardHeader } from '../../shared/dashboard-header/dashboard-header';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    MatSidenavModule,
    DashboardHeader,
  ],
  templateUrl: './dashboard-layout.html',
  styleUrl: './dashboard-layout.scss'
})
export class DashboardLayout {

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  toggleSidebar(): void {
    this.sidenav.toggle();
  }

}