export interface AuthState {
  token: string | null;
  userData: any | null;
  error: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export const initialAuthState: AuthState = {
  token: null,
  userData: null,
  error: null,
  isLoading: false,
  isAuthenticated: false,
};
