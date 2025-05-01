import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap, switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';

import { AuthApiKpService } from 'auth-api-kp';
import {
  login,
  loginSuccess,
  loginFailure,
  register,
  registerSuccess,
  registerFailure,
  logout,
} from './auth.actions';
import { NotificationService } from '../../shared/services/notification/notification.service';

const USER_TOKEN_KEY = 'userToken';

export const saveTokenEffect = createEffect(
  () => {
    const actions$ = inject(Actions);
    return actions$.pipe(
      ofType(loginSuccess),
      tap(({ token }) => {
        localStorage.setItem(USER_TOKEN_KEY, token);
      })
    );
  },
  { functional: true, dispatch: false }
);

export const removeTokenEffect = createEffect(
  () => {
    const actions$ = inject(Actions);
    const router = inject(Router);
    return actions$.pipe(
      ofType(logout),
      tap(() => {
        localStorage.removeItem(USER_TOKEN_KEY);
        router.navigate(['/auth-layout/login']);
      })
    );
  },
  { functional: true, dispatch: false }
);

export const loginSuccessNotificationEffect = createEffect(
  () => {
    const actions$ = inject(Actions);
    const notificationService = inject(NotificationService);
    const router = inject(Router);
    return actions$.pipe(
      ofType(loginSuccess),
      tap(() => {
        notificationService.success('Login successful!');
      })
    );
  },
  { functional: true, dispatch: false }
);

export const loginFailureNotificationEffect = createEffect(
  () => {
    const actions$ = inject(Actions);
    const notificationService = inject(NotificationService);
    return actions$.pipe(
      ofType(loginFailure),
      tap(({ error }) => {
        notificationService.error(error);
      })
    );
  },
  { functional: true, dispatch: false }
);

export const registerSuccessNotificationEffect = createEffect(
  () => {
    const actions$ = inject(Actions);
    const notificationService = inject(NotificationService);
    const router = inject(Router);
    return actions$.pipe(
      ofType(registerSuccess),
      tap(() => {
        notificationService.success('Registration successful!');
        router.navigate(['/auth-layout/login']);
      })
    );
  },
  { functional: true, dispatch: false }
);

export const registerFailureNotificationEffect = createEffect(
  () => {
    const actions$ = inject(Actions);
    const notificationService = inject(NotificationService);
    return actions$.pipe(
      ofType(registerFailure),
      tap(({ error }) => {
        notificationService.error(error);
      })
    );
  },
  { functional: true, dispatch: false }
);

export const loginEffect = createEffect(
  () => {
    const actions$ = inject(Actions);
    const authService = inject(AuthApiKpService);
    return actions$.pipe(
      ofType(login),
      switchMap(({ email, password }) =>
        authService.login({ email, password }).pipe(
          map((res) => {
            if ('token' in res && res.message === 'success') {
              return loginSuccess({ token: res.token });
            }
            return loginFailure({ error: 'Email or Password is incorrect!' });
          }),
          catchError(() => of(loginFailure({ error: 'Login failed' })))
        )
      )
    );
  },
  { functional: true }
);

export const registerEffect = createEffect(
  () => {
    const actions$ = inject(Actions);
    const authService = inject(AuthApiKpService);
    return actions$.pipe(
      ofType(register),
      switchMap((userData) =>
        authService.register(userData).pipe(
          map((res) => {
            if (res.message === 'success') {
              return registerSuccess({ message: 'Registration successful' });
            }
            return registerFailure({ error: 'Registration failed' });
          }),
          catchError(() =>
            of(registerFailure({ error: 'Registration failed' }))
          )
        )
      )
    );
  },
  { functional: true }
);
