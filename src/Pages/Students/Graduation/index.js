
import React from 'react'
import { connect } from 'react-redux'
import { Grid, Hidden } from '@material-ui/core'
import OverViewSummary from './OverViewSummary'
import OverViewCard from './OverViewCard'
import { ResponsiveContainer } from '../../../Components/Responsive'

class Index extends React.Component {
  render () {
    return (
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
          <div className=' col-md-12 col-lg-12 pull-left hidden-xs' style={{ marginTop: '20px' }}>
            <OverViewCard studentIdcard={this.props.studentIdcard} />
          </div>
          <div className=' col-xs-12 visible-xs' style={{ marginTop: '20px' }}>
            <OverViewCard rwd studentIdcard={this.props.studentIdcard} />
          </div>
        </Grid>
      </ResponsiveContainer>
    )
  }
}

const mapStateToProps = (state) => ({
  studentIdcard: state.Student.User.studentIdcard
})

const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(Index)
