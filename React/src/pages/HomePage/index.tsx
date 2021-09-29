import { Header } from "../../components/Header";
import { Container, Page, SearchButton, SearchStock, SearchStockContainer, SearchStockContent, TextFieldInput } from "./styles";
import { BsSearch } from 'react-icons/bs'
import { useState } from "react";
import { Modal } from "../../components/Modal";

export function HomePage() {

  const [isVisibleModal, setIsVisibleModal] = useState(false)

  return (
    <>
      { 
        isVisibleModal && 
        <Modal 
          onClose={() => setIsVisibleModal(false)}
        >
          teste
        </Modal> 
      }
      <Page>
        <Container>
          <Header />
          <SearchStockContainer>
            <SearchStockContent>
              <SearchStock>
                <TextFieldInput 
                  placeholder="Consultar ações"
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