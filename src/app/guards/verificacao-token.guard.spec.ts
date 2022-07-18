import { TestBed } from '@angular/core/testing';

import { VerificacaoTokenGuard } from './verificacao-token.guard';

describe('VerificacaoTokenGuard', () => {
  let guard: VerificacaoTokenGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(VerificacaoTokenGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
