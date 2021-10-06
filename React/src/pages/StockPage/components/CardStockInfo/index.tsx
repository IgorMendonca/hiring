import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { useGlobalQuote } from "../../../../hooks/useGlobalQuote"
import { SearchEndpointStockItem } from "../../../../interfaces/SearchEndpointData"
import { formatPrice } from "../../../../util/format"
import { ButtonAddPortfolio, FavoriteStock, InfoBar, Prices, StockTradingDateInfo, Title } from "./styles"

interface CardStockInfoProps {
  params: SearchEndpointStockItem
  handleClick: () => void
  favorites: SearchEndpointStockItem[]
}

const CardStockInfo = (props: CardStockInfoProps) => {
  const [inPortfolio, setInPortfolio] = useState<boolean>()

  const {globalQuote} = useGlobalQuote()

  const { params } = props

  useEffect(() => {
    try {
      const exists = props.favorites.find(favorite => 
        favorite["1. symbol"] === params["1. symbol"]
      )

      if(!exists) {    
        setInPortfolio(false)
        return
      }

      props.favorites.forEach((favorite, index) => {
        if(favorite["1. symbol"] === params["1. symbol"]) {
          setInPortfolio(true)
        }
      }) 

    } catch (err) {
      const message = 'Erro'
      toast.error(message)
    }
  }, [params, props.favorites])

  return (
    <>
      <InfoBar>
        <div>
          <Title>{params["1. symbol"]}</Title>
        </div>
        <Prices>
          <div>
            <p style={{color: '#008000'}}> 
              {formatPrice(globalQuote["Global Quote"]["04. low"] || 0, params["8. currency"])}
            </p>
            <span style={{color: '#008000'}}>Baixa</span>
          </div>
          <div>
            <p style={{color: '#29292e', fontSize: 18}}> 
              {formatPrice(globalQuote["Global Quote"]["05. price"] || 0, params["8. currency"])}
            </p>
            <span style={{color: '#29292e'}}>Preço</span>
          </div>
          <div>
            <p style={{color: '#ff0000'}}> 
              {formatPrice(globalQuote["Global Quote"]["03. high"] || 0, params["8. currency"])}
            </p>
            <span style={{color: '#ff0000'}}>Alta</span>
          </div>
        </Prices>
        <StockTradingDateInfo>
          <span>Última negociação</span>
          <p>{globalQuote["Global Quote"]["07. latest trading day"]}</p>
        </StockTradingDateInfo>      
      </InfoBar>
      <FavoriteStock>
        <ButtonAddPortfolio 
          data-testid='portfolio-button'
          onClick={props.handleClick}
        >
          {inPortfolio ? 'Remover do portifólio' : 'Adicionar ao portifólio'}
        </ButtonAddPortfolio>
      </FavoriteStock>
    </>
  )
}

export default CardStockInfo