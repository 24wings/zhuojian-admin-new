import { TestBed, inject } from '@angular/core/testing';

import { M2Service } from './m2.service';

describe('M2Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [M2Service]
    });
  });

  it('should be created', inject([M2Service], (service: M2Service) => {
    expect(service).toBeTruthy();
  }));
});
