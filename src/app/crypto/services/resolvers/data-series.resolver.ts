import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { forkJoin, Observable, of } from 'rxjs';
import { DailyExchangeRates, IntradayExchangeRates } from '../api/data-api.model';
import { DataApiService } from '../api/data-api.service';
import { DataManagerService } from '../data-manager/data-manager.service';
import { CryptoDailyExchangeRateData, CryptoIntradayExchangeRateData } from '../models/exchange-rates.model';

@Injectable({
  providedIn: 'root'
})
export class DataSeriesResolver implements Resolve<[CryptoIntradayExchangeRateData, CryptoDailyExchangeRateData]> {

  constructor(private dataManagerService: DataManagerService, private dataApiService: DataApiService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<[CryptoIntradayExchangeRateData, CryptoDailyExchangeRateData]> {
    this.dataManagerService.sendRequestForDetails('BTC', this.dataManagerService.getBaseCurrency())
    return forkJoin([
      this.dataManagerService.getIntradayExchangeRates(),
      this.dataManagerService.getDailyExchangeRates(),
    ]);

  }

}
