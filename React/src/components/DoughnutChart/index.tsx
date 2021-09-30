import { useCallback, useEffect, useState } from 'react'
import { Doughnut } from 'react-chartjs-2'
import { globalQuote } from '../../interfaces/GlobalQuote'

interface CardStockInfoProps {
  globalQuote: globalQuote
}

interface graphData {
  labels: string[],
  datasets: {
    label: string,
    data: number[],
    backgroundColor: string[],
    borderWidth: number
  }[]
}

const DoughnutChart = (props: CardStockInfoProps) => {

  const GRAPH_DATA = {
    labels: [],
    datasets: [{
      label: '',
      data: [],
      backgroundColor: [],
      borderWidth: 0
    }]
  }

  const [graphData, setGraphData] = useState<graphData>(GRAPH_DATA)
  const [loading, setLoading] = useState(true)
  
  const addGraph = useCallback(() => {

    const variant = 
      Number(props.globalQuote['Global Quote']['10. change percent']?.replace('%', ''))

    const data: graphData = {
      labels: [
        `${variant < 0 ? 'Negativa(%)' : 'Positiva(%)'}`,
      ],
      datasets: [{
        label: 'Test',
        data: [variant, (variant < 0 ? -100 : 100) - variant],
        backgroundColor: [
          `${variant < 0 ? 'rgb(231, 78, 78)' : 'rgb(54, 235, 54)'}`,
          'rgb(67, 158, 211)',
        ],
        borderWidth: 0
      }],
    }

    setGraphData(data)

  }, [props])

  const loadData = useCallback( async () => {
    setLoading(true)

    await Promise.all([addGraph()])

    setLoading(false)
  }, [addGraph])

  useEffect(() => {
    loadData()
  }, [loadData])

  if(loading) {
    return (
      <></>
    )
  }

  return (
    <Doughnut 
      data={graphData}
      className="graph"
      options={{maintainAspectRatio: false , layout: {padding: { bottom: 50 }}}}
      width={300}
      height={300}
    />
  )
}

export default DoughnutChart