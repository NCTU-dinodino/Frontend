import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { semesterToChinese } from '../../../../../Utilities'

const styles = theme => ({
  projectBar: {
    display: 'flex',
    fontSize: '16px',
    marginBottom: '15px',
    padding: '15px 20px',
    backgroundColor: 'white',
    boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.2),' +
               '0px 1px 1px 0px rgba(0, 0, 0, 0.14),' +
               '0px 2px 1px -1px rgba(0, 0, 0, 0.12)',
    [theme.breakpoints.down('sm')]: {
      fontSize: '14px',
      marginBottom: '10px',
    }
  },
  semester: {
    minWidth: '60px'
  }
})

class ProjectBar extends React.Component {
  render () {
    const { classes, project } = this.props

    return (
      <div className={classes.projectBar}>
        <div className={classes.semester}>{semesterToChinese(project.semester)}</div>
        <div className={classes.title}>{project.title}</div>
      </div>
    )
  }
}

ProjectBar.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ProjectBar)
