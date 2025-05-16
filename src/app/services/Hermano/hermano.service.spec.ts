import { TestBed } from '@angular/core/testing';

import { HermanoService } from './hermano.service';

describe('HermanoService', () => {
  let service: HermanoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HermanoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
