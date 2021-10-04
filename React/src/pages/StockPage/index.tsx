import { useCallback, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
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
import api, { apiKey } from "../../services/api";
import produce from "immer";
import { toast } from "react-toastify";
import Simulator from "../../components/Simulator";

interface propsLocation {
  params: {
    params: SearchEndpointStockItem,
    page: string
  },

}

export function StockPage() {
  const FAVORITEKEY = '@web-app/favorites'

  const {globalQuote, setGlobalQuoteFunc} = useGlobalQuote()

  /**
   * hooks
   */

  const history = useHistory()
  const { state } = useLocation<propsLocation>()

  /**
   * consts
   */

  const {params, page} = state.params

  /**
   * states
   */

  const [loading, setLoading] = useState(false)
  const [isVisibleModal, setIsVisibleModal] = useState(false)
  const [stocksCompare, setStocksCompare] = useState<globalQuote[]>([])
  const [favorites, setFavorites] = useState<SearchEndpointStockItem[]>([])

  const handleClick = useCallback( async (item: SearchEndpointStockItem) => {
    if(stocksCompare.length === 5) {
      toast.error('Compare até 5 ações por vez')
      return
    }

    const {data}: {data: globalQuote} = await api.get(
      `?function=GLOBAL_QUOTE&symbol=${item["1. symbol"]}&apikey=${apiKey}`
    )

    if(data.Note) {
      toast.error('Você só pode fazer 5 consultas por minuto')
      return
    }

    setStocksCompare((stock) => 
      produce(stock, (draft) => {
        draft.push(data)
      })
    )

    setIsVisibleModal(false)
  }, [stocksCompare])

  const removeItem = useCallback((index: number) => {
    setStocksCompare((prev) => 
      produce(prev, (draft) => {
        draft.splice(index, 1)
      })
    )
  }, [])

  const handleAddToPortfolio = useCallback(() => {
    try {
      const exists = favorites.find(favorite => 
        favorite["1. symbol"] === params["1. symbol"]
      )

      if(!exists) {    
        setFavorites((prev) => [params, ...prev])
        toast.success('Adicionado com sucesso')
        return
      }

      favorites.forEach((favorite, index) => {
        if(favorite["1. symbol"] === params["1. symbol"]) {
          setFavorites((prev) => 
            produce(prev, (draft) => {
              draft.splice(index, 1)
            })
          )
        }
      }) 

      toast.success('Ação removida com sucesso')

    } catch (err) {
      const message = 'Erro'
      toast.error(message)
    }
  }, [favorites, params])

  const searchGlobalQuote = useCallback( async (item: SearchEndpointStockItem) => {
    const {data}: {data: globalQuote} = await api.get(
      `?function=GLOBAL_QUOTE&symbol=${item["1. symbol"]}&apikey=${apiKey}`
    )

    if(data.Note) {
      toast.error('Você só pode fazer 5 consultas por minuto')
      history.push(page)
      return
    }
    setGlobalQuoteFunc(data)
  }, [setGlobalQuoteFunc, history, page])

  const loadData = useCallback( async () => {
      setLoading(true) 

      await searchGlobalQuote(params)
   
      setLoading(false)
    
  }, [searchGlobalQuote, params])

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
                favorites={favorites}
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
                removeItemToCompare={(index) => removeItem(index)}
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