
import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import {
  Grid,
  LinearProgress,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Dialog,
  DialogContent,
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import CloseIcon from '@material-ui/icons/Close'
import AnimatedProgress from '../../../../../Components/AnimatedProgress'
import CourseList from './CourseList'
import GeneralCourseList from './GeneralCourseList'
import GeneralNewCourseList from './GeneralNewCourseList'

const styles = theme => ({
  container: {
    margin: '1%',
    fontFamily: 'Noto Sans CJK TC'
  },
  title: {
    fontSize: 20,
    marginLeft: 25
  },
  titleMobile: {
    padding: '20px 10px',
    margin: '10px 0',
    border: '1px solid #e3e3e3',
    fontSize: 14
  },
  dialogMobile: {
      minWidth: '65%'
  },
  appBar: {
    position: 'relative',
    backgroundColor: '#7c7c7c'
  },
  flex: {
    flex: 1
  },
  progress: {
    backgroundColor: '#00a152'
  },
  cardTitle: {
    display: 'inline-block',
    marginRight: 5
  }
})

const Title = withStyles(styles)(({ title, complete, require, unit, optional, classes }) => {
  // 抵免研究所、雙主修...
  if (optional) {
    return (
      <div>
        <div className={classes.cardTitle}>{ title }</div>
        <font size={5} color='#338d68'>{ complete }</font>
        <div className={classes.cardTitle} />
        { unit }
      </div>
    )
  }
  // 一般類別
  return (
    <div>
      <div className={classes.cardTitle}>{ title }</div>
      <font size={5} color='#338d68'>{ complete }</font>/
      <div className={classes.cardTitle}>{ require }</div>
      { unit }
    </div>
  )
})

class Index extends React.Component {
  constructor (props) {
    super(props)
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      open: false,
      expanded: true
    }
  }

  // for mobile
  handleOpen () {
    this.setState({ open: true })
  }

  handleClose () {
    this.setState({ open: false })
  }

  // for PC
  handleChange () {
    this.setState({ expanded: !this.state.expanded })
  }

  render () {
    const { classes, mobile } = this.props

    if (this.props.data === undefined) return null

    // for mobile
    if (mobile) {
      return (
        <React.Fragment>
          <Grid item xs={6} className={classes.titleMobile} onClick={this.handleOpen}>
            <Title
              title={this.props.title}
              complete={this.props.complete}
              require={this.props.require}
              optional={this.props.optional}
              unit={this.props.unit}
            />
            <AnimatedProgress value={this.props.value} />
          </Grid>

          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            PaperProps={{
              classes: {
               root: classes.dialogMobile
              }
            }}
          >
            <AppBar className={classes.appBar}>
              <Toolbar>
                <Typography variant='title' color='inherit' className={classes.flex}>
                  { this.props.title }
                </Typography>
                <IconButton color='inherit' aria-label='Close' onClick={this.handleClose}>
                  <CloseIcon />
                </IconButton>
              </Toolbar>
            </AppBar>
            <DialogContent>
              <Grid container style={{ marginTop: '24px' }}>
                {
                  this.props.title === '通識(舊制)'
                    ? <GeneralCourseList
                      courses={this.props.data.course}
                      title={this.props.title}
                      mobile
                    />
                    : this.props.title === '通識(新制)'
                      ? <GeneralNewCourseList
                        courses={this.props.data.course}
                        overview={this.props.data}
                        title={this.props.title}
                        mobile
                      />
                      : <CourseList
                        courses={this.props.data.course}
                        title={this.props.title}
                        mobile
                      />
                }
              </Grid>
            </DialogContent>
          </Dialog>
        </React.Fragment>
      )
    }

    // for PC
    return (
      <React.Fragment>
        <ExpansionPanel
          expanded={this.state.expanded}
          onChange={this.handleChange}
        >
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Grid container alignItems='center'>
              <Grid item md={3}>
                <LinearProgress
                  classes={{ barColorPrimary: classes.progress }}
                  variant='determinate'
                  value={this.props.value > 100 ? 100 : this.props.value}
                  color={this.props.value >= 100 ? 'primary' : 'secondary'}
                />
              </Grid>
              <Grid item md={4} className={classes.title}>
                <Title
                  title={this.props.title}
                  complete={this.props.complete}
                  require={this.props.require}
                  optional={this.props.optional}
                  unit={this.props.unit}
                />
              </Grid>
            </Grid>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid container alignItems='center'>
              {
                this.props.title === '通識(舊制)'
                  ? <GeneralCourseList
                    courses={this.props.data.course}
                    title={this.props.title}
                    forAssistant={this.props.forAssistant}
                  />
                  : this.props.title === '通識(新制)'
                    ? <GeneralNewCourseList
                      courses={this.props.data.course}
                      overview={this.props.data}
                      title={this.props.title}
                      forAssistant={this.props.forAssistant}
                    />
                    : <CourseList
                      courses={this.props.data.course}
                      title={this.props.title}
                      forAssistant={this.props.forAssistant}
                    />
              }
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </React.Fragment>
    )
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapStateToProps = (state, ownProps) => ({
  data: state.Student.Graduation.detail.data.filter(t => t.title === ownProps.title)[0],
  forAssistant: state.Student.Graduation.assistant.using
})

const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Index))
