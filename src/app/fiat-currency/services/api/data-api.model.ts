export enum apiFunctions {
    LATEST = 'latest',
    HISTORICAL = 'historical'
}

export enum apiOptions {
    API_KEY = 'apikey',
    BASE_CURERNCY = 'base_currency',
    DATE_FROM = 'date_from',
    DATE_TO = 'date_to'
}

interface QueryDetails {
    apiKey: string,
    timestamp: number;
    base_currency: string;
    date_from?: string;
    date_to?: string;
}

// Latest
export interface LatestCurrencyRates {
    query: QueryDetails,
    data: Map<string, number>
}

// Historical
export interface HistoricalCurrencyRates {
    query: QueryDetails,
    data: Map<string, Map<string, number>>
}