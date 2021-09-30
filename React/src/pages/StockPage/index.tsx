import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Header } from "../../components/Header";
import LineChart from "../../components/LineChart";
import { globalQuoteProps, globalQuote } from "../../interfaces/GlobalQuote";
import { SearchEndpointStockItem } from "../../interfaces/SearchEndpointData";
import api from "../../services/api";
import CardStockInfo from "./components/CardStockInfo";
import CardVariationPercent from "./components/CardVariationPercent";
import { AsideCards, Container, DashBoard, StockDashBoard } from "./styles";

interface propsLocation {
  params: SearchEndpointStockItem
}

export function StockPage() {
  /**
   * consts
   */

  const GLOBAL_QUOTE = {
    "Global Quote": {} as globalQuoteProps
  } as globalQuote

  const { state } = useLocation<propsLocation>()
  const params = state.params

  /**
   * states
   */

  const [globalQuote, setGlobalQuote] = useState<globalQuote>(GLOBAL_QUOTE)

  /**
   * Callbacks
   */

  const searchGlobalQuote = useCallback( async () => {
    const {data}: {data: globalQuote} = await api.get(
      `?function=GLOBAL_QUOTE&symbol=${params["1. symbol"]}&apikey=${process.env.REACT_APP_API_KEY}`
    )

    setGlobalQuote(data)
  }, [params])

  const loadData = useCallback( async () => {
    try {
      await Promise.all([searchGlobalQuote()])
    } catch(err) {

    }
  }, [searchGlobalQuote])

  /**
   * effects
   */

  useEffect(() => {
    loadData()
  }, [loadData])

  return (
    <Container>
      <Header />
      <StockDashBoard>
        <DashBoard>
          <AsideCards>
            <CardStockInfo 
              globalQuote={globalQuote}
              params={params}
            />
            <CardVariationPercent 
              globalQuote={globalQuote}
            />
          </AsideCards>
          <LineChart />
        </DashBoard>
      </StockDashBoard>
    </Container>
  )
}