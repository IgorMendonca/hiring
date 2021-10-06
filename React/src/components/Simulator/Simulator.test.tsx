import Simulator from '.' 

import { render, screen } from '../../tests'

describe('<Simulator />', () => {

  test('Should add text simulator', async () => {
    render(<Simulator />)
    const simulator = await screen.findByText(/Simulador:/i)
    expect(simulator).toBeInTheDocument()
  });

  test('Should add input number of purchase', async () => {
    render(<Simulator />)
    const numberPurchaseInput = await screen.findByPlaceholderText(/Quantidade da compra/i)
    expect(numberPurchaseInput).toBeInTheDocument()
  });

  test('Should add calc button', async () => {
    render(<Simulator />)
    const calcButton = await screen.findByText(/CALCULAR/i)
    expect(calcButton).toBeInTheDocument()
  });
})