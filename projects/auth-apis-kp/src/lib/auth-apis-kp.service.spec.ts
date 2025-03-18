import { TestBed } from '@angular/core/testing';

import { AuthAPISKPService } from './auth-apis-kp.service';

describe('AuthAPISKPService', () => {
  let service: AuthAPISKPService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthAPISKPService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
