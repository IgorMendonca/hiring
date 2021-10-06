import LineChart from '.';

import { act, render, screen } from '../../tests'

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

describe('LineChart', () => {

  test('Should add daily tab in cart', async () => {
    await act(async () => {
      render(<LineChart params={params}/>)
    });
    const dailyTab = await screen.findByText(/Diário/i)
    expect(dailyTab).toBeInTheDocument()
  });

  test('Should add weekly tab in cart', async () => {
    await act(async () => {
      render(<LineChart params={params}/>)
    });
    const weeklyTab = await screen.findByText(/Semanal/i)
    expect(weeklyTab).toBeInTheDocument()
  });

  test('Should add monthly tab in cart', async () => {
    await act(async () => {
      render(<LineChart params={params}/>)    
    });

    const monthlyTab = await screen.findByText(/Mensal/i)
    expect(monthlyTab).toBeInTheDocument()
  });
})