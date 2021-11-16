import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { CurrencyRates } from '../api/data-api.model';
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
      (latestCurrencyData: CurrencyRates) => {
        this.updateDate = latestCurrencyData.query.timestamp;
        this.fiatCurrencyData = [];
        Object.entries(latestCurrencyData.data).forEach((currency: [string,number]) => {
          this.fiatCurrencyData.push(new FiatCurrencyData(currency[0], parseFloat((1/currency[1]).toFixed(4))));
        });
        this.fiatCurrencyDataSubject.next(this.fiatCurrencyData);
      }
    );
  }

  public getFiatCurrencyData(): Observable<FiatCurrencyData[]> {
    return this.fiatCurrencyDataSubject;
  }

  public getBaseCurrency(): string {
    return this.baseCurrency;
  }
}


