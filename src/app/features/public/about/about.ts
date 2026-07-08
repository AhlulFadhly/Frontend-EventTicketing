import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-about',
  imports: [CommonModule, MatIconModule],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {

}
