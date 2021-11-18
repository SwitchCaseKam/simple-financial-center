import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HistoricalCurrencyRates, LatestCurrencyRates } from '../api/data-api.model';
import { DataApiService } from '../api/data-api.service';
import { FiatCurrencyData, FiatCurrencyHistoricalData } from '../models/fiat-currency.model';

@Injectable({
  providedIn: 'root'
})
export class DataManagerService {

  private baseCurrency: string = '';
  private currentCurrency: string = 'USD';

  private updateDate: number = 0;
  private fiatCurrencyData: FiatCurrencyData[] = [];
  private fiatCurrencyDataSubject: Subject<FiatCurrencyData[]> = new Subject();

  private fiatCurencyHistoricalData: FiatCurrencyHistoricalData[] = [];
  private fiatCurencyHistoricalDataSubject: Subject<FiatCurrencyHistoricalData[]> = new Subject();

  constructor(private dataApiService: DataApiService) { }

  public setBaseCurrency(base: string): void {
    this.baseCurrency = base;
  }

  public setCurrentCurrency(currentCurrency: string): void {
    this.currentCurrency = currentCurrency;
  }

  public getLatestCurrencyData(baseCurrency: string = 'USD'): void {
    this.dataApiService.getLatestCurrencyData(baseCurrency).subscribe(
      (latestCurrencyData: LatestCurrencyRates) => {
        this.updateDate = latestCurrencyData.query.timestamp;
        this.fiatCurrencyData = [];
        Object.entries(latestCurrencyData.data).forEach((currency: [string,number]) => {
          this.fiatCurrencyData.push(new FiatCurrencyData(currency[0], parseFloat((1/currency[1]).toFixed(4))));
        });
        this.fiatCurrencyDataSubject.next(this.fiatCurrencyData);
      }
    );
  }

  public getHistoricalCurrencyData(baseCurrency: string = 'USD'): void {
    this.dataApiService.getHistoricalCurrencyData(baseCurrency).subscribe(
      (historicalCurrencyData: HistoricalCurrencyRates) => {
        this.fiatCurencyHistoricalData = [];
        Object.entries(historicalCurrencyData.data).forEach((date) => {
          Object.entries(date[1]).forEach((v) => {
            const currentState = this.fiatCurencyHistoricalData.filter(c => c.symbol === v[0]);
            if (!currentState[0]) {
              this.fiatCurencyHistoricalData.push(new FiatCurrencyHistoricalData(v[0], [date[0]], [1/Number(v[1])]))
            } else {
              currentState[0].dates.push(date[0]);
              currentState[0].values.push(1/Number(v[1]));
              const index = this.fiatCurencyHistoricalData.indexOf(this.fiatCurencyHistoricalData.filter(c => c.symbol === v[0])[0])
              this.fiatCurencyHistoricalData[index] = currentState[0];
            }
          });
        });
        this.fiatCurencyHistoricalDataSubject.next(this.fiatCurencyHistoricalData);
      }
    )
  }

  public getFiatCurrencyData(): Observable<FiatCurrencyData[]> {
    return this.fiatCurrencyDataSubject;
  }

  public getFiatCurrencyHistoricalData(): Observable<FiatCurrencyHistoricalData[]> {
    return this.fiatCurencyHistoricalDataSubject;
  }

  public getBaseCurrency(): string {
    return this.baseCurrency;
  }

  public getCurrentCurrency(): string {
    return this.currentCurrency;
  }
}


