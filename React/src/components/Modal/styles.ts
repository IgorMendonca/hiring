import { darken } from 'polished'
import styled from 'styled-components'

export const ModalContainer = styled.div`
  z-index: 999;
  width: 100%;
  height: 100%;
  flex: 1;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.4);
`

export const Container = styled.div`
    color: #29292e;
    width: 60%;
    height: 80%;
    background-color: #f9f9f9;
    border-radius: 6px;
    display: flex;
    flex-direction: column;
    
`

export const ContentHeader = styled.div`
  margin-bottom: 15px;
  background: #835afd;
  color: ${darken(0.1,'#f9f9f9')};
  border-radius: 4px 4px 0 0;
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding: 10px 0;

  & button {
    display: flex;
    align-items: center;
    padding: 8px;
    margin-right: 8px;
    color: #c1c1c1;
    border: 0;
    background-color: transparent;
    cursor: pointer;
    font-size: 20px;
    transition: 0.2s;
    border-radius: 50%;

    :hover {
      background: ${darken(0.03, '#835afd')};
      color: ${darken(0.1,'#f9f9f9')};
    }
  }
`

export const Title = styled.p`
  margin-left: 15px;
  font-size: 20px;
  font-weight: 400px;
`

export const Content = styled.div`
  overflow: auto;
  display: flex;
  justify-content: space-around;
  margin-bottom: 15px;

`

export const ContentStock = styled.div`
  display: grid;
  grid-template-columns: 2fr 2fr;
`


export const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 15px;

`

export const FilterInput = styled.input`
  margin-left: 15px;
  padding: 10px;
  height: 30px;
  width: 40%;
  border-radius: 3px 0 0 3px;
  border: solid 0.02px #dcdcdc;
  color: #29292e;
  transition: 0.3s;

  :hover {
    border: solid 1px #835afd;
  }

  :focus {
    outline: 0;
  }
`

export const SearchFilterButton = styled.button`
  padding-top: 5px;
  height: 30px;
  width: 30px;
  border: none;
  background: #835afd;
  border-radius: 0 3px 3px 0;
  transition: 0.2s;
  color: #f9f9f9;

  :hover {
    cursor: pointer;
    background: ${darken(0.03, '#835afd')};
  }
`
