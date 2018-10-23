import { TestBed } from '@angular/core/testing';

import { RandomNumGeneratorService } from './random-num-generator.service';

describe('RandomNumGeneratorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RandomNumGeneratorService = TestBed.get(RandomNumGeneratorService);
    expect(service).toBeTruthy();
  });
});
