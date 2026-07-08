import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import {
  ActivatedRoute,
  Router,
  RouterLink
} from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register-user',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatIconModule,
  ],
  templateUrl: './register-user.html',
  styleUrl: './register-user.scss'
})
export class RegisterUser implements OnInit {

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private snackBar = inject(MatSnackBar);

  hidePassword = true;
  hideConfirmPassword = true;

  loading = false;

  // true jika membuka /register-organizer
  isOrganizer = false;

  registerForm = this.fb.nonNullable.group({
    fullName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  ngOnInit(): void {
    this.isOrganizer =
      this.route.snapshot.routeConfig?.path === 'register-organizer';
  }

  register(): void {

    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.loading = true;

    const request = this.registerForm.getRawValue();

    const registerRequest = this.isOrganizer
      ? this.authService.registerOrganizer(request)
      : this.authService.registerUser(request);

    registerRequest.subscribe({

      next: (response) => {

        this.loading = false;

        this.snackBar.open(
          response.message ??
            (this.isOrganizer
              ? 'Organizer berhasil didaftarkan'
              : 'Register berhasil'),
          'Tutup',
          {
            duration: 3000
          }
        );

        this.router.navigate(['/login']);

      },

      error: (err) => {

        this.loading = false;

        this.snackBar.open(
          err.error?.message ??
            (this.isOrganizer
              ? 'Register organizer gagal'
              : 'Register gagal'),
          'Tutup',
          {
            duration: 3000
          }
        );

      }

    });

  }

}