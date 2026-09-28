import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
     {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth.routes').then(
        (m) => m.AUTH_ROUTES
      ),
  },
    {
    path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/dashboard/dashboard').then(
        (m) => m.Dashboard
      ),
  },

  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full',
  },

//   {
//     path: '**',
//     redirectTo: 'auth/login',
//   },
];
