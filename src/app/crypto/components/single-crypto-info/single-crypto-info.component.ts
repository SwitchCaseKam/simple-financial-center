import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataManagerService } from '../../services/data-manager/data-manager.service';
import { CryptoCurrentExchangeRateData } from '../../services/models/exchange-rates.model';

@Component({
  selector: 'app-single-crypto-info',
  templateUrl: './single-crypto-info.component.html',
  styleUrls: ['./single-crypto-info.component.css']
})
export class SingleCryptoInfoComponent implements OnInit {

  @Input() public cryptoInfo: CryptoCurrentExchangeRateData = new CryptoCurrentExchangeRateData();

  constructor(
    private router: Router,
    private dataManagerService: DataManagerService
  ) { }

  public ngOnInit(): void {
  }

  public showDetails(): void {
    this.router.navigate(['crypto', `${this.cryptoInfo.cryptoCode}`]);
    // this.dataManagerService.sendRequestForDetails(this.cryptoInfo.cryptoCode, this.dataManagerService.getBaseCurrency())
  }


}
