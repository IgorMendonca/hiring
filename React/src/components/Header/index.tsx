import { HeaderContainer, HomeButton, Portfolio } from "./styles";
import { AiFillHome } from 'react-icons/ai'
import { useHistory } from "react-router";

export function Header() {
  const history = useHistory()

  return (
    <HeaderContainer>
      <HomeButton onClick={() => history.push('/')}>
        <AiFillHome size={32}/>
      </HomeButton>
      <Portfolio>
        <h2>Portfólio</h2>
      </Portfolio>
    </HeaderContainer>
  )
}