import { lighten } from 'polished';
import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 5px;
`

export const GraphContainer = styled.div`
  height: 35vh;
  background: #fff;
  border-radius: 0 8px 8px 8px;
  box-shadow: 0 3px 3px rgba(0,0,0, 0.3);
`

export const ChartTypeFilter = styled.div`
  display: flex;
  background: #fff;
  height: 30px;
  width: 40%;
  border-radius: 8px 8px 0 0 ;
  box-shadow: 0 3px 3px rgba(0,0,0, 0.3);
  justify-content: space-around;
  align-items: center;
  text-align: center;

  & div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
    color: #a0a0a0;
    height: 100%;
    border-bottom: solid 1px #a0a0a0;
    transition: 0.2s;

    &:hover {
      cursor: pointer;
      border-bottom: solid 1px #835afd;
      color: #835afd;
    }

    &.select-day ,
    &.select-week,
    &.select-month{
      color: #fff;
      background: ${lighten(0.15,'#835afd')};
      border-bottom: solid 2px #835afd;

      &.select-day {
        border-radius: 8px 0 0 0 ;
      }

      &.select-month {
        border-radius: 0 8px 0 0 ;
      }
    }
  }
`