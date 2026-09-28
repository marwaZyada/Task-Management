import { Routes } from '@angular/router';
import { Authlayout } from './authlayout';


export const AUTH_LAYOUT_ROUTES: Routes = [
  {
    path: '',
    component: Authlayout,
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('../../features/auth/pages/login/login').then(
            (m) => m.Login
          ),
      },
      {
        path: 'register',
        loadComponent: () =>
          import('../../features/auth/pages/signup/signup').then(
            (m) => m.Signup
          ),
      },
    ],
  },
];