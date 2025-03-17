import { TestBed } from '@angular/core/testing';

import { AuthApiKPService } from './auth-api-kp.service';

describe('AuthApiKPService', () => {
  let service: AuthApiKPService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthApiKPService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
