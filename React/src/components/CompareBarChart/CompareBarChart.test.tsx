import CompareBarChart from '.'
import { GlobalQuoteContext } from '../../contexts/GlobalQuoteContext'

import { act, fireEvent, render, screen } from '../../tests'

const stocksCompare = {
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

const mock = jest.fn()

const customRender = (ui: any) => {
  return render(
    <GlobalQuoteContext.Provider value={{globalQuote: stocksCompare, setGlobalQuoteFunc(providerProps){}}}>
      {ui}
    </GlobalQuoteContext.Provider>
  )
}


describe('CompareBarChart', () => {

  test('Should add text compare', async () => {
    customRender(
    <CompareBarChart 
      callModal={() => {}}
      stocksCompare={[stocksCompare]}
      removeItemToCompare={() => {}}
    />)
    const text = await screen.findByText(/Comparar/i)
    expect(text).toBeInTheDocument()
  });

  test('Should add home button', async () => {
    customRender(
    <CompareBarChart 
      callModal={mock}
      stocksCompare={[stocksCompare]}
      removeItemToCompare={() => {}}
    />)
    const compareButton = await screen.findByTestId('compare-button')
    expect(compareButton).toBeInTheDocument()

    await act(async () => {
      fireEvent.click(compareButton);
    });

    expect(mock).toHaveBeenCalled()
  });
})