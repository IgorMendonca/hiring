import CardVariationPercent from '.'
import { GlobalQuoteContext } from '../../../../contexts/GlobalQuoteContext'

import { render, screen } from '../../../../tests'

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

jest.mock('react-chartjs-2', () => ({
  Doughnut: () => null,
}))

const customRender = (ui: any) => {
  return render(
    <GlobalQuoteContext.Provider value={{globalQuote: providerProps, setGlobalQuoteFunc(providerProps){}}}>
      {ui}
    </GlobalQuoteContext.Provider>
  )
}


describe('CardVariationPercent', () => {

  test('Should add variation info', async () => {
    customRender(<CardVariationPercent />)
    const title = await screen.findByText(/Variação/i)
    expect(title).toBeInTheDocument()
  });
})