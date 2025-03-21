import { createReducer, on } from '@ngrx/store';
import { AuthState, initialAuthState } from './auth.state';
import {
  login,
  loginSuccess,
  loginFailure,
  register,
  registerSuccess,
  registerFailure,
  logout,
} from './auth.actions';

export const authReducer = createReducer(
  initialAuthState,
  on(login, (state) => ({ ...state, isLoading: true, error: null })),
  on(register, (state) => ({ ...state, isLoading: true, error: null })),
  on(loginSuccess, (state, { token }) => ({
    ...state,
    token,
    isLoading: false,
    error: null,
  })),
  on(loginFailure, (state, { error }) => ({
    ...state,
    token: null,
    isLoading: false,
    error,
  })),
  on(registerSuccess, (state) => ({
    ...state,
    isLoading: false,
    error: null,
  })),
  on(registerFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),
  on(logout, (state) => ({
    ...state,
    token: null,
    userData: null,
    error: null,
    isLoading: false,
  }))
);
