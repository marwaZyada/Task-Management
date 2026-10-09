import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';
import { Auth } from '../services/auth';
import { Router } from '@angular/router';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastr = inject(ToastrService);
  const authservice = inject(Auth);
  const router=inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const message =
        error.error?.msg ??
        error.error?.message ??
        error.message ??
        'Something went wrong. Please try again.';

      toastr.error(message, 'Error');
      console.log('error', error.error.code);
      if (error.error.status == 403 ||error.error.status == 401) {
        authservice.signout();
        router.navigate(['/login']);
        authservice.clearStorage();
      }

      return throwError(() => error);
    }),
  );
};
