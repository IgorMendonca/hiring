import DoughnutChart from "../../../../components/DoughnutChart"
import { globalQuote } from "../../../../interfaces/GlobalQuote"
import { CardHeader, GraphContainer, InfoVariationContainer } from "./styles"

interface CardStockInfoProps {
  globalQuote: globalQuote
}

const CardVariationPercent = (props: CardStockInfoProps) => {

  return (
    <InfoVariationContainer>
      <CardHeader>
        <span>Variação</span>
      </CardHeader>
      <GraphContainer>
        <DoughnutChart 
          globalQuote={props.globalQuote}
        />
      </GraphContainer>
    </InfoVariationContainer>
  )
}

export default CardVariationPercent