import CardStockInfo from '.'
import { GlobalQuoteContext } from '../../../../contexts/GlobalQuoteContext'

import { act, fireEvent, render, screen } from '../../../../tests'
import { formatPrice } from '../../../../util/format'

const mock = jest.fn()

const params = {
  '1. symbol': 'TestSymbol',
  '2. name': 'TestName',
  '3. type': 'TestType',
  '4. region': 'TestRegion',
  '5. marketOpen': 'TestMarketOpen',
  '6. marketClose': 'TestMarketClose',
  '7. timezone': 'TestTimezone',
  '8. currency': 'USD',
  '9. matchScore': 'TestMatchScore'
}

const providerProps = {
  "Global Quote": {
    "01. symbol": 'TestSymbol',
    "02. open": '25.00',
    "03. high": '30.00',
    "04. low": '15.00',
    "05. price": '20.00',
    "06. volume": '123',
    "07. latest trading day": '2020-20-20',
    "08. previous close": 'test',
    "09. change": 'teste',
    "10. change percent": '5.00'
  }
}

const customRender = (ui: any) => {
  return render(
    <GlobalQuoteContext.Provider value={{globalQuote: providerProps, setGlobalQuoteFunc(providerProps){}}}>
      {ui}
    </GlobalQuoteContext.Provider>
  )
}

describe('<CardStockInfo />', () => {

  test('Should display title', async () => {
    customRender(<CardStockInfo 
      params={params}
      favorites={[params]}
      handleClick={mock}
    /> 
    )
    const title = await screen.findByText(params['1. symbol'])
    expect(title).toBeInTheDocument()
  });

  test('Should add low price in document', async () => {
    customRender(<CardStockInfo 
      params={params}
      favorites={[params]}
      handleClick={mock}
    /> 
    )

    const valueFormatted = formatPrice(
      providerProps['Global Quote']['04. low'] || 0, params['8. currency']
    )

    const lowPrice = await screen.findAllByText(
      (_, {textContent}: any) => textContent === valueFormatted
    )
    expect(lowPrice[0]).toBeInTheDocument()
    expect(lowPrice[0]).toHaveStyle({color: '#008000'})
  }) 

  test('Should add price in document', async () => {
    customRender(<CardStockInfo 
      params={params}
      favorites={[params]}
      handleClick={mock}
    /> 
    )

    const valueFormatted = formatPrice(
      providerProps['Global Quote']['05. price'] || 0, params['8. currency']
    )

    const price = await screen.findAllByText(
      (_, {textContent}: any) => textContent === valueFormatted
    )
    expect(price[0]).toBeInTheDocument()
    expect(price[0]).toHaveStyle({color: '#29292e'})
  }) 

  test('Should add high price in document', async () => {
    customRender(<CardStockInfo 
      params={params}
      favorites={[params]}
      handleClick={mock}
    /> 
    )

    const valueFormatted = formatPrice(
      providerProps['Global Quote']['03. high']|| 0, params['8. currency']
    )

    const highPrice = await screen.findAllByText(
      (_, {textContent}: any) => textContent === valueFormatted
    )
    expect(highPrice[0]).toBeInTheDocument()
    expect(highPrice[0]).toHaveStyle({color: '#FF0000'})
  }) 

  test('Should add span latest trading day', async () => {
    customRender(<CardStockInfo 
      params={params}
      favorites={[params]}
      handleClick={mock}
    /> 
    )
    const title = await screen.findByText(/Última negociação/i)
    expect(title).toBeInTheDocument()
  });

  test('Should add latest trading day info', async () => {
    customRender(<CardStockInfo 
      params={params}
      favorites={[params]}
      handleClick={mock}
    /> 
    )

    const latestTradingDay = await screen.findByText(
      providerProps['Global Quote']['07. latest trading day']
    )
    expect(latestTradingDay).toBeInTheDocument()
  });

  test('Should change text on button click', async () => {
    customRender(<CardStockInfo 
      params={params}
      favorites={[params]}
      handleClick={mock}
    /> 
    )

    const buttonPortfolio = await screen.findByTestId(/portfolio-button/i)
    expect(buttonPortfolio).toBeInTheDocument()

    await act(async () => {
      fireEvent.click(buttonPortfolio);
    });

    expect(mock).toHaveBeenCalled()
  });
})