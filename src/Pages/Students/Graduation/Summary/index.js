
import React from 'react'
import { connect } from 'react-redux'
import CircularProgressbar from 'react-circular-progressbar'
import { withStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'
import MenuButtonGroup from './MenuButtonGroup'
import DetailProgress from './DetailProgress'
import ProfessionalGroupMenu from './ProfessionalGroupMenu'

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
  creditProgressRow: {
    marginBottom: 20
  },
  square: {
    width: 10,
    height: 10,
    margin: 7
  },
  red: {
    backgroundColor: '#d93a64'
  },
  green: {
    backgroundColor: '#3aa276'
  },
  grey: {
    backgroundColor: 'grey'
  },
  yellow: {
    backgroundColor: '#a29149'
  },
  purple: {
    backgroundColor: '#6A94A2'
  },
  blue: {
    backgroundColor: '#9e48d9'
  },
  text: {
    color: '#7B7B7B',
    fontFamily: 'Noto Sans CJK TC'
  }
})

const CreditProgress = ({ overview }) => (
  <CircularProgressbar
    percentage={100 * overview.total / overview.total_require}
    text={`畢業 ${overview.total}/${overview.total_require}`}
    initialAnimation
    styles={{
      path: { stroke: '#34855e' },
      text: { fill: '#34855e', fontSize: '12px' }
    }}
  />
)

const ColorInstruction = withStyles(styles)(({ classes, color, text }) => (
  <React.Fragment>
    <div className={`${classes.square} ${color}`} />
    <div className={classes.text}>{ text }</div>
  </React.Fragment>
))

const Index = ({ overview, reviewStatus, englishStatus, forAssistant, idCard, classes, mobile }) => {
  const reviewStatusText = {
    '0': '未送審',
    '1': '審核中',
    '2': '審核通過',
    '3': '審核不通過'
  }[reviewStatus]

  const englishStatusText = {
    '0': '未考過英檢',
    '1': '通過外語榮譽學分（可免修外語）',
    '2': '已通過英檢免試申請',
    '3': '已考過英檢',
    '4': '已考過英檢'
  }[englishStatus]

  if (mobile) return (
    <React.Fragment>
      <Grid item xs={12} container justify='center' className={classes.creditProgressRow}>
        <Grid item xs={6} sm={4}>
          <CreditProgress overview={overview} />
        </Grid>
      </Grid>
      <Grid item xs={12} container>
        <Grid item xs={8} container>
          <Grid item xs={12} container alignItems='center'>
            <ColorInstruction color={classes.green} text='已通過' />
            <ColorInstruction color={classes.red} text='未通過' />
            <ColorInstruction color={classes.grey} text='未修課' />
          </Grid>
          <Grid item xs={12} container alignItems='center'>
            <ColorInstruction color={classes.yellow} text='未抵免' />
            <ColorInstruction color={classes.purple} text='免修或抵免' />
            <ColorInstruction color={classes.blue} text='當期' />
          </Grid>
        </Grid>
        <Grid item xs={4} container justify='flex-end' alignItems='center'>
          <ProfessionalGroupMenu size='small' />
        </Grid>
      </Grid>
      <Grid item xs={12} container className={classes.reviewRowMobile}>
        <Grid item xs={10}>
          <div>是否已考過英檢：{ englishStatusText }</div>
          <div>
            畢業預審是否已送交助理審核：
            <span style={{ color: 'red' }}>{ reviewStatusText }</span>
          </div>
        </Grid>
        <Grid item xs={2} container justify='flex-end'>
          <MenuButtonGroup />
        </Grid>
      </Grid>
    </React.Fragment>
  )
  return (
    <React.Fragment>
      <Grid item md={12} container alignItems='center'>
        <ColorInstruction color={classes.green} text='已通過' />
        <ColorInstruction color={classes.red} text='未通過' />
        <ColorInstruction color={classes.grey} text='未修課' />
        <ColorInstruction color={classes.yellow} text='未抵免' />
        <ColorInstruction color={classes.purple} text='免修或抵免' />
        <ColorInstruction color={classes.blue} text='當期' />
      </Grid>
      <Grid item md={12} container className={classes.reviewRow}>
        <Grid item md={9}>
          {
            // 給助理端看學生身份
            forAssistant &&
            <div style={{ color: '#6e0000' }}>
              {idCard.sname}&nbsp;&nbsp;&nbsp;&nbsp;
              {idCard.program}&nbsp;&nbsp;&nbsp;&nbsp;
              {idCard.id}
            </div>
          }
          <div>是否已考過英檢：{ englishStatusText }</div>
          <div>
            畢業預審是否已送交助理審核：
            <span style={{ color: 'red' }}>{ reviewStatusText }</span>
          </div>
        </Grid>
        <Grid item md={3} container justify='flex-end' alignItems='center'>
          <ProfessionalGroupMenu />
          <MenuButtonGroup />
        </Grid>
      </Grid>
      <Grid item md={12} spacing={24} container alignItems='center'>
        <Grid item md={3} lg={2}>
          <CreditProgress overview={overview} />
        </Grid>
        <Grid item md={9} lg={10}>
          <DetailProgress overview={overview} />
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

const mapStateToProps = (state) => ({
  overview: state.Student.Graduation.detail.overview,
  reviewStatus: state.Student.Graduation.getReview.status,
  englishStatus: state.Student.Graduation.english.status,
  idCard: state.Student.Graduation.assistant.idCard,
  forAssistant: state.Student.Graduation.assistant.using
})

const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Index))
