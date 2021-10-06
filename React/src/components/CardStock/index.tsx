import { SearchEndpointStockItem } from "../../interfaces/SearchEndpointData"
import { Card, CartContent, InfoStock, TitleStock } from "./styles"

interface CardStockProps {
  stock: SearchEndpointStockItem
  handleClick?: () => void
}

const CardStock = (props: CardStockProps) => {
  return (
    <Card 
      onClick={props.handleClick}
    >
      <TitleStock>
        <h3>{props.stock["1. symbol"]}</h3>
      </TitleStock>
      <CartContent>
        <p>{props.stock["2. name"]}</p>
        <div>
          <InfoStock>
            <p>{props.stock["4. region"]}</p>
            <p>({props.stock["8. currency"]})</p>
          </InfoStock>   
        </div>
      </CartContent>
    </Card>
  )
}

export default CardStock