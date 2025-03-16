import { inject, Injectable } from '@angular/core';
import { PlatFormService } from '../platform/platform.service';
import { BehaviorSubject } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import { AuthApiService } from 'auth-api';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly _router = inject(Router);
  private readonly _platformService = inject(PlatFormService);
  private readonly _authApiService = inject(AuthApiService);

  private readonly _userTokenKey = 'userToken';
  userData: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(null);

  constructor() {
    this._authApiService.userData.subscribe((data) => {
      if (data && data.token) {
        this._platformService.safeLocalStorageSet(this._userTokenKey, data.token);
        this._updateUserData(data.token);
      }
    });
  }

  logout(): void {
    this._platformService.safeLocalStorageRemove(this._userTokenKey);
    if (this._platformService.checkPlatform() === 'Browser') {
      localStorage.removeItem('userName');
      localStorage.removeItem('userRole');
    }
    this.userData.next(null);
    this._router.navigate(['/auth-layout/login']);
  }

  get isAuthenticated(): boolean {
    if (this._platformService.checkPlatform() !== 'Browser') return false;

    const token = this._getToken();
    if (!token) return false;

    try {
      const decodedToken = jwtDecode<any>(token);
      const isTokenValid = Date.now() < decodedToken.exp * 1000;

      if (!isTokenValid) {
        this.logout();
      }

      return isTokenValid;
    } catch (error) {
      console.error('Invalid token:', error);
      this.logout();
      return false;
    }
  }

  private _getToken(): string | null {
    return this._platformService.safeLocalStorageGet(this._userTokenKey);
  }

  private _updateUserData(token: string): void {
    try {
      const decodedToken: any = jwtDecode(token);
      this.userData.next(decodedToken);

    } catch (error) {
      console.error('Invalid token:', error);
      this.logout();
    }
  }
}
