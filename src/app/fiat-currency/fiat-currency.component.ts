import { Component, OnInit } from '@angular/core';
import { BaseCurrencyService } from '../shared/services/base-currency.service';
import { DataManagerService } from './services/data-manager/data-manager.service';
import { FiatCurrencyData } from './services/models/fiat-currency.model';


@Component({
  selector: 'app-fiat-currency',
  templateUrl: './fiat-currency.component.html',
  styleUrls: ['./fiat-currency.component.css']
})
export class FiatCurrencyComponent implements OnInit {

  public fiatCurrencyData: FiatCurrencyData[] = [];

  constructor(
    private dataManagerService: DataManagerService,
    private baseCurrencyService: BaseCurrencyService
  
    ) { }

  public ngOnInit(): void {
    this.baseCurrencyService.getBaseCurrency().subscribe(
      (baseCurrency: string) => 
      {
        this.dataManagerService.getLatestCurrencyData(baseCurrency);
        // this.dataManagerService.getHistoricalCurrencyData(baseCurrency);
      }
    );
    this.dataManagerService.getFiatCurrencyData().subscribe(
      currencyData => this.fiatCurrencyData = currencyData
    );
  }



}
