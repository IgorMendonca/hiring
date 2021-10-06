import { HomePage } from './'

import { render, screen } from '../../tests'

describe('HomePage', () => {

  test('Should start and display input', () => {
    render(<HomePage />)
    const searchInput = screen.getByPlaceholderText(/Consultar ações/i)
    expect(searchInput).toBeInTheDocument()
  });

  test('Should start with display button', async () => {
    render(<HomePage />)
    const searchButton = screen.getByTestId('button-search')
    expect(searchButton).toBeInTheDocument()
  })
})