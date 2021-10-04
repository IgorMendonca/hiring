import { lighten } from 'polished'
import styled from 'styled-components'

export const Container = styled.div`
  background: #fff;
  margin: 5px;
  box-shadow: 0 3px 3px rgba(0,0,0, 0.3);
  border-radius: 8px;
  width: 30vh;
  height: 20vh;
  transition: 0.3s;

  &:hover {
    background: ${lighten(0.2,'#835afd')};
    cursor: pointer;
  }
`

export const Content = styled.div`
  width: 100%;
  padding: 5px;
  height: 20vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  & div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`
