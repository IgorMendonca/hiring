import { AddButton, AddCompare, ButtonClose, Container, GraphContainer, StockCompareInfo } from "./styles"
import { IoAddSharp } from 'react-icons/io5'
import { IoCloseCircleOutline } from 'react-icons/io5'
import { useGlobalQuote } from "../../hooks/useGlobalQuote"
import { useEffect, useState } from "react"
import { globalQuote } from "../../interfaces/GlobalQuote"
import Chart from "react-google-charts"
import produce from "immer"

interface CardStockInfoProps {
  callModal: () => void
  stocksCompare: globalQuote[]
  removeItemToCompare: (index: number) => void
}

const CompareBarChart = (props: CardStockInfoProps) => {
  const {globalQuote} = useGlobalQuote()

  const [stocksCompare, setStocksCompare] = useState<globalQuote[]>(props.stocksCompare)
  const [dataGraph, setDataGraph] = useState<any[]>(
    [
      ['ação', 'baixa', 'preço', 'alta'],
      [
        globalQuote["Global Quote"]["01. symbol"],
        Number(Number(globalQuote["Global Quote"]["04. low"]).toFixed(2)),
        Number(Number(globalQuote["Global Quote"]["05. price"]).toFixed(2)),
        Number(Number(globalQuote["Global Quote"]["03. high"]).toFixed(2))
      ]
    ],

  )

  useEffect(() => {
    setDataGraph(state => (
      state = [
        ['ação', 'baixa', 'preço', 'alta'],
        [
          globalQuote["Global Quote"]["01. symbol"],
          Number(Number(globalQuote["Global Quote"]["04. low"]).toFixed(2)),
          Number(Number(globalQuote["Global Quote"]["05. price"]).toFixed(2)),
          Number(Number(globalQuote["Global Quote"]["03. high"]).toFixed(2))
        ]
      ]
    ))

    setStocksCompare(state => (
      state = props.stocksCompare
    ))

    stocksCompare.forEach(stock => {
      const arrTemp: any[] = []
      const x = stock["Global Quote"]["01. symbol"]
      const low = Number(Number(stock["Global Quote"]["04. low"]).toFixed(2))
      const price = Number(Number(stock["Global Quote"]["05. price"]).toFixed(2))
      const high = Number(Number(stock["Global Quote"]["03. high"]).toFixed(2))
  
      arrTemp.push(x, low, price, high)
  
      setDataGraph(data => 
        produce(data, (draft) => {
          draft.push(arrTemp)
        })
      )
    })
  }, [stocksCompare, props.stocksCompare, globalQuote])
  
  

  return(
    <Container>
      <AddCompare>
        <h2>Comparar</h2>
        <AddButton
          data-testid='compare-button'
          onClick={() => props.callModal()}
        >
        <IoAddSharp 
          size={30}
        />
        </AddButton>
      </AddCompare>
      {
        props.stocksCompare.length > 0 &&
        <GraphContainer>
          <StockCompareInfo>
            {
              stocksCompare.map((stock, index) => (
                <div
                  key={stock["Global Quote"]["01. symbol"]}
                >
                  <ButtonClose
                    onClick={() => {                     
                      props.removeItemToCompare(index)
                    }}
                  >
                    <IoCloseCircleOutline 
                      size={25}
                    />
                  </ButtonClose>
                  <p>
                    {stock["Global Quote"]["01. symbol"]}
                  </p>
                  <p>
                    ({Number(stock["Global Quote"]["05. price"]).toFixed(2)})
                  </p>
                  <p
                    className=
                    {
                      (Number(globalQuote["Global Quote"]["05. price"]) 
                      - Number(stock["Global Quote"]["05. price"])) <= 0 
                      ? 'below'
                      : 'above'
                    }                   
                  >
                    {
                      `Diferença: 
                      ${(Number(globalQuote["Global Quote"]["05. price"]) 
                      - Number(stock["Global Quote"]["05. price"])).toFixed(2).replace('-', '')}`
                    }
                  </p>
                </div>
               
              ))
            }
          </StockCompareInfo>
          <Chart
            style={{padding: 8}}
            width={'500px'}
            height={'150px'}
            chartType="Bar"
            loader={<div>Loading Chart</div>}
            data={dataGraph}
            rootProps={{ 'data-testid': '2' }}
          />
        </GraphContainer>
      }
      
    </Container>
  )
}

export default CompareBarChart