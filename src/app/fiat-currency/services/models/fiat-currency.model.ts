export class FiatCurrencyData {
    symbol: string;
    value: number;

    constructor(symbol: string = '', value: number = 0) {
        this.symbol = symbol;
        this.value = value;
    }
}