import { CardFavoriteStock } from '.'

import { render, screen } from '../../../../tests'

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

const mock = jest.fn()

describe('CardFavoriteStock', () => {

  test('Should add title stock', async () => {
    render(<CardFavoriteStock 
      stock={params}
      onClick={mock}
    />)
    const titleStock = await screen.findByText(
      params['1. symbol']
    )
    expect(titleStock).toBeInTheDocument()
  });

  test('Should add open and close stock', async () => {
    render(<CardFavoriteStock 
      stock={params}
      onClick={mock}
    />)
    const nameStock = await screen.findByText(
      `${params['5. marketOpen']} - ${params['6. marketClose']}`
    )
    expect(nameStock).toBeInTheDocument()
  });

  test('Should add region stock', async () => {
    render(<CardFavoriteStock 
      stock={params}
      onClick={mock}
    />)
    const regionStock = await screen.findByText(
      params['4. region']
    )
    expect(regionStock).toBeInTheDocument()
  });

  test('Should add currency stock', async () => {
    render(<CardFavoriteStock 
      stock={params}
      onClick={mock}
    />)

    const currencyStock = await screen.findAllByText(
      (_, {textContent}: any) => textContent === `(${params['8. currency']})`
    )
    expect(currencyStock[0]).toBeInTheDocument()
  });
})