import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../services/auth.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatIconModule,
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login implements OnInit {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);
  private route = inject(ActivatedRoute);

  hidePassword = true;

  loading = false;

  loginForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      return;
    }

    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');

    if (returnUrl) {
      this.router.navigateByUrl(returnUrl);
      return;
    }

    const user = this.authService.getCurrentUser();

    if (!user) {
      return;
    }

    switch (user.roles) {
      case 'ADMIN':
        this.router.navigate(['/admin/dashboard']);
        break;

      case 'ORGANIZER':
        this.router.navigate(['/organizer/dashboard']);
        break;

      case 'USER':
        this.router.navigate(['/user/profile']);
        break;
    }
  }

  login(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.loading = true;

    this.authService
      .login(this.loginForm.getRawValue())
      .pipe(switchMap(() => this.authService.getProfile()))
      .subscribe({
        next: (response) => {
          this.authService.saveUser(response.data);
          this.loading = false;

          const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
          console.log(returnUrl);

          if (returnUrl) {
            this.router.navigateByUrl(returnUrl);
            return;
          }else{
            this.router.navigate(['/']);
          }
        },

        error: () => {
          this.loading = false;
        },
      });
  }
}
