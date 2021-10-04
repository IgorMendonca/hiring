import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router";
import CompareBarChart from "../../components/CompareBarChart";
import { Header } from "../../components/Header";
import { globalQuote } from "../../interfaces/GlobalQuote"
import LineChart from "../../components/LineChart";
import Loading from "../../components/Loading";
import { Modal } from "../../components/Modal";
import { useGlobalQuote } from "../../hooks/useGlobalQuote";
import { SearchEndpointStockItem } from "../../interfaces/SearchEndpointData";
import CardStockInfo from "./components/CardStockInfo";
import CardVariationPercent from "./components/CardVariationPercent";
import { AnalyticsCharts, AsideCards, Container, DashBoard, StockDashBoard } from "./styles";
import api from "../../services/api";
import produce from "immer";
import { toast } from "react-toastify";
import Simulator from "../../components/Simulator";

interface propsLocation {
  params: SearchEndpointStockItem
}

export function StockPage() {
  const FAVORITEKEY = '@web-app/favorites'

  const {globalQuote, searchGlobalQuote} = useGlobalQuote()

  /**
   * hooks
   */

  const { state } = useLocation<propsLocation>()

  /**
   * consts
   */

  const params = state.params

  /**
   * states
   */

  const [loading, setLoading] = useState(false)
  const [isVisibleModal, setIsVisibleModal] = useState(false)
  const [stocksCompare, setStocksCompare] = useState<globalQuote[]>([])
  const [favorites, setFavorites] = useState<SearchEndpointStockItem[]>([])

  const handleClick = useCallback( async (item: SearchEndpointStockItem) => {
    try {
      if(stocksCompare.length === 5) {
        toast.error('Compare até 5 ações por vez')
        return
      }

      const {data}: {data: globalQuote} = await api.get(
        `GLOBAL_QUOTEIBM${process.env.REACT_APP_API_KEY}`
      )
  
      setStocksCompare((stock) => 
        produce(stock, (draft) => {
          draft.push(data)
        })
      )
  
      setIsVisibleModal(false)
    } catch(err) {

    }
  }, [stocksCompare])

  const handleAddToPortfolio = useCallback(() => {
    try {
      const portfolio = localStorage.getItem(FAVORITEKEY)
        console.log(portfolio)

        toast.success('Ação removida com sucesso')
        
      
      setFavorites((prev) => [params, ...prev])
      toast.success('Adicionado com sucesso')
    } catch (err) {
      const message = 'Erro'
      toast.error(message)
    }
  }, [favorites, params])

  useEffect(() => {
    const persistFavorite = localStorage.getItem(FAVORITEKEY)
    if (!persistFavorite) {
      return
    }
    setFavorites(JSON.parse(persistFavorite))
  }, [])

  useEffect(() => {
    localStorage.setItem(FAVORITEKEY, JSON.stringify(favorites))
  }, [favorites])

  useEffect(() => {
    searchGlobalQuote()
  }, [searchGlobalQuote])

  if(loading) {
    return (
      <Container>
        <Header />
        <Loading />
      </Container>
    )
  }

  return (
    <>
      <Container>
        { 
          isVisibleModal && 
          <Modal 
            handleCardClick={(item) => handleClick(item)}
            filterStock={globalQuote["Global Quote"]["01. symbol"]}
            id="modal"
            onClose={() => setIsVisibleModal(false)}
          />
        }
        <Header />
        <StockDashBoard>
          <DashBoard>
            <AsideCards>
              <CardStockInfo 
                handleClick={handleAddToPortfolio}
                params={params}
              />
              <CardVariationPercent />
            </AsideCards>
            <AnalyticsCharts>
              <LineChart 
                params={params}
              />
              <CompareBarChart 
                stocksCompare={stocksCompare}
                callModal={() => setIsVisibleModal(true)}
              />
            </AnalyticsCharts>
          </DashBoard>
          <Simulator />
        </StockDashBoard>
      </Container>
    </>
  )
}