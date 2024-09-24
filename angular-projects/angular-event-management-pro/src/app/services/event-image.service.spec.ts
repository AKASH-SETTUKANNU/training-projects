import { TestBed } from '@angular/core/testing';

import { EventImageService } from './event-image.service';

describe('EventImageService', () => {
  let service: EventImageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventImageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
