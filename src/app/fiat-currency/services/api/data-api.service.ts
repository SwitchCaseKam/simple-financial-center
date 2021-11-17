import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiFunctions, apiOptions, HistoricalCurrencyRates, LatestCurrencyRates } from './data-api.model';

@Injectable({
  providedIn: 'root'
})
export class DataApiService {

  private apiUrl = 'https://freecurrencyapi.net/api/v2/';
  private apiKey = 'X';

  constructor(private http: HttpClient) { }

  public getLatestCurrencyData(baseCurrency: string = 'USD'): Observable<LatestCurrencyRates> {
    return this.http.get<LatestCurrencyRates>(
      `${this.apiUrl}${apiFunctions.LATEST}?${apiOptions.API_KEY}=${this.apiKey}&${apiOptions.BASE_CURERNCY}=${baseCurrency}`);
  }

  public getHistoricalCurrencyData(baseCurrency: string = 'USD', dateFrom: string = new Date(Date.now()-7*60*60*24*1000).toISOString().split('T')[0], dateTo: string = new Date().toISOString().split('T')[0]): Observable<HistoricalCurrencyRates> {
    return this.http.get<HistoricalCurrencyRates>(
      `${this.apiUrl}${apiFunctions.HISTORICAL}?${apiOptions.API_KEY}=${this.apiKey}&${apiOptions.BASE_CURERNCY}=${baseCurrency}&${apiOptions.DATE_FROM}=${dateFrom}&${apiOptions.DATE_TO}=${dateTo}`);
  }
}
