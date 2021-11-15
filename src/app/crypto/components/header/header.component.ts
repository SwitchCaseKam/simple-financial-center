import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { fiatSymobols } from '../../models/common.models';
import { DataManagerService } from '../../services/data-manager/data-manager.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public fiatsForm: FormGroup = new FormGroup({});
  private selectedBase: string = fiatSymobols[0];

  constructor(
    private formBuilder: FormBuilder, 
    private dataManagerService: DataManagerService
  ) {}

  ngOnInit(): void {
    this.fiatsForm = this.createFiatsFormGroup();
    this.dataManagerService.setBaseCurrency(this.selectedBase);
    this.subscribeToSelectedFiatCurrency();
  }

  public getFiatsSymbols(): string[] {
    return fiatSymobols;
  }

  private createFiatsFormGroup(): FormGroup {
    let fiatsForm = this.formBuilder.group({
      base: []
    });
    fiatsForm.get('base')?.setValue(this.selectedBase);
    return fiatsForm;
  }  
  

  private subscribeToSelectedFiatCurrency(): void {
    this.fiatsForm?.get('base')?.valueChanges.subscribe(
      (selectedFiat: string) => { 
        this.dataManagerService.sendRequestForData(selectedFiat);
        this.dataManagerService.setBaseCurrency(selectedFiat);
      }  
    );
  }

}
