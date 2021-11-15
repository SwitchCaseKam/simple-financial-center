import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataManagerService } from '../services/data-manager/data-manager.service';
import { CryptoDailyExchangeRateData, CryptoIntradayExchangeRateData } from '../services/models/exchange-rates.model';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  public intradayData: CryptoIntradayExchangeRateData = new CryptoIntradayExchangeRateData();
  public dailyData: CryptoDailyExchangeRateData = new CryptoDailyExchangeRateData();

  constructor(
    private activatedRoute: ActivatedRoute,
    private dataManagerService: DataManagerService
  ) {
    this.activatedRoute.params.subscribe(
      data => {console.log(data);}
    );

  }

  public ngOnInit(): void {
    this.dataManagerService.sendRequestForDetails('BTC', this.dataManagerService.getBaseCurrency())
    this.dataManagerService.getIntradayExchangeRates().subscribe(
      (intradayData: CryptoIntradayExchangeRateData) => {this.intradayData = intradayData;}
    );
    this.dataManagerService.getDailyExchangeRates().subscribe(
      (dailyData: CryptoDailyExchangeRateData) => { this.dailyData = dailyData;}
    );
  }

}
