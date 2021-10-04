import { darken, lighten } from 'polished'
import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 5px;
`

export const AddCompare = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  & h2 {
    color: #a0a0a0
  }
`

export const AddButton = styled.button`
  margin-left: 10px;
  padding-top: 5px;
  height: 40px;
  width: 40px;
  border: none;
  border-radius: 50%;
  transition: 0.2s;
  color: ${lighten(0.12, '#835afd')};

  :hover {
    cursor: pointer;
    background: ${darken(0.03, '#eee')};
  }
`

export const GraphContainer = styled.div`
  display: flex;
  width: 100%;
  background: #fff;
  border-radius: 8px 8px 8px 8px;
  box-shadow: 0 3px 3px rgba(0,0,0, 0.3);
  padding: 5px;
  justify-content: space-around;
`

export const StockCompareInfo = styled.div`
  & div {
    display: flex;
    align-items: center;

    
    & p {
      margin: 5px;
      color: #a0a0a0;
    }

    .below {
      color: #008000;
    }

    .above {
      color: #FF0000;
    }
  }

`

export const ButtonClose = styled.button`
  color: ${lighten(0.2, '#ff0000')};
  border: none;
  background: #fff;
  transition: 0.2s;
  
  &:hover {
    color: #ff0000;
    cursor: pointer;
  }
`