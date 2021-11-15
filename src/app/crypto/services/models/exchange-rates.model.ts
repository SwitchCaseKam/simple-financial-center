export class CryptoCurrentExchangeRateData {
    cryptoCode: string;
    cryptoName: string;
    fiatCode: string;
    exchangeRate: string;
    bidPrice: string;
    askPrice: string;
    time: string;

    constructor(cryptoCode: string = '', cryptoName: string = '', fiatCode: string = '', exchangeRate: string = '', bidPrice: string = '', askPrice: string = '', time: string = '') {
        this.cryptoCode = cryptoCode;
        this.cryptoName = cryptoName;
        this.fiatCode = fiatCode;
        this.exchangeRate = exchangeRate;
        this.bidPrice = bidPrice;
        this.askPrice = askPrice;
        this.time = time;
    }
}

export class CryptoIntradayExchangeRateData {
    dates: string[];
    opens: number[];
    highs: number[];
    lows: number[];
    closes: number[];
    volumes: number[];

    constructor(dates: string[] = [], opens: number[] = [], highs: number[] = [], lows: number[] = [], closes: number[] = [], volumes: number[] = []) {
        this.dates = dates;
        this.opens = opens;
        this.highs = highs;
        this.lows = lows;
        this.closes = closes;
        this.volumes = volumes;
    }
}

export class CryptoDailyExchangeRateData {
    dates: string[];
    opens: number[];
    highs: number[];
    lows: number[];
    closes: number[];
    volumes: number[];
    marketCap: number[];

    constructor(dates: string[] = [], opens: number[] = [], highs: number[] = [], lows: number[] = [], closes: number[] = [], volumes: number[] = [], marketCap: number[] = []) {
        this.dates = dates;
        this.opens = opens;
        this.highs = highs;
        this.lows = lows;
        this.closes = closes;
        this.volumes = volumes;
        this.marketCap = marketCap;
    }
}