import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthAPIAdaptorService } from './adaptor/auth-api.adaptor';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';
import { AuthEndPoint } from './enums/AuthAPI.endPoint';

@Injectable({
  providedIn: 'root'
})
export class AuthAPISKPService {

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
        console.error('Login API Error:', error);
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
        console.error('Register API Error:', error);
        return of({ error: error.message || 'An error occurred during registration.' });
      })
    );
  }

  logout(): Observable<any> {
    return this._httpClient.post(AuthEndPoint.LOGOUT, {}).pipe(
      map(() => {
        this.userData.next(null);
        return { message: 'Logged out successfully.' };
      }),
      catchError((error) => {
        console.error('Logout API Error:', error);
        return of({ error: error.message || 'An error occurred during logout.' });
      })
    );
  }
}
