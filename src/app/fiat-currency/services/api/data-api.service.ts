import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiFunctions, apiOptions, CurrencyRates } from './data-api.model';

@Injectable({
  providedIn: 'root'
})
export class DataApiService {

  private apiUrl = 'https://freecurrencyapi.net/api/v2/';
  private apiKey = 'X';

  constructor(private http: HttpClient) { }

  public getLatestCurrencyData(baseCurrency: string = 'USD'): Observable<CurrencyRates> {
    return this.http.get<CurrencyRates>(
      `${this.apiUrl}${apiFunctions.LATEST}?${apiOptions.API_KEY}=${this.apiKey}&${apiOptions.BASE_CURERNCY}=${baseCurrency}`);
  }
}
