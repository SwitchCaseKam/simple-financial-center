export class FiatCurrencyData {
    symbol: string;
    value: number;
    historicalValues: [string[], number[]];

    constructor(symbol: string = '', value: number = 0, historicalValues: [string[], number[]] = [[],[]]) {
        this.symbol = symbol;
        this.value = value;
        this.historicalValues = historicalValues;
    }
}