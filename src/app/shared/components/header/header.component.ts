import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BaseCurrencyService } from '../../services/base-currency.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() title = 'none';
  public fiatsForm: FormGroup = new FormGroup({});
  public fiatSymobols: string[] = ['USD', 'EUR', 'GBP', 'PLN'];

  private selectedBaseCurrency: string = this.fiatSymobols[0];
  
  constructor(
    private formBuilder: FormBuilder, 
    private baseCurrencyService: BaseCurrencyService
  ) { }

  public ngOnInit(): void {
    this.fiatsForm = this.createFiatsFormGroup();
    this.subscribeToSelectedFiatCurrency();
  }

  private createFiatsFormGroup(): FormGroup {
    let fiatsForm = this.formBuilder.group({
      base: []
    });
    fiatsForm.get('base')?.setValue(this.selectedBaseCurrency);
    return fiatsForm;
  }

  private subscribeToSelectedFiatCurrency(): void {
    this.fiatsForm?.get('base')?.valueChanges.subscribe(
      (selectedFiat: string) => {
        this.baseCurrencyService.setBaseCurrency(selectedFiat);
      }  
    );
  }

}
