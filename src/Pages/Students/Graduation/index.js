
import React from 'react'
import { connect } from 'react-redux'
import { Grid, Hidden } from '@material-ui/core'
import OverViewSummary from './OverViewSummary'
import OverViewCard from './OverViewCard'
import PrintForm from './OverViewSummary/PrintForm'
import { ResponsiveContainer } from '../../../Components/Responsive'

class Index extends React.Component {
  render () {
    return (
      <ResponsiveContainer>
        <Grid item xs={12} container className='showArea'>
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
        <div className='printArea'>
          <PrintForm
            profile={this.props.studentIdcard}
            idCard={this.props.idCard}
            assis={this.props.assis}
            reviewData={this.props.reviewData}
            reviewCheck={this.props.reviewCheck}
            generalCourseSelect={this.props.generalCourseSelect}
          />
        </div>
      </ResponsiveContainer>
    )
  }
}

const mapStateToProps = (state) => ({
  reviewData: state.Student.Graduation.detail.data,
  studentIdcard: state.Student.User.studentIdcard,
  englishCheck: state.Student.Graduation.english.check,
  idCard: state.Student.Graduation.assistant.idCard,
  assis: state.Student.Graduation.assistant.using,
  reviewCheck: state.Student.Graduation.getReview.check,
  generalCourseSelect: state.Student.Graduation.getReview.generalCourseSelect
})

const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(Index)
