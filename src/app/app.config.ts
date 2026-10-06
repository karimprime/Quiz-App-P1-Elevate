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
import { examReducer } from './store/exam/exam.reducer';
import { API_CONFIG } from 'auth-api-kp';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    {
      provide: API_CONFIG,
      useValue: {
        baseUrl: 'https://exam.elevateegy.com/api/',
        apiVersion: 'v1',
        endpoints: {
          auth: {
            login: 'auth/signin',
            register: 'auth/signup',
            logout: 'auth/logout',
            forgotPassword: 'auth/forgotPassword',
            verifyResetCode: 'auth/verifyResetCode',
            resetPassword: 'auth/resetPassword',
            profileData: 'auth/profileData',
            editProfile: 'auth/editProfile',
            changePassword: 'auth/changePassword',
            deleteMe: 'auth/deleteMe',
            uploadPhoto: 'auth/uploadPhoto',
            forgetPasswordForm: 'auth/forgetPasswordForm',
          },
        },
      },
    },
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withInMemoryScrolling({ scrollPositionRestoration: 'top' })
    ),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withInterceptors([headingInterceptor])),
    provideAnimations(),
    provideStore({
      auth: authReducer,
      exam: examReducer,
    }),
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
