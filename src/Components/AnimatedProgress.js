import React from 'react'
import LinearProgress from 'material-ui/LinearProgress'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

const AnimatedProgress = ({ value, style }) => (
  <MuiThemeProvider>
    <LinearProgress
      value={isNaN(value) ? 0 : Math.min(100, value)}
      color={(value >= 100) ? '#00AEAE' : '#d93a64'}
      mode='determinate'
      style={style}
    />
  </MuiThemeProvider>
)

export default AnimatedProgress
