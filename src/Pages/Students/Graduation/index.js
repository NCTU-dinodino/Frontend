
import React from 'react'
import { Grid, Hidden } from '@material-ui/core'
import Summary from './Summary'
import CardGroup from './CardGroup'
import { ResponsiveContainer } from '../../../Components/Responsive'

class Index extends React.Component {
  // componentDidMount () {
  //   window.alert('請注意，共同課程(外語+通識)至多只能採計40學分')
  // }

  render () {
    return (
      <ResponsiveContainer>
        <Grid item xs={12} container>
          <Hidden smDown>
            <Grid item md={12} style={{ marginTop: '30px' }}>
              <Summary />
            </Grid>
          </Hidden>
          <Hidden mdUp>
            <Grid item xs={12} style={{ marginTop: '30px' }}>
              <Summary mobile />
            </Grid>
          </Hidden>
          <Hidden smDown>
            <Grid item md={12} style={{ marginTop: '20px', marginBottom: '30px' }}>
              <CardGroup />
            </Grid>
          </Hidden>
          <Hidden mdUp>
            <Grid item xs={12} container style={{ marginBottom: '30px' }}>
              <CardGroup mobile />
            </Grid>
          </Hidden>
        </Grid>
      </ResponsiveContainer>
    )
  }
}

export default Index
