import { TestBed, inject } from '@angular/core/testing';

import { CellsService } from './cells.service';

describe('CellsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CellsService]
    });
  });

  it('should be created', inject([CellsService], (service: CellsService) => {
    expect(service).toBeTruthy();
  }));
});
