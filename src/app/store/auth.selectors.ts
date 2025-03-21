import { createSelector } from '@ngrx/store';
import { AuthState } from './auth.state';

export const selectAuthState = (state: { auth: AuthState }) => state.auth;

export const selectAuthToken = createSelector(
  selectAuthState,
  (state: AuthState) => state.token
);

export const selectUserData = createSelector(
  selectAuthState,
  (state: AuthState) => state.userData
);

export const selectAuthError = createSelector(
  selectAuthState,
  (state: AuthState) => state.error
);

export const selectIsLoading = createSelector(
  selectAuthState,
  (state: AuthState) => state.isLoading
);
