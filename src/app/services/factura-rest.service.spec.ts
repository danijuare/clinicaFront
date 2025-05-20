import { TestBed } from '@angular/core/testing';

import { FacturaRestService } from './factura-rest.service';

describe('FacturaRestService', () => {
  let service: FacturaRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FacturaRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
