import { BehaviorSubject, Observable } from 'rxjs';
import { AuthAPI } from './base/AuthAPI';
import * as i0 from "@angular/core";
export declare class AuthApiService implements AuthAPI {
    private readonly _httpClient;
    private readonly _authAPIAdaptorService;
    userData: BehaviorSubject<any | null>;
    login(data: any): Observable<any>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AuthApiService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AuthApiService>;
}
