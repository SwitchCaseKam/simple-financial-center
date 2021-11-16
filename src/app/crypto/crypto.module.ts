import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CryptoRoutingModule } from './crypto-routing.module';
import { CryptoComponent } from './crypto.component';
import { SingleCryptoInfoComponent } from './components/single-crypto-info/single-crypto-info.component';
import { DataApiService } from './services/api/data-api.service';
import { DataManagerService } from './services/data-manager/data-manager.service';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DetailsModule } from './details/details.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DataSeriesResolver } from './services/resolvers/data-series.resolver';
import { AuthHttpInterceptor } from '../interceptors/auth-http.interceptor';

@NgModule({
  declarations: [
    CryptoComponent,
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
    DetailsModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  providers: [DataSeriesResolver, 
    // { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true },
  ]
})
export class CryptoModule { }
