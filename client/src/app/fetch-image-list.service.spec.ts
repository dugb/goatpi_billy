import { TestBed } from '@angular/core/testing';

import { FetchImageListService } from './fetch-image-list.service';

describe('FetchImageListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FetchImageListService = TestBed.get(FetchImageListService);
    expect(service).toBeTruthy();
  });
});
