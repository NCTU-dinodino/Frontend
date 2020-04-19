
import React from 'react'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import axios from 'axios'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import Router from './Router'
import Reducers from './Redux'
import { update_timer_signal } from './Redux/Index/Actions'

const theme = createMuiTheme({
  breakpoints: { // use bootstrap breakpoint value
    values: {
      xs: 0,
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200,
    }
  }
})

const store = createStore(Reducers, applyMiddleware(thunk))
const { dispatch } = store

// 在 response 回來後更新 timer signal，讓自動登出重新計時
axios.interceptors.response.use(
  (response) => {
    dispatch(update_timer_signal(true))
    return response
  }
)

function App () {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <Router />
      </Provider>
    </MuiThemeProvider>
  )
}

export default App
