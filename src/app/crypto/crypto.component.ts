import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { BaseCurrencyService } from '../shared/services/base-currency.service';
import { DataManagerService } from './services/data-manager/data-manager.service';
import { CryptoCurrentExchangeRateData } from './services/models/exchange-rates.model';

@Component({
  selector: 'app-crypto',
  templateUrl: './crypto.component.html',
  styleUrls: ['./crypto.component.css']
})
export class CryptoComponent implements OnInit, OnDestroy {

  public cryptosData: CryptoCurrentExchangeRateData[] = [];
  private cryptoDataSubscription: Subscription = new Subscription();
  private baseCurrencySubscription: Subscription = new Subscription();

  constructor(
    private dataManager: DataManagerService,
    private baseCurrencyService: BaseCurrencyService
  ) {}

  public ngOnInit(): void {
    this.baseCurrencySubscription = this.baseCurrencyService.getBaseCurrencySubject().subscribe(
      (baseCurrency: string) => this.dataManager.sendRequestForData(baseCurrency)
    );

    this.cryptoDataSubscription = this.dataManager.getCurrentExchangeRates().subscribe(
      (cryptosData: CryptoCurrentExchangeRateData[]) => {
        this.cryptosData = cryptosData;
      }
    )
  }

  public ngOnDestroy(): void {
    console.log('crypto on destroy')
    this.cryptoDataSubscription.unsubscribe();
    this.baseCurrencySubscription.unsubscribe();
  }

}
