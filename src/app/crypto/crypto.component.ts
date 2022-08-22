import { Component } from '@angular/core';
import { CryptoCurrentExchangeRateData } from './services/models/exchange-rates.model';

@Component({
  selector: 'app-crypto',
  templateUrl: './crypto.component.html',
  styleUrls: ['./crypto.component.css']
})
export class CryptoComponent {

  public cryptoSymbols = ['BTC', 'ETH', 'ADA'];
  public baseCurrency = 'USD';

  public cryptosData: CryptoCurrentExchangeRateData[] = [];

  constructor() {}
}
