import { Header } from "../../components/Header";
import { Container, Page, SearchButton, SearchStock, SearchStockContainer, SearchStockContent, TextFieldInput } from "./styles";
import { BsSearch } from 'react-icons/bs'
import { ChangeEvent, useCallback, useState } from "react";
import { Modal } from "../../components/Modal";
import { SearchEndpointStockItem } from "../../interfaces/SearchEndpointData";
import { useHistory } from "react-router";

export function HomePage() {
  /**
   * hooks
   */

  const history = useHistory()

  /**
   * states
   */

  const [isVisibleModal, setIsVisibleModal] = useState(false)
  const [filterStock, setFilterStock] = useState('')

  /**
   * handles
   */

  const handleClickInCardStock = useCallback((item: SearchEndpointStockItem) => {
    history.push(`/stock/${item["1. symbol"]}`, {
      params: item
    })
  }, [history])

  const submitButtonInput = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    if(e.key === 'Enter') {
      setIsVisibleModal(true)
    }
  }, [])

  return (
    <>
      { 
        isVisibleModal && 
        <Modal 
          handleCardClick={(item) => handleClickInCardStock(item)}
          filterStock={filterStock}
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
                  onClick={() => setIsVisibleModal(true)}
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