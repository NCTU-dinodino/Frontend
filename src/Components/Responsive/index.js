
import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'

const styles = theme => ({
  container: {
    width: '100%',
    paddingLeft: 15,
    paddingRight: 15,
    [theme.breakpoints.up('sm')]: {
      maxWidth: 540
    },
    [theme.breakpoints.up('md')]: {
      maxWidth: 720
    },
    [theme.breakpoints.up('lg')]: {
      maxWidth: 960
    },
    [theme.breakpoints.up('xl')]: {
      maxWidth: 1140
    }
  }
})

const ResponsiveContainer = withStyles(styles)(({ children, classes }) => (
  <Grid container justify='center'>
    <Grid item container className={classes.container}>
      { children }
    </Grid>
  </Grid>
))

export { ResponsiveContainer }
