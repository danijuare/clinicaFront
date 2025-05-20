import { TestBed } from '@angular/core/testing';

import { HotelRestService } from './hotel-rest.service';

describe('HotelRestService', () => {
  let service: HotelRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HotelRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
