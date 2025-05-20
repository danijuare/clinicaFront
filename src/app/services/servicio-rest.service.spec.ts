import { TestBed } from '@angular/core/testing';

import { ServicioRestService } from './servicio-rest.service';

describe('ServicioRestService', () => {
  let service: ServicioRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
