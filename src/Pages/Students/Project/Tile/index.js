import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import DeleteIcon from '@material-ui/icons/Delete'
import { deleteProject } from '../../../../Redux/Students/Actions/Project'
import { semesterToChinese } from '../../../../Utilities'

const styles = {
  root: {
    marginBottom: '15px'
  },
  panelSummary: {
    fontWeight: 'bolder'
  },
  panelDetails: {
    paddingTop: '0px',
    display: 'flex'
  },
  firstSecond: {
    whiteSpace: 'nowrap'
  },
  title: {
    marginLeft: '10px',
    marginRight: '10px'
  },
  statusRed: {
    color: 'red',
    marginLeft: 'auto',
    whiteSpace: 'nowrap'
  },
  statusGreen: {
    color: 'green',
    marginLeft: 'auto',
    whiteSpace: 'nowrap'
  },
  deleteIconWrapper: {
    display: 'flex',
    alignItems: 'flex-end'
  },
  deleteIcon: {
    color: '#f50057',
    fontSize: '30px',
    cursor: 'pointer'
  },
  deleteIconDisabled: {
    color: 'grey',
    fontSize: '30px',
  }
}

class Tile extends React.Component {
  constructor (props) {
    super(props)
    this.handleDelete = this.handleDelete.bind(this)
  }

  handleDelete (canBeDeleted) {
    if (!canBeDeleted)  return
    if (window.confirm('確定要刪除此專題？')) {
      const { project } = this.props
      this.props.deleteProject({
        tname: project.tname,
        title: project.title,
        semester: project.semester,
        first_second: project.first_second
      })
    }
  }

  render () {
    const { classes, project } = this.props
    const firstSecond = `專題${project.first_second === 1 ? '一' : '二'}`
    const status = {
      1: '已接受',
      2: '審核中',
      3: '已拒絕'
    }[project.status]
    const statusClass = {
      1: classes.statusGreen,
      2: classes.statusRed,
      3: classes.statusRed
    }[project.status]
    const canBeDeleted = (project.status === 2 || project.status === 3)

    return (
      <ExpansionPanel className={classes.root}>
        <ExpansionPanelSummary
          className={classes.panelSummary}
          expandIcon={<ExpandMoreIcon />}
        >
          <div className={classes.firstSecond}>{firstSecond}</div>
          <div className={classes.title}>{project.title}</div>
          <div className={statusClass}>{status}</div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.panelDetails}>
          <div style={{ flexGrow: '1' }}>
            <div>指導教授: {project.tname}</div>
            <div>學期: {semesterToChinese(project.semester)}</div>
            <div>分數: {project.score}</div>
            <div>評語: {project.comment}</div>
          </div>
          <div className={classes.deleteIconWrapper}>
            <DeleteIcon
              className={canBeDeleted ? classes.deleteIcon : classes.deleteIconDisabled}
              onClick={() => this.handleDelete(canBeDeleted)}
            />
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    )
  }
}

Tile.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = (dispatch) => ({
  deleteProject: (payload) => dispatch(deleteProject(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Tile))
