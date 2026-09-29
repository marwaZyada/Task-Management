import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';

import { Load } from '../services/load';
import { SKIP_LOADING } from '../tokens/loading-context';





export const loadingInterceptor: HttpInterceptorFn = (req, next) => {

  const loadingService = inject(Load);

  // Don't show loading for this request
  if (req.context.get(SKIP_LOADING)) {
    return next(req);
  }

  loadingService.show();

  return next(req).pipe(
    finalize(() => {
      loadingService.hide();
    })
  );
};

