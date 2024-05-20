import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { StateService } from '../state/state.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const state = inject(StateService);
  const token = state.getToken();

  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });
  return next(authReq);
};
