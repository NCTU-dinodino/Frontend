
import React from 'react'
import { connect } from 'react-redux'
import CircularProgressbar from 'react-circular-progressbar'
import { withStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'
import RwdIconButton from './RwdIconButton'
import DetailProgressBar from './DetailProgressBar'
import ProfessionalGroupBtn from './ProfessionalGroupBtn'

const styles = theme => ({
  reviewRow: {
    padding: 19,
    marginTop: 10,
    marginBottom: 20,
    border: '1px solid #e3e3e3',
    borderRadius: 4,
    color: 'grey'
  },
  reviewRowMobile: {
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    border: '1px solid #e3e3e3',
    borderRadius: 4,
    color: 'grey'
  },
  circularProgressbarRow: {
    marginBottom: 20
  }
})

const reviewStatus = {
  '0': '未送審',
  '1': '審核中',
  '2': '審核通過',
  '3': '審核不通過'
}
const englishStatus = {
  '0': '未考過英檢',
  '1': '通過外語榮譽學分（可免修外語）',
  '2': '已通過英檢免試申請',
  '3': '已考過英檢',
  '4': '已考過英檢'
}

const Index = ({ check, englishCheck, overview, assis, idCard, classes, rwd }) => {
  if (rwd) return (
    <React.Fragment>
      <Grid item xs={12} container justify='center' className={classes.circularProgressbarRow}>
        <Grid item xs={6} sm={4}>
          <CircularProgressbar
            percentage={100 * overview.total / overview.total_require}
            text={`畢業 ${overview.total}/${overview.total_require}`}
            initialAnimation
            styles={{
              path: { stroke: '#34855e' },
              text: { fill: '#34855e', fontSize: '12px' }
            }}
          />
        </Grid>
      </Grid>
      <Grid item xs={12} container>
        <Grid item xs={8} container>
          <Grid item xs={12} container alignItems='center'>
            <div className='green' /><div className='text'>已通過</div>
            <div className='red' /><div className='text'>未通過</div>
            <div className='gray' /><div className='text'>未修課</div>
          </Grid>
          <Grid item xs={12} container alignItems='center'>
            <div className='yellow' /><div className='text'>未抵免</div>
            <div className='purple' /><div className='text'>免修或抵免</div>
            <div className='blue' /><div className='text'>當期</div>
          </Grid>
        </Grid>
        <Grid item xs={4} container justify='flex-end' alignItems='center'>
          <ProfessionalGroupBtn size='small' />
        </Grid>
      </Grid>
      <Grid item xs={12} container className={classes.reviewRowMobile}>
        <Grid item xs={10}>
          <div>是否已考過英檢：{ englishStatus[englishCheck] }</div>
          <div>
            畢業預審是否已送交助理審核：
            <span style={{ color: '#FF0000' }}>{ reviewStatus[check] }</span>
          </div>
        </Grid>
        <Grid item xs={2} container justify='flex-end'>
          <RwdIconButton />
        </Grid>
      </Grid>
    </React.Fragment>
  )
  return (
    <React.Fragment>
      <Grid item md={12} container alignItems='center'>
        <div className='green' /><div className='text'>已通過</div>
        <div className='red' /><div className='text'>未通過</div>
        <div className='gray' /><div className='text'>未修課</div>
        <div className='yellow' /><div className='text'>未抵免</div>
        <div className='purple' /><div className='text'>免修或抵免</div>
        <div className='blue' /><div className='text'>當期</div>
      </Grid>
      <Grid item md={12} container className={classes.reviewRow}>
        <Grid item md={9}>
          {
            // 給助理端看學生身份
            assis &&
            <div style={{ color: '#6e0000' }}>
              {idCard.sname}&nbsp;&nbsp;&nbsp;&nbsp;
              {idCard.program}&nbsp;&nbsp;&nbsp;&nbsp;
              {idCard.id}
            </div>
          }
          <div>是否已考過英檢：{ englishStatus[englishCheck] }</div>
          <div>
            畢業預審是否已送交助理審核：
            <span style={{ color: '#FF0000' }}>{ reviewStatus[check] }</span>
          </div>
        </Grid>
        <Grid item md={3} container justify='flex-end' alignItems='center'>
          <ProfessionalGroupBtn />
          <RwdIconButton />
        </Grid>
      </Grid>

      <Grid item md={12} spacing={24} container alignItems='center'>
        <Grid item md={3} lg={2}>
          <CircularProgressbar
            percentage={100 * overview.total / overview.total_require}
            text={`畢業 ${overview.total}/${overview.total_require}`}
            initialAnimation
            styles={{
              path: { stroke: '#34855e' },
              text: { fill: '#34855e', fontSize: '12px' }
            }}
          />
        </Grid>
        <Grid item md={9} lg={10}>
          <DetailProgressBar />
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

const mapStateToProps = (state) => ({
  overview: state.Student.Graduation.detail.overview,
  englishCheck: state.Student.Graduation.english.check,
  check: state.Student.Graduation.getReview.check,
  idCard: state.Student.Graduation.assistant.idCard,
  assis: state.Student.Graduation.assistant.using
})

const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Index))
