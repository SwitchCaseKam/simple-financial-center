export class FiatCurrencyData {
    symbol: string;
    value: number;

    constructor(symbol: string = '', value: number = 0) {
        this.symbol = symbol;
        this.value = value;

    }
}

export class FiatCurrencyHistoricalData {
    symbol: string;
    dates: string[];
    values: number[];

    constructor(symbol: string = '', dates: string[] = [], values: number[] = []) {
        this.symbol = symbol;
        this.dates = dates;
        this.values = values;
    }
}