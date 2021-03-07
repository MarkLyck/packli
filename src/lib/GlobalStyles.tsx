import { Global, css } from '@emotion/react'

const GlobalStyles = () => (
  <Global
    styles={css`
      body,
      html {
        padding: 0;
        margin: 0;
        height: 100%;
      }

      #__next {
        height: 100%;
      }
      body {
        font-family: Roboto, sans-serif;
        height: 100%;
      }

      .ant-progress-inner {
        background-color: #f7f9fc;
      }
    `}
  />
)

export default GlobalStyles
