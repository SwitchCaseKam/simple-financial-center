import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HistoricalCurrencyRates, LatestCurrencyRates } from '../api/data-api.model';
import { DataApiService } from '../api/data-api.service';
import { FiatCurrencyData } from '../models/fiat-currency.model';

@Injectable({
  providedIn: 'root'
})
export class DataManagerService {

  private baseCurrency: string = '';

  private updateDate: number = 0;
  private fiatCurrencyData: FiatCurrencyData[] = [];
  private fiatCurrencyDataSubject: Subject<FiatCurrencyData[]> = new Subject();

  constructor(private dataApiService: DataApiService) { }

  public setBaseCurrency(base: string): void {
    this.baseCurrency = base;
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
        this.fiatCurrencyData.forEach(curr => curr.historicalValues[0] = Object.keys(historicalCurrencyData.data));
        Object.entries(historicalCurrencyData.data).forEach((date) => {
          Object.entries(date[1]).forEach((v) => {
            const currentParsedCurrency = this.fiatCurrencyData.filter(c => c.symbol === v[0])[0];
            currentParsedCurrency.historicalValues[1].push(1/Number(v[1]));
          });
        });
        this.fiatCurrencyDataSubject.next(this.fiatCurrencyData);
      } 
    )
  }

  public getFiatCurrencyData(): Observable<FiatCurrencyData[]> {
    return this.fiatCurrencyDataSubject;
  }

  public getBaseCurrency(): string {
    return this.baseCurrency;
  }
}


