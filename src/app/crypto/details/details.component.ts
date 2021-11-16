import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { BaseCurrencyService } from 'src/app/shared/services/base-currency.service';
import { DataManagerService } from '../services/data-manager/data-manager.service';
import { CryptoDailyExchangeRateData, CryptoIntradayExchangeRateData } from '../services/models/exchange-rates.model';

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
    this.detailsSubscription = this.baseCurrencyService.getBaseCurrency().subscribe(
      (baseCurrency: string) =>this.dataManagerService.sendRequestForDetails(this.dataManagerService.getCurrentCrypto(), baseCurrency)
    );
    
    this.dataManagerService.getIntradayExchangeRates().subscribe(
      (intradayData: CryptoIntradayExchangeRateData) => {this.intradayData = intradayData;}
    );
    this.dataManagerService.getDailyExchangeRates().subscribe(
      (dailyData: CryptoDailyExchangeRateData) => { this.dailyData = dailyData;}
    );
  }

  public ngOnDestroy(): void {
    this.detailsSubscription.unsubscribe();
  }

}
