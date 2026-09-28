import { Routes } from '@angular/router';


export const routes: Routes = [
     {
    path: 'auth',
    loadChildren: () =>
      import('./layout/authlayout/authlayout.routes').then(
        (m) => m.AUTH_LAYOUT_ROUTES
      ),
  },
  {
    path: '',
    loadChildren: () =>
      import('./layout/mainlayout/mainlayout.routes').then(
        (m) => m.MAIN_LAYOUT_ROUTES
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
