import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  html {
    height: 100%;
  }

  body {
    overflow: auto !important;
    height: 100%;
    select::-ms-expand {
      display: none;
    }
    input::-webkit-input-placeholder {
      color: rgba(0,0,0,0.35);
     }
     input:-moz-placeholder {
      color: rgba(0,0,0,0.35);
     }
     input::-moz-placeholder {
      color: rgba(0,0,0,0.35);
     }
    -webkit-text-size-adjust: 100%;
    -ms-text-size-adjust: 100%;
    -ms-overflow-style: scrollbar;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    -webkit-font-smoothing: antialiased;
    overflow: hidden;
    margin: 0;
    font-family: Graphik, -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  }

  button {
    font-family: Graphik, -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  }
  input {
    font-family: Graphik, -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  }
  #app {
    height: 100%;
    overflow: auto;
  }
`;
