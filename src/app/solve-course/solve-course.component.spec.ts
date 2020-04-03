import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolveCourseComponent } from './solve-course.component';

describe('SolveCourseComponent', () => {
  let component: SolveCourseComponent;
  let fixture: ComponentFixture<SolveCourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolveCourseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolveCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
