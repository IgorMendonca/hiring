
import {IoMdCloseCircleOutline} from 'react-icons/io'
import { Container, Content, ModalContainer } from './styles';

export function Modal({ id='modal', onClose = () => {}, children}: any) {
  const handleOutsideClick = (e: any) => {
    if(e.target.id === id) onClose();
  }
 
  return (
    <ModalContainer id={id} onClick={handleOutsideClick}>
      <Container>
        <Content>
          <h2>{children}</h2>
          <button onClick={onClose} ><IoMdCloseCircleOutline /></button>
        </Content>
      </Container>
    </ModalContainer>
  )
}