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
    padding: 10px;
    width: 30%;
    height: 20%;
    background-color: #f9f9f9;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
`

export const Content = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 5px;

  & h2 {
    text-align: center;
    margin-left: 50px;
  }

  & button {
    align-content: flex-end;
    border: 0;
    background-color: transparent;
    cursor: pointer;
    font-size: 22px;
  }
`

