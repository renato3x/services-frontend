import { TestBed } from '@angular/core/testing';

import { CargosServiceService } from './cargos-service.service';

describe('CargosServiceService', () => {
  let service: CargosServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CargosServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
