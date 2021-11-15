import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
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

  constructor(private dataCacheManager: DataManagerService) {}

  public ngOnInit(): void {
    console.log('CRYPTO COMPONENT ON INIT')
    this.dataCacheManager.sendRequestForData();
    this.cryptoDataSubscription = this.dataCacheManager.getCurrentExchangeRates().subscribe(
      (cryptosData: CryptoCurrentExchangeRateData[]) => {
        console.log(cryptosData);
        this.cryptosData = cryptosData;
      }
    )
  }

  public ngOnDestroy(): void {
    console.log('CRYPTO COMPONENT ON DESTROY');
    this.cryptoDataSubscription.unsubscribe();
  }

}
