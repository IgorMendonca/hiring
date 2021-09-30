import { Chart } from 'react-google-charts'
import { GraphContainer } from './styles'

const LineChart = () => {

  return (
    <GraphContainer>
      <Chart
        style={{borderRadius: 8, padding: 8}}
        width={'900px'}
        height={'200px'}
        chartType="LineChart"
        loader={<div>Loading Chart</div>}
        data={[
          ['x', 'dogs'],
          [0, 0],
          [1, 10],
          [2, 23],
          [3, 17],
          [4, 18],
          [5, 9],
          [6, 11],
          [7, 27],
          [8, 33],
          [9, 40],
          [10, 32],
          [11, 35],
        ]}
        options={{
          hAxis: {
            title: 'Time',
          },
          vAxis: {
            title: 'Popularity',
          },
        }}
        rootProps={{ 'data-testid': '1' }}
      />
    </GraphContainer>
    
      
  )
} 

export default LineChart