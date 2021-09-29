import styled from 'styled-components'
import { darken } from 'polished'

export const Page = styled.div`
  height: 100vh;
`

export const Container = styled.div`
  flex-direction: column;
  display: flex;
  height: 100%;
`

export const SearchStockContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;

`

export const SearchStockContent = styled.div`
  max-width: 600px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  display: flex;
  flex: 1;
`

export const SearchStock = styled.div`
  width: 100%;
  justify-content: center;
  display: flex;
  flex: 1;
`

export const TextFieldInput = styled.input`
  padding: 10px;
  height: 50px;
  width: 60%;
  border-radius: 8px 0 0 8px;
  border: solid 0.02px #dcdcdc;
  box-shadow: 0 3px 3px rgba(0,0,0, 0.3);
  color: #29292e;

  :focus {
    outline: 0;
  }
`

export const SearchButton = styled.button`
  padding-top: 5px;
  height: 50px;
  width: 50px;
  border: none;
  background: #835afd;
  border-radius: 0 8px 8px 0;
  box-shadow: 0 3px 3px rgba(0,0,0, 0.3);
  transition: 0.2s;
  color: #f9f9f9;

  :hover {
    cursor: pointer;
    background: ${darken(0.03, '#835afd')};
  }

`