import { Routes } from '@angular/router';
import { Authlayout } from './authlayout';

export const AUTH_LAYOUT_ROUTES: Routes = [
  {
    path: '',
    component: Authlayout,
    children: [
      {
        path: 'login',
        loadComponent: () => import('../../features/auth/pages/login/login').then((m) => m.Login),
      },
      {
        path: 'sign-up',
        loadComponent: () =>
          import('../../features/auth/pages/signup/signup').then((m) => m.Signup),
      },{
        path: 'forgot-password',
        loadComponent: () =>
          import('../../features/auth/pages/forget-password/forget-password').then((m) => m.ForgetPassword),
      },
      {
        path: 'reset-password',
        loadComponent: () =>
          import('../../features/auth/pages/update-password/update-password').then((m) => m.UpdatePassword),
      },

      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
    ],
  },
];
