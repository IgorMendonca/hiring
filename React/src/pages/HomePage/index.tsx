import { Header } from "../../components/Header";
import { Container, Page, SearchButton, SearchStock, SearchStockContainer, SearchStockContent, TextFieldInput } from "./styles";
import { BsSearch } from 'react-icons/bs'

export function HomePage() {
  return (
    <Page>
      <Container>
        <Header />
        <SearchStockContainer>
          <SearchStockContent>
            <SearchStock>
              <TextFieldInput 
                placeholder="Consultar ações"
              />
              <SearchButton >
                <BsSearch size={25}/>
              </SearchButton>
            </SearchStock>
          </SearchStockContent>
        </SearchStockContainer>
      </Container>
    </Page>
  )
}