
import React from 'react'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import Router from './Router'
import Reducers from './Redux'

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
