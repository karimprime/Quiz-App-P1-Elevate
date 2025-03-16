import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthAPIAdaptorService } from './adaptor/auth-api.adaptor';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';
import { AuthEndPoint } from './enums/AuthAPI.endPoint';

@Injectable({
  providedIn: 'root'
})
export class AuthApiElevateService {

  private readonly _httpClient = inject(HttpClient);
  private readonly _authAPIAdaptorService = inject(AuthAPIAdaptorService);

  userData: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(null);

  login(data: any): Observable<any> {
    return this._httpClient.post(AuthEndPoint.LOGIN, data).pipe(
      map((response: any) => {
        const adaptedResponse = this._authAPIAdaptorService.adapt(response);
        if (adaptedResponse.token) {
          this.userData.next(adaptedResponse); // Emit the token and user data
        }
        return adaptedResponse;
      }),
      catchError((error) => {
        console.error('Login API Error:', error);
        return of({ error: error.message || 'An error occurred during login.' });
      })
    );
  }
}

