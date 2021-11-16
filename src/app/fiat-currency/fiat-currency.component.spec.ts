import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiatCurrencyComponent } from './fiat-currency.component';

describe('FiatCurrencyComponent', () => {
  let component: FiatCurrencyComponent;
  let fixture: ComponentFixture<FiatCurrencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiatCurrencyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiatCurrencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
