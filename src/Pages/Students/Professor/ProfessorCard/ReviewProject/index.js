
import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import {
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Slide,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Grid,
  withMobileDialog
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import List from '@material-ui/icons/List'
import ProjectBar from './ProjectBar'
import { ResponsiveContainer } from '../../../../../Components/Responsive'
import { getPastProjects, getScounts } from '../../../../../Redux/Students/Actions/Professor'

const styles = theme => ({
  appBar: {
    position: 'relative'
  },
  flex: {
    flex: 1
  },
  dialogContent: {
    paddingTop: '50px',
    paddingBottom: '50px',
    [theme.breakpoints.down('sm')]: {
      paddingTop: '35px',
      paddingBottom: '35px',
    },
  }
})

const Transition = (props) => (
  <Slide direction='up' {...props} />
)

class Index extends React.Component {
  constructor (props) {
    super(props)
    this.handleDialogOpen = this.handleDialogOpen.bind(this)
    this.handleDialogClose = this.handleDialogClose.bind(this)
    this.state = { open: false }
  }

  handleDialogOpen () {
    this.setState({ open: true })
  }

  handleDialogClose () {
    this.setState({ open: false })
    this.props.closeMenu()
  }

  componentDidMount () {
    this.props.getPastProjects({
      teacher_id: this.props.professor.teacher_id
    })
    this.props.getScounts({
      teacher_id: this.props.professor.teacher_id
    })
  }

  render () {
    const { classes, fullScreen, pastProjects } = this.props

    return (
      <div>
        <MenuItem className={classes.menuItem} onClick={this.handleDialogOpen}>
          <ListItemIcon className={classes.icon}>
            <List />
          </ListItemIcon>
          <ListItemText
            inset
            primary='查看過往指導專題'
            classes={{ primary: classes.primary }}
          />
        </MenuItem>
        <Dialog
          open={this.state.open}
          onClose={this.handleDialogClose}
          TransitionComponent={Transition}
          fullScreen={fullScreen}
          fullWidth
          maxWidth='md'
          PaperProps={{
            style: {
              backgroundColor: '#eee',
            },
          }}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <Typography
                variant='title'
                color='inherit'
                className={classes.flex}
              >
                查看過往指導專題
              </Typography>
              <IconButton
                color='inherit'
                aria-label='Close'
                onClick={this.handleDialogClose}
              >
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <ResponsiveContainer justify='center'>
            <Grid item xs={12} md={10} className={classes.dialogContent}>
              {
                pastProjects.map((project, index) => (
                  <ProjectBar project={project} key={index} />
                ))
              }
            </Grid>
          </ResponsiveContainer>
        </Dialog>
      </div>
    )
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  pastProjects: state.Student.Professor.pastProject.data
})
const mapDispatchToProps = (dispatch) => ({
  getPastProjects: (payload) => dispatch(getPastProjects(payload)),
  getScounts: (payload) => dispatch(getScounts(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withMobileDialog()(Index)))
