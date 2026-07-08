import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { AuthService } from '../../auth/services/auth.service';
import { Profile } from '../../auth/models/profile.model';

@Component({
  selector:'app-profile',
  standalone:true,
  imports:[
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl:'./profile.html',
  styleUrl:'./profile.scss'
})
export class ProfileComponent implements OnInit{

  private authService=inject(AuthService);

  profile?:Profile;

  ngOnInit(){

    this.authService
      .getProfile()
      .subscribe(res=>{

        this.profile=res.data;

      });

  }

}