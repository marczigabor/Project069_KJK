import { TestBed } from '@angular/core/testing';

import { KjkApiService } from './kjk-api.service';

describe('KjkApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: KjkApiService = TestBed.get(KjkApiService);
    expect(service).toBeTruthy();
  });
});
