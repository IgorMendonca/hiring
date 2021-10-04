import { useCallback, useEffect, useState } from "react"
import { useHistory } from "react-router"
import { Header } from "../../components/Header"
import { SearchEndpointStockItem } from "../../interfaces/SearchEndpointData"
import { CardFavoriteStock } from "./components/CardFavoriteStock"
import { Container, FavoritesContainer, FavoritesGrid, WithoutData } from "./styles"

export const PortfolioStockPage = () => {
  const FAVORITEKEY = '@web-app/favorites'
  const page = '/portfolio'

  const history = useHistory()

  const [favorites, setFavorites] = useState<SearchEndpointStockItem[]>([])

  const handleClick = useCallback((stock: SearchEndpointStockItem) => {
    history.push(`/stock/${stock["1. symbol"]}`, {
      params: { params: stock, page}
    })
  }, [history])

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

  return (
    <Container>
      <Header />
      {
        favorites.length > 0 ?
        <FavoritesContainer>
          <FavoritesGrid>
            {
              favorites.map((stock) => (
                <CardFavoriteStock 
                  onClick={(stock) => handleClick(stock)}
                  stock={stock}
                />
              ))
            }
          </FavoritesGrid>
        </FavoritesContainer> 
        : 
        <WithoutData>
          <p>Portifólio vazio</p>
        </WithoutData> 
      }
          
    </Container>
  )
}