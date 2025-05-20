import { TestBed } from '@angular/core/testing';

import { HabitacionRestService } from './habitacion-rest.service';

describe('HabitacionRestService', () => {
  let service: HabitacionRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HabitacionRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
