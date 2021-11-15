import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailsRoutingModule } from './details-routing.module';
import { DetailsComponent } from './details.component';

import { ChartComponent } from './chart/chart.component';
import * as PlotlyJS from 'plotly.js-dist-min';
import { PlotlyModule } from 'angular-plotly.js';
import { FormsModule } from '@angular/forms';

PlotlyModule.plotlyjs = PlotlyJS;


@NgModule({
  declarations: [
    DetailsComponent,
    ChartComponent,
    
  ],
  imports: [
    CommonModule,
    DetailsRoutingModule,
    PlotlyModule,
    FormsModule
  ]
})
export class DetailsModule { }
