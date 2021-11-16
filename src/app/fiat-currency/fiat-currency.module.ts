import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FiatCurrencyRoutingModule } from './fiat-currency-routing.module';
import { FiatCurrencyComponent } from './fiat-currency.component';
import { SingleFiatInfoComponent } from './components/single-fiat-info/single-fiat-info.component';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DetailsModule } from '../crypto/details/details.module';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';


@NgModule({
  declarations: [
    FiatCurrencyComponent,
    SingleFiatInfoComponent,
  ],
  imports: [
    CommonModule,
    FiatCurrencyRoutingModule,
    MatCardModule,
    MatDividerModule,
    FlexLayoutModule,
    DetailsModule,
    MatButtonModule,
    MatSelectModule,
    MatToolbarModule,
    ReactiveFormsModule
  ]
})
export class FiatCurrencyModule { }
