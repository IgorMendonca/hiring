import { format, subMonths } from "date-fns"
import { ChangeEvent, useCallback, useState } from "react"
import { useGlobalQuote } from "../../hooks/useGlobalQuote"
import { TimeSeriesDaily } from "../../interfaces/TimeSeries"
import api from "../../services/api"
import { formatDataStringISO } from "../../util/format"
import DataPicker from "../DataPicker"
import { CalculateButton, Container, PurchasesNumberInput, SimulatorContainer } from "./styles"

const Simulator = () => {
  const {globalQuote} = useGlobalQuote()
  
  const DATE_FILTER = {
    startDate: subMonths(new Date(), 1),
  }

  const DAILY_ITEM = {
    "1. open": '',
    "2. high": '',
    "3. low": '',
    "4. close": '',
    "5. volume": ''
  }

  const [numberOfPurchase, setNumberOfPurchase] = useState(1)
  const [dateFilter, setDateFilter] = useState(DATE_FILTER)
  const [simulatorIsActive, setSimulatorIsActive] = useState(false)
  const [
    timeSeriesDailyItem, 
    setTimeSeriesDailyItem
  ] = useState(DAILY_ITEM)


  const searchTimeSeriesDaily = useCallback( async () => {

    const {data}: {data: TimeSeriesDaily} = await api.get(
      `TIME_SERIES_DAILYIBM${process.env.REACT_APP_API_KEY}`
    )

    const days = Object.keys(data['Time Series (Daily)'])

    const result = days.filter(
      day => new Date(day) <= new Date(format(dateFilter.startDate, formatDataStringISO))
    )

    const lastPrice = result[0]

    const dataDaily = data["Time Series (Daily)"][lastPrice]

    setTimeSeriesDailyItem(dataDaily)

    setSimulatorIsActive(true)

  }, [dateFilter])

  return (
    <Container>
      <SimulatorContainer>
        <p>Simulador:</p>
        <PurchasesNumberInput
          type="number"
          placeholder="Quantidade da compra"
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setNumberOfPurchase(Number(Number(e.target.value).toFixed(0)))
          }}
          value={numberOfPurchase}
        />
        <DataPicker 
          style={{width: '15%'}}
          value={dateFilter.startDate}
          onChange={(startDate: any) => {
            setDateFilter({...dateFilter, startDate})
          }}
        />
        <CalculateButton
          onClick={searchTimeSeriesDaily}
        >
          CALCULAR
        </CalculateButton>
        {
          simulatorIsActive && 
          <>
            <strong>Preço na data: {Number(timeSeriesDailyItem["4. close"]).toFixed(2)}</strong>
            <strong>Preço atual: {Number(globalQuote["Global Quote"]["05. price"]).toFixed(2)}</strong>
            <strong
              className=
              {
                (Number(globalQuote["Global Quote"]["05. price"]) 
                > Number(timeSeriesDailyItem["4. close"]))
                ? 'gains'
                : 'losses'
              }   
            >{
              (Number(globalQuote["Global Quote"]["05. price"]) 
                > Number(timeSeriesDailyItem["4. close"]))
                ? 'Ganhos: '
                : 'Perdas: '
              }
              {
                (numberOfPurchase * (
                  Number((Number(globalQuote["Global Quote"]["05. price"]) 
                  - Number(timeSeriesDailyItem["4. close"])).toFixed(2))
                )).toFixed(2)
              }
            </strong>
          </>
        }
        
      </SimulatorContainer>
    </Container>
  )
}

export default Simulator