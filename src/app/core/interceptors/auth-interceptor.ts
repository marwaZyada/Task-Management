import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { Auth } from '../services/auth';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const authService =
      inject(Auth);
    const publicUrls = [
    '/auth/v1/signup',
    '/auth/v1/token',
    
  ];

  const isPublicUrl = publicUrls.some(url =>
    req.url.includes(url)
  );

  // Add API Key to every request
  let modifiedReq = req.clone({
    setHeaders: {
      'apikey':'sb_publishable_5n8kh9s1vVaJ7HqiWWSMPg_tLyAlfi2' ,
    },
  });

  // Public endpoints don't need Access Token
  if (isPublicUrl) {
    return next(modifiedReq);
  }

  // Protected endpoints get Access Token
  const token = authService.getAccessToken();


  if (token ) {
    modifiedReq = modifiedReq.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return next(modifiedReq).pipe(

      catchError(
        (error: HttpErrorResponse) => {

          // Access token expired
          if (error.status !== 401) {
            return throwError(
              () => error
            );
          }

          // No Remember Me
          if (
            !authService.isRememberMeActive()
          ) {
            authService.logout();

            return throwError(
              () => error
            );
          }

          const refreshToken =
            authService.getRefreshToken();

          if (!refreshToken) {

            authService.logout();

            return throwError(
              () => error
            );
          }

          return authService
            .refreshSession()
            .pipe(

              switchMap((response) => {

                const newRequest =
                  req.clone({
                    setHeaders: {
                       'apikey':'sb_publishable_5n8kh9s1vVaJ7HqiWWSMPg_tLyAlfi2',
                      Authorization:
                        `Bearer ${response.access_token}`,
                    },
                  });

                return next(newRequest);
              }),

              catchError((refreshError) => {

                authService.logout();

                return throwError(
                  () => refreshError
                );
              })
            );
        }
      )
    );
};
