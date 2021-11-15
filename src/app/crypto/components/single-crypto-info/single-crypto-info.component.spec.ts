import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleCryptoInfoComponent } from './single-crypto-info.component';

describe('SingleCryptoInfoComponent', () => {
  let component: SingleCryptoInfoComponent;
  let fixture: ComponentFixture<SingleCryptoInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleCryptoInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleCryptoInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
