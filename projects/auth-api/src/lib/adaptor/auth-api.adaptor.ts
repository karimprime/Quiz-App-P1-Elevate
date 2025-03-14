import { Injectable } from '@angular/core';
import { Adaptor } from '../interface/adaptor';

@Injectable({
  providedIn: 'root'
})
export class AuthAPIAdaptorService implements Adaptor{

  constructor() { }

  adapt(data: any): { message: string, token: string, userEmail: string } {
    return {
      message: data.message,
      token: data.token,
      userEmail: data.user?.email || '',
    };
  }
}
