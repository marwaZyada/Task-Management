import { Routes } from '@angular/router';






export const PROJECT_ROUTES: Routes = [
  {
      
        path: '',
          loadComponent: () =>
      import('./pages/project-list/project').then(
        (m) => m.Project
      ),
      },
   {
        path: 'addproject',
          loadComponent: () =>
      import('./pages/add-project/add-project').then(
        (m) => m.AddProject
      ),
      },
      

    
    ]
 
