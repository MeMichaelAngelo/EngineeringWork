import { TestBed, async, inject } from '@angular/core/testing';

import { BeforeQuitGuard } from './before-quit.guard';

describe('BeforeQuitGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BeforeQuitGuard]
    });
  });

  it('should ...', inject([BeforeQuitGuard], (guard: BeforeQuitGuard) => {
    expect(guard).toBeTruthy();
  }));
});
