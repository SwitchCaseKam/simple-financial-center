import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FiatCurrencyComponent } from './fiat-currency.component';

const routes: Routes = [
  { path: '', component: FiatCurrencyComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FiatCurrencyRoutingModule { }
