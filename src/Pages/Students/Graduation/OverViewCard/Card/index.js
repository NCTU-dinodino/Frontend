
import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import LinearProgress from '@material-ui/core/LinearProgress'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Grow from '@material-ui/core/Grow'
import AnimatedProgress from '../../../../../Components/AnimatedProgress'
import Dialog from '@material-ui/core/Dialog'
import CourseList from './CourseList'
import GeneralCourseList from './GeneralCourseList'
import GeneralNewCourseList from './GeneralNewCourseList'
import './style.css'

const styles = theme => ({
  container: {
    margin: '1%',
    fontFamily: 'Noto Sans CJK TC'
  },
  text: {
    fontSize: '20px'
  },
  textRwd: {
    fontSize: '8px'
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
  }
})

function Transition (props) {
  return <Grow {...props} />
}

const Title = (props) => {
  // 抵免研究所、雙主修...
  if (props.optional) {
    return (
      <div>
        <div className='cardTitle'>{ props.title }</div>
        <font size={5} color='#338d68'>{ props.complete }</font>
        <div className='cardTitle' />
        { props.unit }
      </div>
    )
  }
  // 一般類別
  return (
    <div>
      <div className='cardTitle'>{ props.title }</div>
      <font size={5} color='#338d68'>{ props.complete }</font>/
      <div className='cardTitle'>{ props.require }</div>
      { props.unit }
    </div>
  )
}

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
    const { classes, rwd } = this.props

    if (this.props.data === undefined) return ''

    // for mobile
    if (rwd) {
      return (
        <div>
          <div className='col-xs-6 col-sm-6 well'>
            <div className={classes.textRwd} onClick={this.handleOpen}>
              <Title
                title={this.props.title}
                complete={this.props.complete}
                require={this.props.require}
                optional={this.props.optional}
                unit={this.props.unit}
              />
              <AnimatedProgress value={this.props.value} />
            </div>
          </div>
          <Dialog
            anchor='right'
            open={this.state.open}
            onClose={this.handleClose}
            TransitionComponent={Transition}
          >
            <AppBar className={classes.appBar}>
              <Toolbar>
                <IconButton color='inherit' onClick={this.handleClose} aria-label='Close'>
                  <CloseIcon />
                </IconButton>
                <Typography variant='title' color='inherit' className={classes.flex}>
                  { this.props.title }
                </Typography>
              </Toolbar>
            </AppBar>
            <div style={{ padding: '15px' }}>
              {
                this.props.title === '通識(舊制)'
                  ? <GeneralCourseList
                    courses={this.props.data.course}
                    title={this.props.title}
                    rwd
                  />
                  : this.props.title === '通識(新制)'
                    ? <GeneralNewCourseList
                      courses={this.props.data.course}
                      overview={this.props.data}
                      title={this.props.title}
                      rwd
                    />
                    : <CourseList
                      courses={this.props.data.course}
                      title={this.props.title}
                      rwd
                    />
              }
            </div>
          </Dialog>
        </div>
      )
    }

    // for PC
    return (
      <div className={classes.container}>
        <div className='row'>
          <ExpansionPanel expanded={this.state.expanded} onChange={this.handleChange}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <div className='hidden-xs hidden-sm col-md-3' style={{ marginTop: '20px' }}>
                <LinearProgress
                  classes={{ barColorPrimary: classes.progress }}
                  variant='determinate'
                  value={this.props.value > 100 ? 100 : this.props.value}
                  color={this.props.value >= 100 ? 'primary' : 'secondary'}
                />
              </div>
              <div className='col-md-4' style={{ marginLeft: '10px' }}>
                <div className={classes.text}>
                  <Title
                    title={this.props.title}
                    complete={this.props.complete}
                    require={this.props.require}
                    optional={this.props.optional}
                    unit={this.props.unit}
                  />
                </div>
              </div>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              {
                this.props.title === '通識(舊制)'
                  ? <GeneralCourseList
                    assis={this.props.assis}
                    courses={this.props.data.course}
                    title={this.props.title}
                  />
                  : this.props.title === '通識(新制)'
                    ? <GeneralNewCourseList
                      assis={this.props.assis}
                      courses={this.props.data.course}
                      overview={this.props.data}
                      title={this.props.title}
                    />
                    : <CourseList
                      assis={this.props.assis}
                      courses={this.props.data.course}
                      title={this.props.title}
                    />
              }
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </div>
      </div>
    )
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapStateToProps = (state, ownProps) => ({
  data: state.Student.Graduation.detail.data.filter(t => t.title === ownProps.title)[0],
  assis: state.Student.Graduation.assistant.using
})

const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Index))
