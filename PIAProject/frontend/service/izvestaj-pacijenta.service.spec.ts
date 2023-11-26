import { TestBed } from '@angular/core/testing';

import { IzvestajPacijentaService } from './izvestaj-pacijenta.service';

describe('IzvestajPacijentaService', () => {
  let service: IzvestajPacijentaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IzvestajPacijentaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
