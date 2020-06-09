import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
// import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { StylesProvider, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  typography: {
    fontFamily: 'Noto Serif KR, serif',
  },
});

ReactDOM.render(
  // material-ui 와 styled-components 같이 사용해야할때 <StylesProvider injectFirst>를 선언해줘야 함.
  <MuiThemeProvider theme={theme}>
  <StylesProvider injectFirst>
      <BrowserRouter>
        <React.StrictMode>
          <App/>
        </React.StrictMode>
      </BrowserRouter>
  </StylesProvider>
  </MuiThemeProvider>

  , document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
serviceWorker.register();
