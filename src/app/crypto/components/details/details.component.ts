import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, zip } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { BaseCurrencyService } from 'src/app/shared/services/base-currency.service';
import { DataManagerService } from '../../services/data-manager/data-manager.service';
import { CryptoDailyExchangeRateData, CryptoIntradayExchangeRateData } from '../../services/models/exchange-rates.model';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit, OnDestroy {

  public intradayData: CryptoIntradayExchangeRateData = new CryptoIntradayExchangeRateData();
  public dailyData: CryptoDailyExchangeRateData = new CryptoDailyExchangeRateData();
  private detailsSubscription: Subscription = new Subscription();

  constructor(
    private activatedRoute: ActivatedRoute,
    private dataManagerService: DataManagerService,
    private baseCurrencyService: BaseCurrencyService
  ) {
    this.activatedRoute.params.subscribe(
      data => {console.log(data);}
    );
  }

  public ngOnInit(): void {
    this.detailsSubscription = this.baseCurrencyService.getBaseCurrencySubject().pipe(
      tap((baseCurrency: string) => this.dataManagerService.sendRequestForDetails(this.dataManagerService.getCurrentCrypto(), baseCurrency)),
      switchMap(() => zip(
        this.dataManagerService.getIntradayExchangeRates(),
        this.dataManagerService.getDailyExchangeRates())),
    ).subscribe(
      (cryptoData: [CryptoIntradayExchangeRateData, CryptoDailyExchangeRateData]) => {
        this.intradayData = cryptoData[0];
        this.dailyData = cryptoData[1];
      }
    );
  }

  public ngOnDestroy(): void {
    this.detailsSubscription.unsubscribe();
  }

}
