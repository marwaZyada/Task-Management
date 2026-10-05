import { ApplicationConfig, inject, provideAppInitializer, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/interceptors/auth-interceptor';
import { provideToastr } from 'ngx-toastr';
import { loadingInterceptor } from './core/interceptors/loading-interceptor';
import { errorInterceptor } from './core/interceptors/error.interceptor';
import { AppConfig } from './core/config/app-config';

export const appConfig: ApplicationConfig = {
  providers: [provideBrowserGlobalErrorListeners(), provideRouter(routes),
    provideHttpClient(
      withInterceptors([
         errorInterceptor,
        authInterceptor,
        loadingInterceptor
       
      ]) ),
       provideAppInitializer(() => {
      const configService = inject(AppConfig);

      return configService.load();
    }),
   
  
  provideToastr({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    ],
};
