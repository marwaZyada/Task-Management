import { Routes } from '@angular/router';
import { guestGuard } from '../../core/guards/guest.guard';

export const AUTH_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    canActivate:[guestGuard],
    loadComponent: () =>
      import('./pages/login/login').then(
        (m) => m.Login
      ),
  },
  {
    path: 'register',
    canActivate:[guestGuard],
    loadComponent: () =>
      import('./pages/signup/signup').then(
        (m) => m.Signup
      ),
  },
];