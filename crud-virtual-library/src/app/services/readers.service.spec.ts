import { TestBed } from '@angular/core/testing';

import { ReadersService } from './readers.service';

describe('ReadersService', () => {
  let service: ReadersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReadersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
