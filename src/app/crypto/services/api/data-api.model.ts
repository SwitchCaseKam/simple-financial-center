export enum apiFunctions {
    FUNCTION = 'function',
    CURRENCY_EXCHANGE_RATE = 'CURRENCY_EXCHANGE_RATE',
    CRYPTO_INTRADAY = 'CRYPTO_INTRADAY',
    DIGITAL_CURRENCY_DAILY = 'DIGITAL_CURRENCY_DAILY',
    DIGITAL_CURRENCY_WEEKLY = 'DIGITAL_CURRENCY_WEEKLY',
    DIGITAL_CURRENCY_MONTHLY = 'DIGITAL_CURRENCY_MONTHLY'
}

export enum exchangeOptions {
    FROM_CURRENCY = 'from_currency',
    TO_CURRENCY = 'to_currency',
    SYMBOL = 'symbol',
    MARKET = 'market',
    INTERVAL = 'interval',
    OUTPUTSIZE = 'outputsize',
    DATATYPE = 'datatype'
}

const enum RealTimeParametrers {
    FROM_CURRENCY_CODE = "1. From_Currency Code",
    FROM_CURRENCY_NAME = "2. From_Currency Name",
    TO_CURRENCY_CODE = "3. To_Currency Code",
    TO_CURRENCY_NAME = "4. To_Currency Name",
    EXCHANGE_RATE = "5. Exchange Rate",
    LAST_REFRESHED = "6. Last Refreshed",
    TIME_ZONE = "7. Time Zone",
    BID_PRICE = "8. Bid Price",
    ASK_PRICE = "9. Ask Price"
}

const enum MetaDataFields {
    INFROMATION = '1. Infromation',
    DIGITAL_CURRENCY_CODE = '2. Digital Currency Code',
    DIGITAL_CURRENCY_NAME = '3. Digital Currency Name',
    MARKET_CODE = '4. Market Code',
    MARKET_NAME = '5. Market Name',
    LAST_REFRESHED = '6. Last Refreshed',
    TIME_ZONE = '7. Time Zone'
}

// CURRENT 

export interface CurrentExchangeRate {
    "Realtime Currency Exchange Rate"?: RealtimeCurrencyExchangeRate
}

export interface RealtimeCurrencyExchangeRate {
    [RealTimeParametrers.FROM_CURRENCY_CODE]: string,
    [RealTimeParametrers.FROM_CURRENCY_NAME]: string,
    [RealTimeParametrers.TO_CURRENCY_CODE]: string,
    [RealTimeParametrers.TO_CURRENCY_NAME]: string,
    [RealTimeParametrers.EXCHANGE_RATE]: string,
    [RealTimeParametrers.LAST_REFRESHED]: string,
    [RealTimeParametrers.TIME_ZONE]: string,
    [RealTimeParametrers.BID_PRICE]: string,
    [RealTimeParametrers.ASK_PRICE]: string,
}

export enum TimeSeriesCryptoFields {
    OPEN = '1. open',
    HIGH = '2. high',
    LOW = '3. low',
    CLOSE = '4. close',
    VOLUME = '5. volume'
}

// META DATA
export interface MetaData {
    [MetaDataFields.INFROMATION]: string,
    [MetaDataFields.DIGITAL_CURRENCY_CODE]: string,
    [MetaDataFields.DIGITAL_CURRENCY_NAME]: string,
    [MetaDataFields.MARKET_CODE]: string,
    [MetaDataFields.MARKET_NAME]: string,
    [MetaDataFields.LAST_REFRESHED]: string,
    [MetaDataFields.TIME_ZONE]: string,
}


// INTRADAY
export interface IntradayExchangeRates {
    "Meta Data": MetaData,
    "Time Series Crypto (5min)": Map<string, IntradayTimeSeriesCrypto>
}

export interface IntradayTimeSeriesCrypto {
    [TimeSeriesCryptoFields.OPEN]: string,
    [TimeSeriesCryptoFields.HIGH]: string,
    [TimeSeriesCryptoFields.LOW]: string,
    [TimeSeriesCryptoFields.CLOSE]: string,
    [TimeSeriesCryptoFields.VOLUME]: number
}




// DAILY
export interface DailyExchangeRates {
    "Meta Data": MetaData,
    "Time Series (Digital Currency Daily)": Map<string, Map<string, string>>
}

