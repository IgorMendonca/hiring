import styled from 'styled-components'

export const Container = styled.div`
  background: #eee;
  min-height: 100vh;
  width: 100%;
`
export const FavoritesContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`
export const FavoritesGrid = styled.div`
  width: 70%;
  padding: 5%;
  display: grid;
  grid-template-columns: 2fr 2fr 2fr 2fr;
`

export const WithoutData = styled.div`
  width: 100%;
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
`