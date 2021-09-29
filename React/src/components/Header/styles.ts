import styled from 'styled-components'
import { darken } from 'polished'

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: #835afd;
  height: 3rem;

`
export const HomeButton = styled.div`
  transition: 0.3s;
  color: #f8f8f8;

  :hover {
    cursor: pointer;
    color: ${darken(0.05, '#f8f8f8')};
  }
`

export const Portfolio = styled.div`
  padding: 5px;
  display: flex;
  align-items: center;
  height: 100%;
  transition: 0.3s;

  :hover {
    cursor: pointer;
    background: ${darken(0.03, '#835afd')};

  }

  & h2 {
    color: #f8f8f8;
  }
`

