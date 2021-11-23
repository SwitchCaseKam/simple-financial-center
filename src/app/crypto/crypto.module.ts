import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CryptoRoutingModule } from './crypto-routing.module';
import { CryptoComponent } from './crypto.component';
import { SingleCryptoInfoComponent } from './components/single-crypto-info/single-crypto-info.component';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DataSeriesResolver } from './services/resolvers/data-series.resolver';
import { SharedModule } from '../shared/shared.module';
import { DetailsComponent } from './components/details/details.component';


@NgModule({
  declarations: [
    CryptoComponent,
    DetailsComponent,
    SingleCryptoInfoComponent,
  ],
  imports: [
    CommonModule,
    CryptoRoutingModule,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatToolbarModule,
    FormsModule,
    MatCardModule,
    MatDividerModule,
    FlexLayoutModule,
    MatButtonModule,
    SharedModule
  ],
  providers: [DataSeriesResolver, 
    // { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true },
  ]
})
export class CryptoModule { }
