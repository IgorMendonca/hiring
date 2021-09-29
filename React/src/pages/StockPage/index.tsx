import { useCallback, useEffect } from "react";
import { useParams } from "react-router";
import { Header } from "../../components/Header";
import { Container } from "./styles";

export function StockPage() {
  const {id} = useParams

  const loadData = useCallback(() => {
    try {
      
    } catch(err) {

    }
  }, [])

  /**
   * effects
   */

  useEffect(() => {
    loadData()
  }, [loadData])

  return (
    <Container>
      <Header />
    </Container>
  )
}