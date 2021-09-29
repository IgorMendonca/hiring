import { Header } from "../../components/Header";
import { Container, FilterInput, Page, SearchButton, SearchStock, SearchStockContainer, SearchStockContent, TextFieldInput } from "./styles";
import { BsSearch } from 'react-icons/bs'
import { ChangeEvent, useCallback, useState } from "react";
import { Modal } from "../../components/Modal";

export function HomePage() {
  const [isVisibleModal, setIsVisibleModal] = useState(false)
  const [filterStock, setFilterStock] = useState('')

  const handleSearchStockMarket = useCallback(() => {
    
    setIsVisibleModal(true)
  }, [])

  const submitButtonInput = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    if(e.key === 'Enter') {
      handleSearchStockMarket()
    }
  }, [handleSearchStockMarket])

  return (
    <>
      { 
        isVisibleModal && 
        <Modal 
          id="modal"
          onClose={() => setIsVisibleModal(false)}
        >
          <FilterInput 
            type="text"
            placeholder="Filtrar"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setFilterStock(e.target.value)
            }}
            value={filterStock}
          />
        </Modal> 
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
                  onKeyPress={submitButtonInput}
                />
                <SearchButton 
                  onClick={handleSearchStockMarket}
                >
                  <BsSearch size={25}/>
                </SearchButton>
              </SearchStock>
            </SearchStockContent>
          </SearchStockContainer>
        </Container>
      </Page>
    </>
  )
}