import { lighten } from 'polished'
import styled from 'styled-components'

export const Card = styled.div`
  padding: 10px;
  height: 100px;
  width: 350px;
  background: #fff;
  margin: 10px;
  transition: 0.3s;
  box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);

  &:hover {
    background: ${lighten(0.3,'#835afd')};
    cursor: pointer;
  }
`

export const TitleStock = styled.div`
  margin-bottom: 5px;
  width: 100%;
  flex: 1;
  display: flex;
  justify-content: center;

  & h3 {
    color: #29292e;
    font-weight: 100;
  }
`

export const CartContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 70%;

  > p {
    text-align: center;
    font-size: 14px;
    font-weight: bold;
  }

  > div {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }
`

export const InfoStock = styled.div`  
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`