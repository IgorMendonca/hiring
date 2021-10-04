import { SearchEndpointStockItem } from "../../../../interfaces/SearchEndpointData"
import { Container, Content } from "./styles"

interface CardFavoriteProps {
  stock: SearchEndpointStockItem
  onClick: (stock: SearchEndpointStockItem) => void
}

export const CardFavoriteStock = ({ stock, onClick }: CardFavoriteProps) => {
  return (
    <Container 
      onClick={() => onClick(stock)}
    >
      <Content>
        <div>
          <h2>{stock["1. symbol"]}</h2>
          <span>{`${stock["5. marketOpen"]} - ${stock["6. marketClose"]}`}</span>     
        </div>
        <div>
          <strong>{stock["4. region"]}</strong>
          <span>({stock["8. currency"]})</span>
        </div>
      </Content>
    </Container>
  )
}