import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import { MdClose } from 'react-icons/md'
import { toast } from 'react-toastify';
import { SearchEndpointData, SearchEndpointStockItem } from '../../interfaces/SearchEndpointData';
import api, { apiKey } from '../../services/api';
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
  const [filterStockInput, setFilterStockInput] = useState(props.filterStock || 'apple')
  const [filterStock, setFilterStock] = useState(props.filterStock || 'apple')
  const [
    bestMatchesStockResult,
    setBestMatchesStockResult
  ] = useState<SearchEndpointData>(BEST_MATCHES)

  const submitButtonInput = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    if(e.key === 'Enter') {
      setFilterStock(filterStockInput)
    }
  }, [filterStockInput])

  const handleOutsideClick = (e: any) => {
    if(e.target.id === props.id) props.onClose();
  }

  useEffect(() => {
    const handleSearchStockMarket = async () => {
      try {
        setLoading(true)
        const {data}: {data: SearchEndpointData} = await api.get(
          `?function=SYMBOL_SEARCH&keywords=${filterStock}&apikey=${apiKey}`
        )

        if(data.Note) {
          toast.error('Você só pode fazer 5 consultas por minuto')
          props.onClose()
        }
  
        setBestMatchesStockResult(data)
  
      } catch(err) {
        toast.error('Falhou ao obter dados.')
      } finally {
        setLoading(false)
      }
    }

    handleSearchStockMarket()
  }, [filterStock, props])
 
  if(loading) {
    return (
      <Loading 
        data-testid="loading-test"
      />
    )
  }

  return (
    <ModalContainer 
      id={props.id} 
      onMouseDown={handleOutsideClick}
    >
      <Container>
        <ContentHeader>
          <Title>Buscar ações</Title>
          <button 
            data-testid="button-close"
            onClick={props.onClose} 
          >
            <MdClose />
          </button>
        </ContentHeader>
        <FilterContainer>
          <FilterInput 
            type="text"
            placeholder="Filtrar"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setFilterStockInput(e.target.value)
            }}
            value={filterStockInput}
            onKeyPress={(e: React.KeyboardEvent<HTMLDivElement>) => {
              submitButtonInput(e)
            }}
          />
          <SearchFilterButton 
            data-testid="button-filter"
            onClick={() => {
              setFilterStock(state => 
                state = filterStockInput  
              )
            }}
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