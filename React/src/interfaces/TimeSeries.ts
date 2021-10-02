export interface TimeSeriesDaily {
  "Meta Data": {
    "1. Information": string,
    "2. Symbol": string,
    "3. Last Refreshed": string,
    "4. Output Size": string,
    "5. Time Zone": string
  },
  "Time Series (Daily)": TimeSeriesDailyItem
}

export interface TimeSeriesDailyItem {
  [date: string]: {
    "1. open": string,
    "2. high": string,
    "3. low": string,
    "4. close": string,
    "5. volume": string
  }
}

export interface TimeSeriesWeekly {
  "Meta Data": {
    "1. Information": string,
    "2. Symbol": string,
    "3. Last Refreshed": string,
    "4. Time Zone": string
  },
  "Weekly Time Series": TimeSeriesWeeklyItem
}

export interface TimeSeriesWeeklyItem {
  [date: string]: {
    "1. open": string,
    "2. high": string,
    "3. low": string,
    "4. close": string,
    "5. volume": string
  }
}

export interface TimeSeriesMonthly {
  "Meta Data": {
    "1. Information": string,
    "2. Symbol": string,
    "3. Last Refreshed": string,
    "4. Time Zone": string
  },
  "Monthly Time Series": TimeSeriesMonthlyItem
}

export interface TimeSeriesMonthlyItem {
  [date: string]: {
    "1. open": string,
    "2. high": string,
    "3. low": string,
    "4. close": string,
    "5. volume": string
  }
}