import { useCallback, useEffect, useState } from 'react'
import { Chart } from 'react-google-charts'
import { addDays, subMonths } from 'date-fns'
import produce from 'immer'
import { SearchEndpointStockItem } from '../../interfaces/SearchEndpointData'
import { TimeSeriesDaily, TimeSeriesMonthly, TimeSeriesWeekly } from '../../interfaces/TimeSeries'
import api, { apiKey } from '../../services/api'
import { ChartTypeFilter, Container, ContainerDataPicker, GraphContainer, HeaderSelect, NoDataContainer } from './styles'
import DataPicker from '../DataPicker'
import { toast } from 'react-toastify'

interface propsLocation {
  params: SearchEndpointStockItem
}

const LineChart = (props: propsLocation) => {
  const {params} = props

  const DATE_FILTER = {
    startDate: subMonths(new Date(), 1),
    endDate: new Date()
  }

  const [loading, setLoading] = useState(true)
  const [typeFilter, setTypeFilter] = useState('daily')
  const [dateFilter, setDateFilter] = useState(DATE_FILTER)
  
  const [dataGraph, setDataGraph] = useState<any[]>([[{ type: 'date', label: 'Day' }, 'Preço', 'Alta', 'Baixa']])

  const searchTimeSeriesDaily = useCallback( async () => {
    if(typeFilter !== 'daily') {
      return
    }

    setLoading(true)

    setDataGraph(state => (
      state = [[{ type: 'date', label: 'Day' }, 'Preço', 'Alta', 'Baixa']]
    ))

    const {data}: {data: TimeSeriesDaily} = await api.get(
      `?function=TIME_SERIES_DAILY&symbol=${params['1. symbol']}&apikey=${apiKey}`
    )

    if(data.Note) {
      toast.error('Você só pode fazer 5 consultas por minuto')
      return
    }

    const days = Object.keys(data['Time Series (Daily)'])
    const result = days.filter(
      day => addDays(new Date(day),1) >= dateFilter.startDate && addDays(new Date(day),1) <= dateFilter.endDate
    )

    result.forEach(day => {
      const arrTemp: any[] = []
      const x = addDays(new Date(day),1)
      const close = Number(data['Time Series (Daily)'][day]['4. close'])
      const high = Number(data['Time Series (Daily)'][day]['2. high'])
      const low = Number(data['Time Series (Daily)'][day]['3. low'])
      arrTemp.push(x, close, high, low)

      setDataGraph((prev) =>
        produce(prev, (draft) => {
          draft.push(arrTemp)
        })  
      )
    })

    setLoading(false)

  }, [dateFilter, typeFilter, params])

  const searchTimeSeriesWeekly = useCallback( async () => {
    if(typeFilter !== 'weekly') {
      return
    }

    setLoading(true)

    setDataGraph(state => (
      state = [[{ type: 'date', label: 'Day' }, 'Preço', 'Alta', 'Baixa']]
    ))

    const {data}: {data: TimeSeriesWeekly} = await api.get(
      `?function=TIME_SERIES_WEEKLY&symbol=${params['1. symbol']}&apikey=${apiKey}`
    )
    
    if(data.Note) {
      toast.error('Você só pode fazer 5 consultas por minuto')
      return
    }

    const days = Object.keys(data['Weekly Time Series'])
    const result = days.filter(
      day => addDays(new Date(day),1) >= dateFilter.startDate && addDays(new Date(day),1) <= dateFilter.endDate
    )

    result.forEach(day => {
      const arrTemp: any[] = []
      const x = addDays(new Date(day),1)
      const close = Number(data['Weekly Time Series'][day]['4. close'])
      const high = Number(data['Weekly Time Series'][day]['2. high'])
      const low = Number(data['Weekly Time Series'][day]['3. low'])
      arrTemp.push(x, close, high, low)

      console.log(arrTemp)

      setDataGraph((prev) =>
        produce(prev, (draft) => {
          draft.push(arrTemp)
        })  
      )
    })

    setLoading(false)
  }, [dateFilter, typeFilter, params])

  const searchTimeSeriesMonthly = useCallback( async () => {
    if(typeFilter !== 'monthly') {
      return
    }

    setLoading(true)

    setDataGraph(state => (
      state = [[{ type: 'date', label: 'Day' }, 'Preço', 'Alta', 'Baixa']]
    ))

    const {data}: {data: TimeSeriesMonthly} = await api.get(
      `?function=TIME_SERIES_MONTHLY&symbol=${params['1. symbol']}&apikey=${apiKey}`
    )
    
    if(data.Note) {
      toast.error('Você só pode fazer 5 consultas por minuto')
      return
    }

    const days = Object.keys(data['Monthly Time Series'])
    const result = days.filter(
      day => addDays(new Date(day),1) >= dateFilter.startDate && addDays(new Date(day),1) <= dateFilter.endDate
    )

    result.forEach(day => {
      const arrTemp: any[] = []
      const x = addDays(new Date(day),1)
      const close = Number(data['Monthly Time Series'][day]['4. close'])
      const high = Number(data['Monthly Time Series'][day]['2. high'])
      const low = Number(data['Monthly Time Series'][day]['3. low'])
      arrTemp.push(x, close, high, low)

      setDataGraph((prev) =>
        produce(prev, (draft) => {
          draft.push(arrTemp)
        })  
      )
    })

    setLoading(false)
  }, [dateFilter, typeFilter, params])


  const loadData = useCallback( async () => {

    await Promise.all([searchTimeSeriesDaily(), searchTimeSeriesWeekly(), searchTimeSeriesMonthly()])
    
  }, [searchTimeSeriesDaily, searchTimeSeriesWeekly, searchTimeSeriesMonthly])

  useEffect(() => {
    loadData()
  }, [loadData])

  return (
    <Container>
      <HeaderSelect>
        <ChartTypeFilter>
          <div>
            <div 
              className={typeFilter === 'daily' ? 'select-day' : ''}
              onClick={() => {
                if(typeFilter !== 'daily') {
                  setTypeFilter((state) => (
                    state = 'daily'
                  ))
                  searchTimeSeriesDaily()
                }
              }}
            >
              <p>Diário</p>
            </div>
            <div 
              className={typeFilter === 'weekly' ? 'select-week' : ''}
              onClick={() => {
                if(typeFilter !== 'weekly') {
                  setTypeFilter((state) => (
                    state = 'weekly'
                  ))
                  searchTimeSeriesWeekly()
                }
              }}
            >
              <p>Semanal</p>
            </div>
            <div 
              className={typeFilter === 'monthly' ? 'select-month' : ''}
              onClick={() => {
                if(typeFilter !== 'monthly') {
                  setTypeFilter((state) => (
                    state = 'monthly'
                  ))
                  searchTimeSeriesMonthly()

                }
              }}
            >
              <p>Mensal</p>
            </div>
          </div>
        </ChartTypeFilter>
        <ContainerDataPicker>
          <DataPicker 
            label='Data inicial'
            fullWidth
            value={dateFilter.startDate}
            onChange={(startDate: any) => {
              setDateFilter({...dateFilter, startDate})
            }}
          />
          <DataPicker 
            label='Data final'
            fullWidth
            value={dateFilter.endDate}
            onChange={(endDate: any) => {
              setDateFilter({...dateFilter, endDate})
            }}
          />
        </ContainerDataPicker>
      </HeaderSelect>
      <GraphContainer>
        {
          dataGraph.length > 1 ?
          !loading && 
            <Chart
              style={{borderRadius: 8, padding: 8}}
              width={'900px'}
              height={'200px'}
              chartType="LineChart"
              loader={<div>Loading Chart</div>}
              data={dataGraph}
              options={{
                hAxis: {
                  title: 'Tempo',
                },
                vAxis: {
                  title: 'Valor',
                },
              }}
              rootProps={{ 'data-testid': '1' }}
            />
          : !loading && <NoDataContainer>
              <span>Sem dados no período informado</span>
            </NoDataContainer>
        }
      </GraphContainer>
    </Container>
  )
} 

export default LineChart