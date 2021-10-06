import { Header } from './'

import { render, screen } from '../../tests'

describe('Header', () => {

  test('Should add home button', () => {
    render(<Header />)
    const homeButton = screen.getByTestId('home-button')
    expect(homeButton).toBeInTheDocument()
  });

  test('Should add portfolio button', async () => {
    render(<Header />)
    const portfolioButton = screen.getByText(/Portfólio/i)
    expect(portfolioButton).toBeInTheDocument()
  })
})