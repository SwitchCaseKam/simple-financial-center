import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseCurrencyService {


  private baseCurrency: string = 'USD'
  private baseCurrencySubject: BehaviorSubject<string> = new BehaviorSubject(this.baseCurrency);

  constructor() { }

  public setBaseCurrency(base: string): void {
    this.baseCurrency = base;
    this.baseCurrencySubject.next(this.baseCurrency);
  }

  public getBaseCurrency(): Observable<string> {
    return this.baseCurrencySubject;
  }


}
