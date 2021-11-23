import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiFunctions, apiOptions, HistoricalCurrencyRates, LatestCurrencyRates } from './data-api.model';

@Injectable({
  providedIn: 'root'
})
export class DataApiService {

  private apiUrl = 'https://freecurrencyapi.net/api/v2/';
  private apiKey = '684743f0-46f8-11ec-b194-695d9a347853';

  constructor(private http: HttpClient) { }

  public getLatestCurrencyData(baseCurrency: string = 'USD'): Observable<LatestCurrencyRates> {
    return this.http.get<LatestCurrencyRates>(
      `${this.apiUrl}${apiFunctions.LATEST}?${apiOptions.API_KEY}=${this.apiKey}&${apiOptions.BASE_CURERNCY}=${baseCurrency}`);
  }

  public getHistoricalCurrencyData(baseCurrency: string = 'USD', timeSlotDayes: number = 180): Observable<HistoricalCurrencyRates> {
    const dateFrom = new Date(Date.now()-timeSlotDayes*60*60*24*1000).toISOString().split('T')[0];
    const dateTo = new Date().toISOString().split('T')[0]
    return this.http.get<HistoricalCurrencyRates>(
      `${this.apiUrl}${apiFunctions.HISTORICAL}?${apiOptions.API_KEY}=${this.apiKey}&${apiOptions.BASE_CURERNCY}=${baseCurrency}&${apiOptions.DATE_FROM}=${dateFrom}&${apiOptions.DATE_TO}=${dateTo}`);
  }
}
