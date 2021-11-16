import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';

const routes: Routes = [
  { path: '', component: HeaderComponent},
  { path: 'crypto', loadChildren: () => import('../crypto/crypto.module').then(m => m.CryptoModule) },
  { path: 'fiat', loadChildren: () => import('../fiat-currency/fiat-currency.module').then(m => m.FiatCurrencyModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule { }
