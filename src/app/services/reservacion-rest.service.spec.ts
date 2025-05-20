import { TestBed } from '@angular/core/testing';

import { ReservacionRestService } from './reservacion-rest.service';

describe('ReservacionRestService', () => {
  let service: ReservacionRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReservacionRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
