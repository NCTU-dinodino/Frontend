
import React from 'react'
import { Grid, Hidden } from '@material-ui/core'
import OverViewSummary from './OverViewSummary'
import OverViewCard from './OverViewCard'
import { ResponsiveContainer } from '../../../Components/Responsive'

const Index = props => (
  <ResponsiveContainer>
    <Grid item xs={12} container>
      <Hidden smDown>
        <Grid item md={12} style={{ marginTop: '30px' }}>
          <OverViewSummary />
        </Grid>
      </Hidden>
      <Hidden mdUp>
        <Grid item xs={12} style={{ marginTop: '30px' }}>
          <OverViewSummary mobile />
        </Grid>
      </Hidden>
      <Hidden smDown>
        <Grid item md={12} style={{ marginTop: '20px', marginBottom: '30px' }}>
          <OverViewCard />
        </Grid>
      </Hidden>
      <Hidden mdUp>
        <Grid item xs={12} container style={{ marginBottom: '30px' }}>
          <OverViewCard mobile />
        </Grid>
      </Hidden>
    </Grid>
  </ResponsiveContainer>
)

export default Index
