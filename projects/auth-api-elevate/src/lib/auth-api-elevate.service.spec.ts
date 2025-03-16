import { TestBed } from '@angular/core/testing';

import { AuthApiElevateService } from './auth-api-elevate.service';

describe('AuthApiElevateService', () => {
  let service: AuthApiElevateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthApiElevateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
