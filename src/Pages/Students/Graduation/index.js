
import React from 'react'
import { connect } from 'react-redux'
import { Grid, Hidden } from '@material-ui/core'
import Summary from './Summary'
import CardGroup from './CardGroup'
import { ResponsiveContainer } from '../../../Components/Responsive'
import {
  getGraduationInfo,
  moveCourseDone
} from '../../../Redux/Students/Actions/Graduation'
import { FETCHING_STATUS } from '../../../Utils/constant'

class Index extends React.Component {
  componentDidMount () {
    window.alert('請注意，共同課程(外語+通識)至多只能採計40學分')
  }

  componentDidUpdate (prevProps) {
    // 判斷課程移動成功與否，成功就重新抓取課程資料，失敗則顯示訊息
    // moveGroupButton 會在點下移動後 unmount，所以把判斷寫在這邊
    if (this.props.moveStatus !== prevProps.moveStatus &&
        this.props.moveStatus === FETCHING_STATUS.DONE) {
      if (this.props.moveSuccess) {
        this.props.getGraduationInfo()
      } else {
        window.alert(this.props.moveFailReason)
      }
      this.props.moveCourseDone()
    }
  }

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

const mapStateToProps = (state) => ({
  moveSuccess: state.Student.Graduation.moveCourse.success,
  moveFailReason: state.Student.Graduation.moveCourse.reason,
  moveStatus: state.Student.Graduation.moveCourse.status
})

const mapDispatchToProps = (dispatch) => ({
  getGraduationInfo: () => dispatch(getGraduationInfo()),
  moveCourseDone: () => dispatch(moveCourseDone())
})

export default connect(mapStateToProps, mapDispatchToProps)(Index)
