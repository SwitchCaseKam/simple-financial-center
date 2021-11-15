import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CryptoComponent } from './crypto.component';
import { DataSeriesResolver } from './services/resolvers/data-series.resolver';

const routes: Routes = [
  { path: '', component: CryptoComponent },
  { path: ':cryptoCode', loadChildren: () => import('./details/details.module').then(m => m.DetailsModule),
  // resolve: { resolver: DataSeriesResolver } 
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CryptoRoutingModule { }
