import { Routes } from '@angular/router';
import { Mainlayout } from './mainlayout';
import { authGuard } from '../../core/guards/auth.guard';




export const MAIN_LAYOUT_ROUTES: Routes = [
  {
    path: '',
    component: Mainlayout,
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('../../features/dashboard/dashboard').then(
            (m) => m.Dashboard
          ),
      },

    {
        path: 'project',
        loadComponent: () =>
          import('../../features/project/project').then(
            (m) => m.Project
          ),
      },
    ],
  },
];