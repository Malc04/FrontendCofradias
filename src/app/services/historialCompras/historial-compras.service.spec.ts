import { TestBed } from '@angular/core/testing';

import { HistorialComprasService } from './historial-compras.service';

describe('HistorialComprasService', () => {
  let service: HistorialComprasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistorialComprasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
