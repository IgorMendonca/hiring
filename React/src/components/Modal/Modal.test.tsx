import { Modal } from './'

import { act, fireEvent, render, screen } from '../../tests'

const filterStock = 'apple'
const mock = jest.fn()

describe('<Modal />', () => {

  test('Should display title', async () => {
    await act(async () => {
      render(
        <Modal 
          id='modal' 
          filterStock={filterStock}
          onClose={mock} 
          handleCardClick={() => {}}
        />
      )
    });
    
    const title = await screen.findByText(/Buscar ações/i)
    expect(title).toBeInTheDocument()
  });

  test('Should start and display input', async () => {
    await act(async () => {
      render(
        <Modal 
          id='modal' 
          filterStock={filterStock}
          onClose={mock} 
          handleCardClick={() => {}}
        />
      )
    });
    
    const filterInput = await screen.findByPlaceholderText(/Filtrar/i)
    expect(filterInput).toBeInTheDocument()
  });

  test('Should start with display button', async () => {
    await act(async () => {
      render(
        <Modal 
          id='modal' 
          filterStock={filterStock}
          onClose={mock} 
          handleCardClick={() => {}}
        />
      )
    });
    
    const searchButton = await screen.findByTestId('button-filter')
    expect(searchButton).toBeInTheDocument()
  })

  test('Should close modal when button click', async () => {
    await act(async () => {
      render(
        <Modal 
          id='modal' 
          filterStock={filterStock}
          onClose={mock} 
          handleCardClick={() => {}}
        />
      )
    });
    
    const closeButton = await screen.findByTestId('button-close')

    await act(async () => {
      fireEvent.click(closeButton);
    });

    expect(mock).toHaveBeenCalled()
  })
})