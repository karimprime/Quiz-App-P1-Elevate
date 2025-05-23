import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

export const loggedGuard: CanActivateFn = (route, state): boolean | UrlTree => {
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  if (!isPlatformBrowser(platformId)) {
    return true;
  }

  if (localStorage.getItem('userToken')) {
    return router.createUrlTree(['/dashboard/home'], {
      queryParamsHandling: 'preserve'
    });
  }

  return true;
};

