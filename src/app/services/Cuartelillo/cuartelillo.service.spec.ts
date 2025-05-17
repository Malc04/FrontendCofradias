import { TestBed } from '@angular/core/testing';

import { CuartelilloService } from './cuartelillo.service';

describe('CuartelilloService', () => {
  let service: CuartelilloService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CuartelilloService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
