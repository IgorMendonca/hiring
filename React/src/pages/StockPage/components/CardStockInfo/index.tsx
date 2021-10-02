import { globalQuote } from "../../../../interfaces/GlobalQuote"
import { SearchEndpointStockItem } from "../../../../interfaces/SearchEndpointData"
import { formatPrice } from "../../../../util/format"
import { InfoBar, Prices, StockTradingDateInfo, Title } from "./styles"

interface CardStockInfoProps {
  globalQuote: globalQuote
  params: SearchEndpointStockItem
}

const CardStockInfo = (props: CardStockInfoProps) => {
  const stockInfo = props.globalQuote["Global Quote"]
  const { params } = props

  return (
    <InfoBar>
      <div>
        <Title>{params["1. symbol"]}</Title>
      </div>
      <Prices>
        <div>
          <p style={{color: '#008000'}}> 
            {formatPrice(stockInfo["04. low"] || 0, params["8. currency"])}
          </p>
          <span style={{color: '#008000'}}>Baixa</span>
        </div>
        <div>
          <p style={{color: '#29292e', fontSize: 18}}> 
            {formatPrice(stockInfo["05. price"] || 0, params["8. currency"])}
          </p>
          <span style={{color: '#29292e'}}>Preço</span>
        </div>
        <div>
          <p style={{color: '#ff0000'}}> 
            {formatPrice(stockInfo["03. high"] || 0, params["8. currency"])}
          </p>
          <span style={{color: '#ff0000'}}>Alta</span>
        </div>
      </Prices>
      <StockTradingDateInfo>
        <span>Última negociação</span>
        <p>{stockInfo["07. latest trading day"]}</p>
      </StockTradingDateInfo>        
    </InfoBar>
  )
}

export default CardStockInfo