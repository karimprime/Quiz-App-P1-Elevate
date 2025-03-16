import { Adaptor } from '../interface/adaptor';
import * as i0 from "@angular/core";
export declare class AuthAPIAdaptorService implements Adaptor {
    constructor();
    adapt(data: any): {
        message: string;
        token: string;
        userEmail: string;
    };
    static ɵfac: i0.ɵɵFactoryDeclaration<AuthAPIAdaptorService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AuthAPIAdaptorService>;
}
