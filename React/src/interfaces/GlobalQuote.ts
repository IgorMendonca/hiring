export interface globalQuote {
  "Global Quote": globalQuoteProps
  Note?: string
}

export interface globalQuoteProps {
  "01. symbol": string,
  "02. open": string,
  "03. high": string,
  "04. low": string,
  "05. price": string,
  "06. volume": string,
  "07. latest trading day": string,
  "08. previous close": string,
  "09. change": string,
  "10. change percent": string
}