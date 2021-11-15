import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { apiFunctions, CurrentExchangeRate, DailyExchangeRates, exchangeOptions, IntradayExchangeRates } from './data-api.model';

@Injectable({
  providedIn: 'root'
})
export class DataApiService {

  private apiUrl = 'https://alpha-vantage.p.rapidapi.com/query';

  constructor(private http: HttpClient) { }

  public getCurrentExchangeRates(baseCurrency: string): Observable<[CurrentExchangeRate, CurrentExchangeRate]> {
    return forkJoin([
      this.createCurrentExchangeRatesRequest('BTC', baseCurrency),
      this.createCurrentExchangeRatesRequest('ETH', baseCurrency)
      ]
    )
  }

  public getDetailsExchangeRates(cryptoCode: string, baseCurrency: string): Observable<[IntradayExchangeRates, DailyExchangeRates]> {
    return forkJoin([
      this.getIntradayExchangeRates(cryptoCode, baseCurrency),
      this.getDailyExchangeRates(cryptoCode, baseCurrency)
      ]
    )
  }

  public getIntradayExchangeRates(cryptoCode: string, baseCurrency: string): Observable<IntradayExchangeRates> {
    return this.createIntradayExchangeRatesRequest(cryptoCode, baseCurrency);
  } 

  public getDailyExchangeRates(cryptoCode: string, baseCurrency: string): Observable<DailyExchangeRates> {
    return this.createDailyExchangeRatesRequest(cryptoCode, baseCurrency);
  } 


  private createCurrentExchangeRatesRequest(cryptoName: string, baseCurrency: string): Observable<CurrentExchangeRate> {
    return this.http.get<CurrentExchangeRate>(`${this.apiUrl}?${apiFunctions.FUNCTION}=${apiFunctions.CURRENCY_EXCHANGE_RATE}&${exchangeOptions.FROM_CURRENCY}=${cryptoName}&${exchangeOptions.TO_CURRENCY}=${baseCurrency}&${exchangeOptions.DATATYPE}=json`
    );
  }

  private createIntradayExchangeRatesRequest(cryptoCode: string, baseCurrency: string): Observable<IntradayExchangeRates> {
    return this.http.get<IntradayExchangeRates>(
      `${this.apiUrl}?${apiFunctions.FUNCTION}=${apiFunctions.CRYPTO_INTRADAY}&${exchangeOptions.SYMBOL}=${cryptoCode}&${exchangeOptions.MARKET}=${baseCurrency}&${exchangeOptions.INTERVAL}=5min&${exchangeOptions.OUTPUTSIZE}=compact&${exchangeOptions.DATATYPE}=json`
      );
  }

  private createDailyExchangeRatesRequest(cryptoCode: string, baseCurrency: string): Observable<DailyExchangeRates> {
    return this.http.get<DailyExchangeRates>(
      `${this.apiUrl}?${apiFunctions.FUNCTION}=${apiFunctions.DIGITAL_CURRENCY_DAILY}&${exchangeOptions.SYMBOL}=${cryptoCode}&${exchangeOptions.MARKET}=${baseCurrency}&${exchangeOptions.DATATYPE}=json`
      );
  } 

}
