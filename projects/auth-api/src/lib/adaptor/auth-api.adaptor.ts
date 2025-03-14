import { Injectable } from '@angular/core';
import { Adaptor } from '../interface/adaptor';

@Injectable({
  providedIn: 'root'
})
export class AuthAPIAdaptorService implements Adaptor{

  constructor() { }

  adapt(data:any) { //Adapt Response
    return {
      message:data.message,
      token:data.token,
      userEmail:data.user.email,
    }
  }
}
