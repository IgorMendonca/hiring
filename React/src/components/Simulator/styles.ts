import { darken } from 'polished'
import styled from 'styled-components'

export const Container = styled.div`
  height: 10vh;
  display: flex;
  justify-content: center;
`

export const SimulatorContainer = styled.div`
  width: 90%;
  padding: 5px;
  display: flex;
  align-items: center;

  & p {
    color: #29292e;
    font-size: 20px;
  }

  & strong {
    margin: 0 10px;
  }

  .gains {
    color: #008000;
  }

  .losses {
    color: #ff0000;
  }
`

export const PurchasesNumberInput = styled.input`
  margin: 0 15px;
  padding: 10px;
  height: 30px;
  width: 20%;
  border-radius: 6px;
  border: solid 0.02px #dcdcdc;
  color: #29292e;
  transition: 0.3s;
  box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);

  :hover {
    border-bottom: solid 1px #835afd;
  }

  :focus {
    border-bottom: solid 1px #835afd;
    outline: 0;
  }
`

export const CalculateButton = styled.button`
  margin: 0 5px;
  border-radius: 4px;
  padding: 5px;
  color: #f8f8f8;
  border: none;
  background: #835afd;
  transition: 0.3s;

  &:hover{
    background: ${darken(0.1,'#835afd')};
    cursor: pointer;
  }
`