import { SetStateAction, useCallback, useEffect, useState } from 'react'
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

  const [loading, setLoading] = useState(false)
  const [typeFilter, setTypeFilter] = useState('daily')
  const [timeSeriesDaily, setTimeSeriesDaily] = useState<TimeSeriesDaily>({} as TimeSeriesDaily)
  const [timeSeriesWeekly, setTimeSeriesWeekly] = useState<TimeSeriesWeekly>({} as TimeSeriesWeekly)
  const [timeSeriesMonthly, setTimeSeriesMonthly] = useState<TimeSeriesMonthly>({} as TimeSeriesMonthly)
  
  const [dataGraph, setDataGraph] = useState<any[]>([[{ type: 'date', label: 'Day' }, 'Preço', 'Alta', 'Baixa']])

  const searchTimeSeriesDaily = useCallback( async () => {
    const {data}: {data: TimeSeriesDaily} = await api.get(
      `TIME_SERIES_DAILYIBM${process.env.REACT_APP_API_KEY}`
    )

    setTimeSeriesDaily((state) => ({
      ...state, data
    }))

    console.log(timeSeriesDaily)

    // const days = Object.keys(data['Time Series (Daily)'])

    // days.forEach(day => {
    //   const arrTemp: any[] = []
    //   const x = addDays(new Date(day),1)
    //   const close = Number(data['Time Series (Daily)'][day]['4. close'])
    //   const high = Number(data['Time Series (Daily)'][day]['2. high'])
    //   const low = Number(data['Time Series (Daily)'][day]['3. low'])
    //   arrTemp.push(x, close, high, low)

    //   setDataGraph((prev) =>
    //     produce(prev, (draft) => {
    //       draft.push(arrTemp)
    //     })  
    //   )
    // })
    
  }, [])

  const searchTimeSeriesWeekly = useCallback( async () => {
    const {data}: {data: TimeSeriesWeekly} = await api.get(
      `TIME_SERIES_WEEKLYIBM${process.env.REACT_APP_API_KEY}`
    )

    setTimeSeriesWeekly(data)
  }, [])

  const searchTimeSeriesMonthly = useCallback( async () => {
    const {data}: {data: TimeSeriesMonthly} = await api.get(
      `TIME_SERIES_MONTHLYIBM${process.env.REACT_APP_API_KEY}`
    )

    setTimeSeriesMonthly(data)
  }, [])


  const loadData = useCallback( async () => {
    try {
      await Promise.all([searchTimeSeriesDaily(), searchTimeSeriesWeekly(), searchTimeSeriesMonthly()])
    } catch (err) {

    } finally {
    }

  }, [searchTimeSeriesDaily, searchTimeSeriesWeekly, searchTimeSeriesMonthly])

  useEffect(() => {
    loadData()
  }, [loadData])

  if(loading) {
    return <Loading />
  }

  return (
    <Container>
      <ChartTypeFilter>
        <div 
          className={typeFilter === 'daily' ? 'select-day' : ''}
          onClick={() => {
            if(typeFilter !== 'daily') {
              setTypeFilter('daily')
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
              setTypeFilter('weekly')
            }
          }}
        >
          <p>Semanal</p>
        </div>
        <div 
          className={typeFilter === 'monthly' ? 'select-month' : ''}
          onClick={() => {
            if(typeFilter !== 'monthly') {
              setTypeFilter('monthly')
            }
          }}
        >
          <p>Mensal</p>
        </div>
      </ChartTypeFilter>
      <GraphContainer>
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
      </GraphContainer>
    </Container>
   
    
      
  )
} 

export default LineChart