import 'react-app-polyfill/stable'
import 'core-js'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { Provider } from 'react-redux'
import store from './store'
import {
  QueryClient,
  QueryClientProvider
} from "react-query"
import { ToastContainer } from 'react-toastify'

const queryClient = new QueryClient()
ReactDOM.render(
  <QueryClientProvider client={queryClient} >
    <Provider store={store}>
      <ToastContainer />
      <App />
    </Provider>
  </QueryClientProvider>,
  document.getElementById('root'),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
