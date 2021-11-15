import { TestBed } from '@angular/core/testing';

import { DataSeriesResolver } from './data-series.resolver';

describe('DataSeriesResolver', () => {
  let resolver: DataSeriesResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(DataSeriesResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
