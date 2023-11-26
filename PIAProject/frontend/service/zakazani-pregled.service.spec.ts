import { TestBed } from '@angular/core/testing';

import { ZakazaniPregledService } from './zakazani-pregled.service';

describe('ZakazaniPregledService', () => {
  let service: ZakazaniPregledService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ZakazaniPregledService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
