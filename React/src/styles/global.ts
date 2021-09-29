import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
  }

  body {
    height: 100%;
    color: #29292e;
    background: #f8f8f8;

  }

  body, input, button {
    font: 400 16px Roboto, sans-serif, Helvetica;
  }

`
