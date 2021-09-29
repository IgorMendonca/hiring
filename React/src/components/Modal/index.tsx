
import { MdClose } from 'react-icons/md'
import { Container, Content, ModalContainer, Title } from './styles';

interface ModalProps {
  id: string;
  onClose: () => void;
  children: any
}

export function Modal(props: ModalProps) {
  const handleOutsideClick = (e: any) => {
    if(e.target.id === props.id) props.onClose();
  }
 
  return (
    <ModalContainer id={props.id} onMouseDown={handleOutsideClick}>
      <Container>
        <Content>
          <Title>Buscar ações</Title>
          <button onClick={props.onClose} ><MdClose /></button>
        </Content>
        {props.children}
      </Container>
    </ModalContainer>
  )
}