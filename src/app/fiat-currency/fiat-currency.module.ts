import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FiatCurrencyRoutingModule } from './fiat-currency-routing.module';
import { FiatCurrencyComponent } from './fiat-currency.component';
import { SingleFiatInfoComponent } from './components/single-fiat-info/single-fiat-info.component';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DetailsComponent } from './components/details/details.component';
import { SharedModule } from '../shared/shared.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    FiatCurrencyComponent,
    SingleFiatInfoComponent,
    DetailsComponent,
  ],
  imports: [
    CommonModule,
    FiatCurrencyRoutingModule,
    MatCardModule,
    MatDividerModule,
    FlexLayoutModule,
    MatButtonModule,
    MatSelectModule,
    MatToolbarModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    SharedModule
  ]
})
export class FiatCurrencyModule { }
