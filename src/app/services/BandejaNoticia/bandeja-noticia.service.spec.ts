import { TestBed } from '@angular/core/testing';

import { BandejaNoticiaService } from './bandeja-noticia.service';

describe('BandejaNoticiaService', () => {
  let service: BandejaNoticiaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BandejaNoticiaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
