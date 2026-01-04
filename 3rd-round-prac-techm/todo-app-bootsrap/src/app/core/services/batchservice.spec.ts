import { TestBed } from '@angular/core/testing';

import { Batchservice } from './batchservice';

describe('Batchservice', () => {
  let service: Batchservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Batchservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
