import { SetStateAction, useCallback, useEffect, useRef, useState } from 'react'
import { Chart } from 'react-google-charts'
import { addDays } from 'date-fns'
import produce from 'immer'
import { SearchEndpointStockItem } from '../../interfaces/SearchEndpointData'
import { TimeSeriesDaily, TimeSeriesMonthly, TimeSeriesWeekly } from '../../interfaces/TimeSeries'
import api from '../../services/api'
import { ChartTypeFilter, Container, GraphContainer } from './styles'
import Loading from '../Loading'

interface propsLocation {
  params: SearchEndpointStockItem
}

const LineChart = (props: propsLocation) => {
  const {params} = props

  const [loading, setLoading] = useState(true)
  const [typeFilter, setTypeFilter] = useState('daily')
  
  const [dataGraph, setDataGraph] = useState<any[]>([[{ type: 'date', label: 'Day' }, 'Preço', 'Alta', 'Baixa']])

  const searchTimeSeriesDaily = useCallback( async () => {
    setLoading(true)

    setDataGraph(state => (
      state = [[{ type: 'date', label: 'Day' }, 'Preço', 'Alta', 'Baixa']]
    ))

    const {data}: {data: TimeSeriesDaily} = await api.get(
      `TIME_SERIES_DAILYIBM${process.env.REACT_APP_API_KEY}`
    )

    const days = Object.keys(data['Time Series (Daily)'])
    const result = days.filter(day => new Date(day) > new Date('2021-01-01'))

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

  }, [])

  const searchTimeSeriesWeekly = useCallback( async () => {
    setLoading(true)

    setDataGraph(state => (
      state = [[{ type: 'date', label: 'Day' }, 'Preço', 'Alta', 'Baixa']]
    ))

    const {data}: {data: TimeSeriesWeekly} = await api.get(
      `TIME_SERIES_WEEKLYIBM${process.env.REACT_APP_API_KEY}`
    )

    const days = Object.keys(data['Weekly Time Series'])
    const result = days.filter(day => new Date(day) > new Date('2021-01-01'))

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
  }, [])

  const searchTimeSeriesMonthly = useCallback( async () => {
    setLoading(true)

    setDataGraph(state => (
      state = [[{ type: 'date', label: 'Day' }, 'Preço', 'Alta', 'Baixa']]
    ))

    const {data}: {data: TimeSeriesMonthly} = await api.get(
      `TIME_SERIES_MONTHLYIBM${process.env.REACT_APP_API_KEY}`
    )

    const days = Object.keys(data['Monthly Time Series'])
    const result = days.filter(day => new Date(day) > new Date('2021-01-01'))
    
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
  }, [])


  const loadData = useCallback( async () => {
    try {
      await Promise.all([searchTimeSeriesDaily()])
    } catch (err) {

    } finally {
    }

  }, [searchTimeSeriesDaily])

  useEffect(() => {
    loadData()
  }, [loadData])

  return (
    <Container>
      <ChartTypeFilter>
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
      </ChartTypeFilter>
      <GraphContainer>
        {!loading && 
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
        }
      </GraphContainer>
    </Container>
  )
} 

export default LineChart