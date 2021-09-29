import { darken } from 'polished'
import styled from 'styled-components'

export const ModalContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
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

export const Content = styled.div`
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

