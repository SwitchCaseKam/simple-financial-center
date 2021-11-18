import { Component, OnDestroy, OnInit } from '@angular/core';
import { of, Subscription, zip } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { BaseCurrencyService } from 'src/app/shared/services/base-currency.service';
import { DataManagerService } from '../../services/data-manager/data-manager.service';
import { FiatCurrencyHistoricalData } from '../../services/models/fiat-currency.model';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit, OnDestroy {

  public historicalData: FiatCurrencyHistoricalData[] = []
  private detailsSubscription: Subscription = new Subscription();

  constructor(
    private dataManagerService: DataManagerService,
    private baseCurrencyService: BaseCurrencyService
  ) { }

  public ngOnInit(): void {
    this.detailsSubscription = this.baseCurrencyService.getBaseCurrency().pipe(
      tap((baseCurrency) => this.dataManagerService.getHistoricalCurrencyData(baseCurrency)),
      switchMap(() => (this.dataManagerService.getFiatCurrencyHistoricalData())),
    ).subscribe(
      (currencyData) => {
        this.historicalData = currencyData.filter(
          (currencyData) => currencyData.symbol === this.dataManagerService.getCurrentCurrency());
      }
    );
  }

  public ngOnDestroy(): void {
    this.detailsSubscription.unsubscribe();
  }
}
