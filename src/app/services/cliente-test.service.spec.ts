import { TestBed } from '@angular/core/testing';

import { ClienteTestService } from './cliente-test.service';

describe('ClienteTestService', () => {
  let service: ClienteTestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClienteTestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
