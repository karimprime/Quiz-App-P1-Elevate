import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';

import { AuthAPIAdaptorService } from './adaptor/auth-api.adaptor';
import { AuthEndPoint } from './enums/AuthAPI.endPoint';

@Injectable({
  providedIn: 'root'
})
export class AuthApiKpService {

  private readonly _httpClient = inject(HttpClient);
  private readonly _authAPIAdaptorService = inject(AuthAPIAdaptorService);

  userData: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(null);

  login(data: any): Observable<any> {
    return this._httpClient.post<any>(AuthEndPoint.LOGIN, data).pipe(
      map((response: any) => {
        const adaptedResponse = this._authAPIAdaptorService.adapt(response);
        if (adaptedResponse.token) {
          this.userData.next(adaptedResponse);
        }
        return adaptedResponse;
      }),
      catchError((error) => {
        return of({ error: error.message || 'An error occurred during login.' });
      })
    );
  }

  register(data: any): Observable<any> {
    return this._httpClient.post<any>(AuthEndPoint.REGISTER, data).pipe(
      map((response: any) => {
        const adaptedResponse = this._authAPIAdaptorService.adapt(response);
        return adaptedResponse;
      }),
      catchError((error) => {
        return of({ error: error.message || 'An error occurred during registration.' });
      })
    );
  }

  forgetPassword(data: any): Observable<any> {
    return this._httpClient.post<any>(AuthEndPoint.FORGET_PASSWORD, data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((error) => {
        return of({ error: error.message || 'An error occurred during forget password.' });
      })
    );
  }

  verifyCode(data: any): Observable<any> {
    return this._httpClient.post<any>(AuthEndPoint.VERIFY_CODE, data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((error) => {
        return of({ error: error.message || 'An error occurred during verify code.' });
      })
    );
  }

  resetPassword(data: any): Observable<any> {
    return this._httpClient.put<any>(AuthEndPoint.RESET_PASSWORD, data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((error) => {
        return of({ error: error.message || 'An error occurred during reset password.' });
      })
    );
  }

  logout(): Observable<any> {
    return this._httpClient.get(AuthEndPoint.LOGOUT, {}).pipe(
      map(() => {
        this.userData.next(null);
        localStorage.removeItem('userToken');
        return { message: 'Logged out successfully.' };
      }),
      catchError((error) => {
        return of({ error: error.message || 'An error occurred during logout.' });
      })
    );
  }
}




