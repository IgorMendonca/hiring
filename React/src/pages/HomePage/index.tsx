import { Header } from "../../components/Header";
import { Container, Content, ContentStock, FilterContainer, FilterInput, Page, SearchButton, SearchFilterButton, SearchStock, SearchStockContainer, SearchStockContent, TextFieldInput } from "./styles";
import { BsSearch } from 'react-icons/bs'
import { ChangeEvent, useCallback, useState } from "react";
import { Modal } from "../../components/Modal";
import api from "../../services/api";
import { SearchEndpointData, SearchEndpointStockItem } from "../../interfaces/SearchEndpointData";
import { toast } from "react-toastify";
import CardStock from "./components/CardStock";
import { useHistory } from "react-router";

export function HomePage() {
  /**
   * hooks
   */

  const history = useHistory()

  /**
   * consts
   */

  const BEST_MATCHES = {
    bestMatches: []
  } as SearchEndpointData

  /**
   * states
   */
  const [loading, setLoading] = useState(false)
  const [isVisibleModal, setIsVisibleModal] = useState(false)
  const [filterStock, setFilterStock] = useState('')
  const [
    bestMatchesStockResult,
    setBestMatchesStockResult
  ] = useState<SearchEndpointData>(BEST_MATCHES)

  /**
   * handles
   */

  const handleClickInCardStock = useCallback((item: SearchEndpointStockItem) => {
    history.push(`/stock/${item["1. symbol"]}`, {
      params: item
    })
  }, [history])

  const handleSearchStockMarket = useCallback( async () => {
    try {
      const {data}: {data: SearchEndpointData} = await api.get(
        `SYMBOL_SEARCHIBM${process.env.REACT_APP_API_KEY}`
      )

      console.log(data)

      setBestMatchesStockResult(data)

    } catch(err) {
      toast.error('Falhou ao obter dados.')
    } finally {
      setIsVisibleModal(true)
    }
  }, [filterStock])

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
          <FilterContainer>
            <FilterInput 
              type="text"
              placeholder="Filtrar"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setFilterStock(e.target.value)
              }}
              value={filterStock}
              onKeyPress={submitButtonInput}
            />
            <SearchFilterButton 
              onClick={handleSearchStockMarket}
            >
              <BsSearch size={20}/>
            </SearchFilterButton>
          </FilterContainer>
          <Content>
            <ContentStock>
              {
                bestMatchesStockResult.bestMatches.map(item => (
                  <CardStock
                    handleClick={() => handleClickInCardStock(item)}
                    key={item["1. symbol"]}
                    stock={item}
                  />
                ))
              }
              <div style={{height: 10}}></div>
            </ContentStock>
          </Content>
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