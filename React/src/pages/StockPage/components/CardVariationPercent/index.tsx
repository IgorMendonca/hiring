import DoughnutChart from "../../../../components/DoughnutChart"
import { CardHeader, GraphContainer, InfoVariationContainer } from "./styles"

const CardVariationPercent = () => {

  return (
    <InfoVariationContainer>
      <CardHeader>
        <span>Variação</span>
      </CardHeader>
      <GraphContainer>
        <DoughnutChart />
      </GraphContainer>
    </InfoVariationContainer>
  )
}

export default CardVariationPercent