import { Header } from "../../components/Header";
import { Container, Home, Page, SearchButton, SearchStock, SearchStockContainer, SearchStockContent, TextFieldInput } from "./styles";
import { BsSearch } from 'react-icons/bs'
import { ChangeEvent, useCallback, useState } from "react";
import { Modal } from "../../components/Modal";
import { SearchEndpointStockItem } from "../../interfaces/SearchEndpointData";
import { useHistory } from "react-router";

export function HomePage() {
  const page = '/'

  const history = useHistory()

  const [isVisibleModal, setIsVisibleModal] = useState(false)
  const [filterStock, setFilterStock] = useState('')

  const handleClickInCardStock = useCallback((item: SearchEndpointStockItem) => {
    history.push(`/stock/${item["1. symbol"]}`, {
      params: { params: item, page }
    })
  }, [history])

  const submitButtonInput = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    if(e.key === 'Enter') {
      setIsVisibleModal(true)
    }
  }, [])

  return (
    <Home
      data-testid='home-test'
    >
      { 
        isVisibleModal && 
        <Modal
          data-testid='modal-test'
          handleCardClick={(item) => handleClickInCardStock(item)}
          filterStock={filterStock || 'apple'}
          id="modal"
          onClose={() => setIsVisibleModal(false)}
        />
      }
      <Page>
        <Container>
          <Header />
          <SearchStockContainer>
            <SearchStockContent>
              <SearchStock>
                <TextFieldInput 
                  type="text"
                  placeholder="Consultar ações"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setFilterStock(e.target.value)
                  }}
                  value={filterStock}
                  onKeyPress={(e) => submitButtonInput(e)}
                />
                <SearchButton 
                  data-testid='button-search'
                  onClick={() => setIsVisibleModal(true)}
                >
                  <BsSearch size={25}/>
                </SearchButton>
              </SearchStock>
            </SearchStockContent>
          </SearchStockContainer>
        </Container>
      </Page>
    </Home>
  )
}