import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../../features/auth/services/auth.service';


export const errorInterceptor: HttpInterceptorFn = (req, next) => {

  const snackBar = inject(MatSnackBar);
  const router = inject(Router);
  const authService = inject(AuthService);

  return next(req).pipe(

    catchError((error: HttpErrorResponse) => {

      switch (error.status) {

        case 401:

          authService.logout();

          snackBar.open(
            'Session expired. Please login again.',
            'Close',
            {
              duration: 3000
            }
          );

          router.navigate(['/login']);

          break;

        case 403:

          snackBar.open(
            'Access denied.',
            'Close',
            {
              duration: 3000
            }
          );

          router.navigate(['/']);

          break;

        case 404:

          snackBar.open(
            'Data not found.',
            'Close',
            {
              duration: 3000
            }
          );

          break;

        case 500:

          snackBar.open(
            'Internal server error.',
            'Close',
            {
              duration: 3000
            }
          );

          break;

        default:

          snackBar.open(
            error.error?.message ?? 'Something went wrong.',
            'Close',
            {
              duration: 3000
            }
          );

      }

      return throwError(() => error);

    })

  );

};