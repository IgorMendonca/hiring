import { darken } from 'polished'
import styled from 'styled-components'

export const InfoBar = styled.div`
  position: relative;
  margin: 10px 5px 0 5px;
  background: #fff;
  height: 25vh;
  width: 45vh;
  border-radius: 8px 8px 0 0;
  box-shadow: 0 0 3px rgba(0,0,0, 0.3);

  > div {
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    
  }
`

export const Title = styled.p`
  font-size: 40px;
  color: #a0a0a0;
  font-weight: 100;
`

export const Prices = styled.div`
  max-width: 45vh;
  margin-top: 5px;
  display: flex;
  justify-content: space-around;

  & div {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 5px;

    & p {
      font-size: 14px;
    }

    & span {
      border-radius: 8px;
      font-size: 12px;
      border: solid 1px;
      padding: 2px 5px;
    }
  }
`

export const StockTradingDateInfo = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;

  & span {
    font-size: 14px;
    color: #a0a0a0
  }

  & p {
    margin-top: 5px;
    color: #a0a0a0
  }
`

export const FavoriteStock = styled.div`
  margin: 0 5px 5px 5px;
`

export const ButtonAddPortfolio = styled.button`
  box-shadow: 0 3px 3px rgba(0,0,0, 0.3);
  border-radius: 0 0 8px 8px;
  background: #835afd;
  width: 100%;
  padding: 5px;
  border: none;
  color: #eee;
  transition: 0.3s;

  &:hover {
    background: ${darken(0.1, '#835afd')};
    cursor: pointer;
  }

`