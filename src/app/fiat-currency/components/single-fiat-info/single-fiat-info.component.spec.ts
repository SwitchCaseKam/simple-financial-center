import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleFiatInfoComponent } from './single-fiat-info.component';

describe('SingleFiatInfoComponent', () => {
  let component: SingleFiatInfoComponent;
  let fixture: ComponentFixture<SingleFiatInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleFiatInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleFiatInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
