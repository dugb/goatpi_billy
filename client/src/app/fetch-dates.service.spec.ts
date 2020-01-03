import { TestBed } from '@angular/core/testing';

import { FetchDatesService } from './fetch-dates.service';

describe('FetchDatesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FetchDatesService = TestBed.get(FetchDatesService);
    expect(service).toBeTruthy();
  });
});
