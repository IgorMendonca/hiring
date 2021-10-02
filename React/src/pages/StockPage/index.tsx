import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { toast } from "react-toastify";
import { Header } from "../../components/Header";
import LineChart from "../../components/LineChart";
import Loading from "../../components/Loading";
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

  const [loading, setLoading] = useState(false)
  const [globalQuote, setGlobalQuote] = useState<globalQuote>(GLOBAL_QUOTE)

  /**
   * Callbacks
   */

  const searchGlobalQuote = useCallback( async () => {
    const {data}: {data: globalQuote} = await api.get(
      `GLOBAL_QUOTEIBM${process.env.REACT_APP_API_KEY}`
    )

    setGlobalQuote(data)
  }, [])

  const loadData = useCallback( async () => {
    try {
      setLoading(true)
      await Promise.all([searchGlobalQuote()])
    } catch(err) {
      toast.error('erro')
    } finally {
      setLoading(false)
    }
  }, [searchGlobalQuote])

  /**
   * effects
   */

  useEffect(() => {
    loadData()
  }, [loadData])

  if(loading) {
    return (
      <Container>
        <Header />
        <Loading />
      </Container>
    )
  }

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
          <LineChart 
            params={params}
          />
        </DashBoard>
      </StockDashBoard>
    </Container>
  )
}