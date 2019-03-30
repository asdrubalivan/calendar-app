import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  *, *::after, *::before {
      margin: 0;
      padding: 0;
      box-sizing: inherit;
  }
  body {
    box-sizing: border-box;
    > div {
      overflow-x: hidden;
    }
  }
  html {
    font-size: 62.5%;
  }
`

export default GlobalStyle
