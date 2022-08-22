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

  @Input() public cryptoCode: string = '';
  @Input() public baseCurrency: string = '';
  public cryptoInfo: CryptoCurrentExchangeRateData = new CryptoCurrentExchangeRateData();
  public errorMessage = '';

  constructor(
    private router: Router,
    private dataManagerService: DataManagerService
  ) { }

  public ngOnInit(): void {
    this.dataManagerService.sendRequestForData(this.cryptoCode, this.baseCurrency);
    this.dataManagerService.getCurrentExchangeRates().subscribe(allCryptoData => {
      this.errorMessage = '';
      const cryptoData = allCryptoData.get(this.cryptoCode);
      if(cryptoData) { this.cryptoInfo = cryptoData; }
    });
  }

  public showDetails(): void {
    this.router.navigate(['crypto', `${this.cryptoInfo.cryptoCode}`]);
    // this.dataManagerService.setCurrentCrypto(this.cryptoInfo.cryptoCode);
    // this.dataManagerService.sendRequestForData(this.name, this.baseCurrency);
    // this.dataManagerService.sendRequestForDetails(this.cryptoInfo.cryptoCode, this.dataManagerService.getBaseCurrency())
  }


}
