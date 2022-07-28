import { TestBed } from '@angular/core/testing';

import { IdValidatorGuard } from './id-validator.guard';

describe('IdValidatorGuard', () => {
  let guard: IdValidatorGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IdValidatorGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
