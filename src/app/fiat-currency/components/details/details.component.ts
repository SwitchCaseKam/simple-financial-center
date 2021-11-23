import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  public historicalData: FiatCurrencyHistoricalData[] = [];
  public ratesCurrenciesPair: string = '';
  public timeSlots: Map<string, number> = new Map([
    ['1 week', 7],
    ['1 month', 30],
    ['3 months', 90],
    ['6 months', 180],
    ['1 year', 365],
    ['3 years', 1095]
  ]);
  private detailsSubscription: Subscription = new Subscription();


  constructor(
    private dataManagerService: DataManagerService,
    private baseCurrencyService: BaseCurrencyService,
    private activatedRoute: ActivatedRoute,
  ) { 
    this.activatedRoute.params.subscribe(
      fiatSymbol => this.dataManagerService.setCurrentCurrency(fiatSymbol['fiatSymbol'])
    );
  }

  public ngOnInit(): void {
    this.detailsSubscription = this.baseCurrencyService.getBaseCurrencySubject().pipe(
      tap((baseCurrency) => {
        this.dataManagerService.getHistoricalCurrencyData(baseCurrency);
        this.ratesCurrenciesPair = `${this.dataManagerService.getCurrentCurrency()}/${baseCurrency}`;
      }),
      switchMap(() => (this.dataManagerService.getFiatCurrencyHistoricalData())),
    ).subscribe(
      (currencyData) => {
        this.historicalData = [];
        setTimeout(() => this.historicalData = currencyData.filter(
          (currencyData) => currencyData.symbol === this.dataManagerService.getCurrentCurrency()), 500);
      }
    );
  }

  public ngOnDestroy(): void {
    this.detailsSubscription.unsubscribe();
  }

  public getHistoricalData(timeSlot: number): void {
    this.dataManagerService.getHistoricalCurrencyData(this.baseCurrencyService.getBaseCurrency(), timeSlot);
  }

  public getTimeSlots(): string[] {
    return Array(...this.timeSlots.keys());
  }

  public getDaysNumberForSelectedTimeSlot(timeSlot: string): number {
    const days = this.timeSlots.get(timeSlot);
    if (days !== undefined) {return days; }
    return 180;
  }
}
