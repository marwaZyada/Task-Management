import { Routes } from '@angular/router';

export const PROJECT_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/project-list/project').then((m) => m.Project),
  },
  {
    path: 'add',
    loadComponent: () => import('./pages/add-project/add-project').then((m) => m.AddProject),
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./pages/add-project/add-project').then((m) => m.AddProject),
  },
  {
    path: ':id/epics',
    loadComponent: () => import('./pages/epics/epics').then((m) => m.Epics),
  },
  {
    path: ':id/members',
    loadComponent: () => import('./pages/members/members').then((m) => m.Members),
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./pages/details/details').then((m) => m.Details),
  },
  {
    path: ':id/tasks',
    loadComponent: () => import('./pages/tasks/tasks').then((m) => m.Tasks),
  },
  {
    path: 'problem',
    loadComponent: () => import('../../shared/components/api-problem/api-problem').then((m) => m.ApiProblem),
  }
];
