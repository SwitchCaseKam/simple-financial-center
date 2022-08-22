import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, zip } from 'rxjs';
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
  private cryptoCode: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private dataManagerService: DataManagerService,
  ) {
    this.activatedRoute.params.subscribe(
      data => { this.cryptoCode = data.cryptoCode;}
    );
  }

  public ngOnInit(): void {
    this.dataManagerService.sendRequestForDetails(this.cryptoCode, 'USD');
    this.detailsSubscription = zip(
        this.dataManagerService.getIntradayExchangeRates(),
        this.dataManagerService.getDailyExchangeRates()
    ).subscribe(
      (cryptoData: [CryptoIntradayExchangeRateData, CryptoDailyExchangeRateData]) => {
        console.log(cryptoData)
        this.intradayData = cryptoData[0];
        this.dailyData = cryptoData[1];
      }
    );
  }

  public ngOnDestroy(): void {
    this.detailsSubscription.unsubscribe();
  }

}
