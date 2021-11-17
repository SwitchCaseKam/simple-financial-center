import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FiatCurrencyData } from '../../services/models/fiat-currency.model';

@Component({
  selector: 'app-single-fiat-info',
  templateUrl: './single-fiat-info.component.html',
  styleUrls: ['./single-fiat-info.component.css']
})
export class SingleFiatInfoComponent implements OnInit {

  @Input() public fiatInfo: FiatCurrencyData = new FiatCurrencyData();

  constructor(private router: Router) { }

  public ngOnInit(): void {
  }

  public showDetails(): void {
    this.router.navigate(['fiat', `${this.fiatInfo.symbol}`]);
    // this.dataManagerService.setCurrentCrypto(this.cryptoInfo.cryptoCode);
    // this.dataManagerService.sendRequestForDetails(this.cryptoInfo.cryptoCode, this.dataManagerService.getBaseCurrency())
  }

}
