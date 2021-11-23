import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { DataApiService } from '../api/data-api.service';
import { filter, take } from 'rxjs/operators';
import { CryptoCurrentExchangeRateData, CryptoDailyExchangeRateData, CryptoIntradayExchangeRateData } from '../models/exchange-rates.model';
import { CurrentExchangeRate, DailyExchangeRates, IntradayExchangeRates, IntradayTimeSeriesCrypto } from '../api/data-api.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataManagerService {

  private baseCurrency: string = '';
  private currentCrypto: string = '';
  
  private currentExchangeRates: CryptoCurrentExchangeRateData[] = [];
  private currentExchangeRatesSubject: Subject<CryptoCurrentExchangeRateData[]> = new Subject();

  private intradayExchangeRates: CryptoIntradayExchangeRateData = new CryptoIntradayExchangeRateData();
  private intradayExchangeRatesSubject: Subject<CryptoIntradayExchangeRateData> = new Subject();

  private dailyExchangeRates: CryptoDailyExchangeRateData = new CryptoDailyExchangeRateData();
  private dailyExchangeRatesSubject: Subject<CryptoDailyExchangeRateData> = new Subject();

  constructor(private dataApiService: DataApiService, private snackBar: MatSnackBar) {}

  public sendRequestForData(baseCurrency: string = 'USD'): void {
    this.dataApiService.getCurrentExchangeRates(baseCurrency).pipe(
      filter(rate => !!rate),
      take(1)
    ).subscribe(
      (currentExchangeRate: CurrentExchangeRate[]) => {
        this.currentExchangeRates = [];
        currentExchangeRate.forEach(rate => {     
          if (rate['Realtime Currency Exchange Rate']) {
            this.currentExchangeRates.push({
              cryptoCode: rate['Realtime Currency Exchange Rate']['1. From_Currency Code'],
              cryptoName: rate['Realtime Currency Exchange Rate']['2. From_Currency Name'],
              fiatCode: rate['Realtime Currency Exchange Rate']['3. To_Currency Code'],
              exchangeRate: rate['Realtime Currency Exchange Rate']['5. Exchange Rate'].slice(0, -4),
              bidPrice: rate['Realtime Currency Exchange Rate']['8. Bid Price'].slice(0, -4),
              askPrice: rate['Realtime Currency Exchange Rate']['9. Ask Price'].slice(0, -4),
              time: rate['Realtime Currency Exchange Rate']['6. Last Refreshed'] + ' ' + rate['Realtime Currency Exchange Rate']['7. Time Zone'],
            });
          }
        });
        this.currentExchangeRatesSubject.next(this.currentExchangeRates);
      },
      (error: HttpErrorResponse) => {
        this.displayErrorInfo(error);
      }
    );
  }

  private displayErrorInfo(error: HttpErrorResponse) {
    if (error.status === 429) {
      this.snackBar.open(`Error: Too many requests in 1 minute. 
        Due to limited subscription plan of cryptocurrency REST API,
        there is available only 5 request per minute. Sorry for inconvenience.`, undefined, {
        duration: 10000
      });
      return;
    }
    this.snackBar.open(`Error: Unknown error.`, undefined, { duration: 10000 });
  }

  public sendRequestForDetails(cryptoCode: string, baseCurrency: string): void {
    this.dataApiService.getDetailsExchangeRates(cryptoCode, baseCurrency).pipe(
      filter(detailsData => !!detailsData),
    ).subscribe((detailsData: [IntradayExchangeRates, DailyExchangeRates]) => {
      this.parseIntradayExchangeData(detailsData[0]);
      this.parseDailyExchangeData(detailsData[1]);
    },
    (error: HttpErrorResponse) => {
      this.displayErrorInfo(error);
    });
  }

  public setBaseCurrency(currency: string): void {
    this.baseCurrency = currency;
  }

  public setCurrentCrypto(cryptoCode: string): void {
    this.currentCrypto = cryptoCode;
  }

  public getCurrentExchangeRates(): Observable<CryptoCurrentExchangeRateData[]> {
    return this.currentExchangeRatesSubject;
  }

  public getIntradayExchangeRates(): Observable<CryptoIntradayExchangeRateData> {
    return this.intradayExchangeRatesSubject;
  }

  public getDailyExchangeRates(): Observable<CryptoDailyExchangeRateData> {
    return this.dailyExchangeRatesSubject;
  }

  public getBaseCurrency(): string {
    return this.baseCurrency;
  }

  public getCurrentCrypto(): string {
    return this.currentCrypto;
  }

  private parseIntradayExchangeData(intradayData: IntradayExchangeRates): void {
    if(!intradayData['Time Series Crypto (5min)']) { return;}
    for (const [date, intradayValue] of Object.entries(intradayData['Time Series Crypto (5min)'])) {
      this.intradayExchangeRates.dates?.push(date.toString());
      this.intradayExchangeRates.opens?.push(Number(intradayValue['1. open']));
      this.intradayExchangeRates.highs?.push(Number(intradayValue['2. high']));
      this.intradayExchangeRates.lows?.push(Number(intradayValue['3. low']));
      this.intradayExchangeRates.closes?.push(Number(intradayValue['4. close']));
      this.intradayExchangeRates.volumes?.push(Number(intradayValue['5. volume']));
    };
    this.intradayExchangeRates.dates?.reverse();
    this.intradayExchangeRates.opens?.reverse();
    this.intradayExchangeRates.highs?.reverse();
    this.intradayExchangeRates.lows?.reverse();
    this.intradayExchangeRates.closes?.reverse();
    this.intradayExchangeRates.volumes?.reverse();
    this.intradayExchangeRatesSubject.next(this.intradayExchangeRates);
  }

  private parseDailyExchangeData(dailyData: DailyExchangeRates): void { 
    if(!dailyData['Time Series (Digital Currency Daily)']) { return;}
    for (const [date, dailyValue] of Object.entries(dailyData['Time Series (Digital Currency Daily)'])) {
      const dailyFields = Object.keys(Object.entries(dailyData['Time Series (Digital Currency Daily)'])[1][1]);
      this.dailyExchangeRates.dates.push(date.toString());
      this.dailyExchangeRates.opens.push(Number(dailyValue[dailyFields[0]]));
      this.dailyExchangeRates.highs.push(Number(dailyValue[dailyFields[2]]));
      this.dailyExchangeRates.lows.push(Number(dailyValue[dailyFields[4]]));
      this.dailyExchangeRates.closes.push(Number(dailyValue[dailyFields[6]]));
      this.dailyExchangeRates.volumes.push(Number(dailyValue[dailyFields[8]]));
      this.dailyExchangeRates.marketCap.push(Number(dailyValue[dailyFields[9]]));
    };
    this.dailyExchangeRates.dates.reverse();
    this.dailyExchangeRates.opens.reverse();
    this.dailyExchangeRates.highs.reverse();
    this.dailyExchangeRates.lows.reverse();
    this.dailyExchangeRates.closes.reverse();
    this.dailyExchangeRates.volumes.reverse();
    this.dailyExchangeRates.marketCap.reverse();
    this.dailyExchangeRatesSubject.next(this.dailyExchangeRates);
  }
}
