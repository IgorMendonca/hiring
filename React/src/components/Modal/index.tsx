import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import { MdClose } from 'react-icons/md'
import { toast } from 'react-toastify';
import { SearchEndpointData, SearchEndpointStockItem } from '../../interfaces/SearchEndpointData';
import api from '../../services/api';
import CardStock from '../CardStock';
import Loading from '../Loading';
import { Container, Content, ContentHeader, ContentStock, FilterContainer, FilterInput, ModalContainer, SearchFilterButton, Title } from './styles';

interface ModalProps {
  id: string;
  filterStock: string
  onClose: () => void
  handleCardClick: (item: SearchEndpointStockItem) => void
}

export function Modal(props: ModalProps) {

  const BEST_MATCHES = {
    bestMatches: []
  } as SearchEndpointData

  const [loading, setLoading] = useState(false)
  const [filterStock, setFilterStock] = useState(props.filterStock)
  const [
    bestMatchesStockResult,
    setBestMatchesStockResult
  ] = useState<SearchEndpointData>(BEST_MATCHES)

  const handleSearchStockMarket = useCallback( async () => {
    try {
      setLoading(true)
      const {data}: {data: SearchEndpointData} = await api.get(
        `SYMBOL_SEARCHIBM${process.env.REACT_APP_API_KEY}`
      )

      setBestMatchesStockResult(data)

    } catch(err) {
      toast.error('Falhou ao obter dados.')
    } finally {
      setLoading(false)
    }
  }, [])

  const submitButtonInput = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    if(e.key === 'Enter') {
      handleSearchStockMarket()
    }
  }, [handleSearchStockMarket])

  const handleOutsideClick = (e: any) => {
    if(e.target.id === props.id) props.onClose();
  }

  useEffect(() => {
    handleSearchStockMarket()
  }, [handleSearchStockMarket])
 
  if(loading) {
    return (
      <Loading />
    )
  }

  return (
    <ModalContainer id={props.id} onMouseDown={handleOutsideClick}>
      <Container>
        <ContentHeader>
          <Title>Buscar ações</Title>
          <button onClick={props.onClose} ><MdClose /></button>
        </ContentHeader>
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
                  handleClick={() => props.handleCardClick(item)}
                  key={item["1. symbol"]}
                  stock={item}
                />
              ))
            }
            <div style={{height: 10}}></div>
          </ContentStock>
        </Content>
      </Container>
    </ModalContainer>
  )
}