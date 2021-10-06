import { format, subMonths } from "date-fns"
import { ChangeEvent, useCallback, useState } from "react"
import { toast } from "react-toastify"
import { useGlobalQuote } from "../../hooks/useGlobalQuote"
import { TimeSeriesDaily } from "../../interfaces/TimeSeries"
import api, { apiKey } from "../../services/api"
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

  const [numberOfPurchase, setNumberOfPurchase] = useState<number>()
  const [dateFilter, setDateFilter] = useState(DATE_FILTER)
  const [simulatorIsActive, setSimulatorIsActive] = useState(false)
  const [
    timeSeriesDailyItem, 
    setTimeSeriesDailyItem
  ] = useState(DAILY_ITEM)


  const searchTimeSeriesDaily = useCallback( async () => {

    const {data}: {data: TimeSeriesDaily} = await api.get(
      `?function=TIME_SERIES_DAILY&symbol=${globalQuote["Global Quote"]["01. symbol"]}&apikey=${apiKey}`
    )

    if(data.Note) {
      toast.error('Você só pode fazer 5 consultas por minuto')
      return
    }

    const days = Object.keys(data['Time Series (Daily)'])

    const result = days.filter(
      day => new Date(day) <= new Date(format(dateFilter.startDate, formatDataStringISO))
    )

    const lastPrice = result[0]

    const dataDaily = data["Time Series (Daily)"][lastPrice]

    setTimeSeriesDailyItem(dataDaily)

    setSimulatorIsActive(true)

  }, [dateFilter, globalQuote])

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
          data-testid='datapicker-simulator'
          style={{width: '15%'}}
          value={dateFilter.startDate}
          onChange={(startDate: any) => {
            setDateFilter({...dateFilter, startDate})
          }}
        />
        <CalculateButton
          onClick={() => {
            if(!numberOfPurchase) {
              toast.error('Informe a quantidade da compra')
              return
            }
            searchTimeSeriesDaily()
          }}
        >
          CALCULAR
        </CalculateButton>
        {
          simulatorIsActive && 
          <>
            <strong>Preço na data: {Number(timeSeriesDailyItem["4. close"]).toFixed(2)}</strong>
            <strong>Preço atual: {Number(globalQuote["Global Quote"]["05. price"]).toFixed(2)}</strong>
            <strong
              data-testid='result-simulator'
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
                ((numberOfPurchase || 1) * (
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