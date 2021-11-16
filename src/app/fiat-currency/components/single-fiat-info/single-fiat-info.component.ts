import { Component, Input, OnInit } from '@angular/core';
import { FiatCurrencyData } from '../../services/models/fiat-currency.model';

@Component({
  selector: 'app-single-fiat-info',
  templateUrl: './single-fiat-info.component.html',
  styleUrls: ['./single-fiat-info.component.css']
})
export class SingleFiatInfoComponent implements OnInit {

  @Input() public fiatInfo: FiatCurrencyData = new FiatCurrencyData();

  constructor() { }

  public ngOnInit(): void {
  }

}
