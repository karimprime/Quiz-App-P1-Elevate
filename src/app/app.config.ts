import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { routes } from './app.routes';
import { authReducer } from './store/auth.reducer';
import {
  saveTokenEffect,
  removeTokenEffect,
  loginSuccessNotificationEffect,
  loginFailureNotificationEffect,
  registerSuccessNotificationEffect,
  registerFailureNotificationEffect,
  loginEffect,
  registerEffect,
} from './store/auth.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(),
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
  ],
};
