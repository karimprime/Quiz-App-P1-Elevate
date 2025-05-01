import {
  ApplicationConfig,
  provideZoneChangeDetection,
  isDevMode,
} from '@angular/core';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { routes } from './app.routes';

import {
  saveTokenEffect,
  removeTokenEffect,
  loginSuccessNotificationEffect,
  loginFailureNotificationEffect,
  registerSuccessNotificationEffect,
  registerFailureNotificationEffect,
  loginEffect,
  registerEffect,
} from './store/auth/auth.effects';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { headingInterceptor } from './core/interceptors/header/header.interceptor';
import { authReducer } from './store/auth/auth.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withInMemoryScrolling({ scrollPositionRestoration: 'top' })
    ),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withInterceptors([headingInterceptor])),
    provideAnimations(),
    provideStore({ auth: authReducer }),
    provideEffects({
      saveToken: saveTokenEffect,
      removeToken: removeTokenEffect,
      loginSuccessNotification: loginSuccessNotificationEffect,
      loginFailureNotification: loginFailureNotificationEffect,
      registerSuccessNotification: registerSuccessNotificationEffect,
      registerFailureNotification: registerFailureNotificationEffect,
      login: loginEffect,
      register: registerEffect,
    }),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
};
