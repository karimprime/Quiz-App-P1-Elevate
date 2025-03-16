import * as i0 from '@angular/core';
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, catchError, of } from 'rxjs';

class AuthAPIAdaptorService {
    constructor() { }
    adapt(data) {
        return {
            message: data.message,
            token: data.token,
            userEmail: data.user?.email || '',
        };
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: AuthAPIAdaptorService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: AuthAPIAdaptorService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: AuthAPIAdaptorService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: () => [] });

class AuthEndPoint {
    static LOGIN = "https://exam.elevateegy.com/api/v1/auth/signin";
    static REGISTER = "https://exam.elevateegy.com/api/v1/auth/signup";
    static LOGOUT = "https://exam.elevateegy.com/api/v1/auth/logout";
    static FORGET_PASSWORD = "https://exam.elevateegy.com/api/v1/auth/forgotPassword";
    static VERIFY_CODE = "https://exam.elevateegy.com/api/v1/auth/verifyResetCode";
    static RESET_PASSWORD = "https://exam.elevateegy.com/api/v1/auth/resetPassword";
    static LOGIN_USER = "https://exam.elevateegy.com/api/v1/auth/profileData";
    static EDIT_PROFILE = "https://exam.elevateegy.com/api/v1/auth/editProfile";
    static CHANGE_PASSWORD = "https://exam.elevateegy.com/api/v1/auth/changePassword";
    static DELETE_ACCOUNT = "https://exam.elevateegy.com/api/v1/auth/deleteMe";
}

class AuthApiService {
    _httpClient = inject(HttpClient);
    _authAPIAdaptorService = inject(AuthAPIAdaptorService);
    userData = new BehaviorSubject(null);
    login(data) {
        return this._httpClient.post(AuthEndPoint.LOGIN, data).pipe(map((response) => {
            const adaptedResponse = this._authAPIAdaptorService.adapt(response);
            if (adaptedResponse.token) {
                this.userData.next(adaptedResponse); // Emit the token and user data
            }
            return adaptedResponse;
        }), catchError((error) => {
            console.error('Login API Error:', error);
            return of({ error: error.message || 'An error occurred during login.' });
        }));
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: AuthApiService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: AuthApiService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: AuthApiService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });

/*
 * Public API Surface of auth-api
 */

/**
 * Generated bundle index. Do not edit.
 */

export { AuthApiService };
//# sourceMappingURL=auth-api.mjs.map
