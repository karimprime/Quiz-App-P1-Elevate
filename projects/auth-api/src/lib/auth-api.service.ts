import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, catchError, map, of } from 'rxjs';
import { jwtDecode } from 'jwt-decode'; // Import jwtDecode

import { AuthAPI } from './base/AuthAPI';
import { AuthAPIAdaptorService } from './adaptor/auth-api.adaptor';
import { AuthEndPoint } from './enums/AuthAPI.endPoint';
import { PlatFormService } from './services/platForm/plat-form.service';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService implements AuthAPI {
  private readonly _httpClient = inject(HttpClient);
  private readonly _authAPIAdaptorService = inject(AuthAPIAdaptorService);
  private readonly _router = inject(Router);
  private readonly _platformService = inject(PlatFormService);

  private readonly _userTokenKey = 'userToken';
  userData: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(null);

  login(data: any): Observable<any> {
    return this._httpClient.post(AuthEndPoint.LOGIN, data).pipe(
      map((response: any) => {
        const adaptedResponse = this._authAPIAdaptorService.adapt(response);
        if (adaptedResponse.token) {
          this._platformService.safeLocalStorageSet(this._userTokenKey, adaptedResponse.token);
          this._updateUserData(adaptedResponse.token);
        }
        return adaptedResponse;
      }),
      catchError((error) => {
        console.error('Login API Error:', error);
        return of({ error: error.message || 'An error occurred during login.' });
      })
    );
  }

  logout(): void {
    this._platformService.safeLocalStorageRemove(this._userTokenKey);
    if (this._platformService.checkPlatform() === 'Browser') {
      localStorage.removeItem('userName');
      localStorage.removeItem('userRole');
    }
    this.userData.next(null);
    this._router.navigate(['/auth/login']);
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

      if (this._platformService.checkPlatform() === 'Browser') {
        localStorage.setItem('userName', decodedToken.name);
        localStorage.setItem('userRole', decodedToken.role);
      }
    } catch (error) {
      console.error('Invalid token:', error);
      this.logout();
    }
  }
}
