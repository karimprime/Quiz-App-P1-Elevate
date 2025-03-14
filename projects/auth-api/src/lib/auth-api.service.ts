import { inject, Injectable } from '@angular/core';
import { AuthAPI } from './base/AuthAPI';
import { HttpClient } from '@angular/common/http';
import { AuthAPIAdaptorService } from './adaptor/auth-api.adaptor';
import { catchError, map, Observable, of } from 'rxjs';
import { AuthEndPoint } from './enums/AuthAPI.endPoint';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService implements AuthAPI {

  private readonly _httpClient = inject(HttpClient);
  private readonly _authAPIAdaptorService = inject(AuthAPIAdaptorService);
login(data: any): Observable<any> {
  return this._httpClient.post(AuthEndPoint.LOGIN , data).pipe(
    map((res) =>{
      this._authAPIAdaptorService.adapt(res);
    }),
    catchError((err) => of(err))
  )
}
}
