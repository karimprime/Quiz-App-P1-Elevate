// heading.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { PlatFormService } from '../../../shared/services/platform/platform.service';

export const headingInterceptor: HttpInterceptorFn = (req, next) => {
  const _platformService = inject(PlatFormService);

  if (_platformService.checkPlatform() === 'Browser') {
    const token = localStorage.getItem('userToken');
    if (token) {
      req = req.clone({
        setHeaders: { token },
      });
    }
  }
  return next(req);
};
