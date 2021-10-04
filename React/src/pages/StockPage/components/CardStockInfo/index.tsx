import { AiOutlineStar } from 'react-icons/ai'
import { useGlobalQuote } from "../../../../hooks/useGlobalQuote"
import { SearchEndpointStockItem } from "../../../../interfaces/SearchEndpointData"
import { formatPrice } from "../../../../util/format"
import { FavoriteStock, InfoBar, Prices, StockTradingDateInfo, Title } from "./styles"

interface CardStockInfoProps {
  params: SearchEndpointStockItem
  handleClick: () => void
}

const CardStockInfo = (props: CardStockInfoProps) => {
  const {globalQuote} = useGlobalQuote()

  const { params } = props

  return (
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
      <FavoriteStock>
        <AiOutlineStar 
          onClick={props.handleClick}
          title="Adicionar ao portifólio"
          className="star"
          style={{position: 'absolute', left: 5, top: 5}}
          size={35}
        />
      </FavoriteStock>     
    </InfoBar>
  )
}

export default CardStockInfo