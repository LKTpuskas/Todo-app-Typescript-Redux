import * as React from 'react';
import * as ReactDOM from "react-dom";
// import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import Store from './store/Store'
import App from './components/app/App'
import * as serviceWorker from './serviceWorker'
import { Global, css } from '@emotion/core'

const { store } = Store()

ReactDOM.render(
  <Provider store={store}>
   {/*  <PersistGate loading={null} persistor={persistor}> */}
      <Global
        styles={css`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Montserrat', sans-serif;
          }
        `}
      />
      <App title={''}/>
{/*     </PersistGate> */}
  </Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()