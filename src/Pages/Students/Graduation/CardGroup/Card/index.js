
import React from 'react'
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
import NormalCourseList from './CourseList/NormalCourseList'
import GeneralCourseList from './CourseList/GeneralCourseList'
import GeneralNewCourseList from './CourseList/GeneralNewCourseList'
import ServiceCourseList from './CourseList/ServiceCourseList'

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
    minWidth: '80%'
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

const Title = withStyles(styles)(({ title, acquire, require, unit, optional, classes }) => {
  if (!unit) { // 其他不計入畢業學分
    return (
      <div>
        <div className={classes.cardTitle}>{ title }</div>
      </div>
    )
  }
  if (optional) { // 抵免研究所、雙主修...
    return (
      <div>
        <div className={classes.cardTitle}>{ title }</div>
        <font size={5} color='#338d68'>{ acquire }</font>
        <div className={classes.cardTitle} />
        { unit }
      </div>
    )
  }
  if (title === '通識(新制)') {
    return (
      <div>
        <div className={classes.cardTitle}>{ title }</div>
        <font size={5} color='#338d68'>{ acquire.total }</font>/
        <div className={classes.cardTitle}>{ require.total }</div>
        { unit }
      </div>
    )
  }
  // 一般類別
  return (
    <div>
      <div className={classes.cardTitle}>{ title }</div>
      <font size={5} color='#338d68'>{ acquire }</font>/
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
    if (!this.props.group) return null

    const { classes, title, group, unit, optional, mobile } = this.props
    const { acquire, require, course } = group
    const progressValue =
      optional
        ? 100
        : title === '通識(新制)'
          ? Math.min(100, 100 * acquire.total / require.total)
          : Math.min(100, 100 * acquire / require)

    let ListComponent
    if (title === '通識(舊制)') {
      ListComponent = (
        <GeneralCourseList
          courses={course}
          title={title}
        />
      )
    } else if (title === '通識(新制)') {
      ListComponent = (
        <GeneralNewCourseList
          courses={course}
          title={title}
          acquire={acquire}
          require={require}
          mobile={mobile}
        />
      )
    } else if (title === '服務學習') {
      ListComponent = (
        <ServiceCourseList
          courses={course}
          title={title}
        />
      )
    } else {
      ListComponent = (
        <NormalCourseList
          courses={course}
          title={title}
        />
      )
    }

    // for mobile
    if (mobile) {
      return (
        <React.Fragment>
          <Grid item xs={6} className={classes.titleMobile} onClick={this.handleOpen}>
            <Title
              title={title}
              acquire={acquire}
              require={require}
              optional={optional}
              unit={unit}
            />
            <AnimatedProgress value={progressValue} />
          </Grid>

          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            PaperProps={{
              classes: { root: classes.dialogMobile }
            }}
          >
            <AppBar className={classes.appBar}>
              <Toolbar>
                <Typography variant='title' color='inherit' className={classes.flex}>
                  {title}
                </Typography>
                <IconButton color='inherit' aria-label='Close' onClick={this.handleClose}>
                  <CloseIcon />
                </IconButton>
              </Toolbar>
            </AppBar>
            <DialogContent>
              <Grid container style={{ marginTop: '24px' }}>
                {ListComponent}
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
                  value={progressValue}
                  color={progressValue === 100 ? 'primary' : 'secondary'}
                />
              </Grid>
              <Grid item md={4} className={classes.title}>
                <Title
                  title={title}
                  acquire={acquire}
                  require={require}
                  optional={optional}
                  unit={unit}
                />
              </Grid>
            </Grid>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid container alignItems='center'>
              {ListComponent}
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

export default withStyles(styles)(Index)
