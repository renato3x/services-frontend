import { TestBed } from '@angular/core/testing';

import { PodeSairGuard } from './pode-sair.guard';

describe('PodeSairGuard', () => {
  let guard: PodeSairGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PodeSairGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
