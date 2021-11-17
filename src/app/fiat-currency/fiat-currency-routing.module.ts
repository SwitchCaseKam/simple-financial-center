import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './components/details/details.component';
import { FiatCurrencyComponent } from './fiat-currency.component';

const routes: Routes = [
  { path: '', component: FiatCurrencyComponent },
  { path: ':fiatSymbol', component: DetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FiatCurrencyRoutingModule { }
