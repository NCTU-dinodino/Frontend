import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { styles } from './../styles'

import { 
  Tooltip,
  IconButton,
} from '@material-ui/core'

import {
  projectHandleChange
} from '../../../../Redux/Assistants/Actions/Project'

class ToolButton extends React.Component {
  render() {
    const { classes, Project } = this.props;
    return (
      <Tooltip 
        title={this.props.title} 
        placement='right'
        classes={{
          tooltip: classes.tooltip
        }}
      >
        <IconButton 
          className={this.props.style}
          onClick={ 
            () => this.props.projectHandleChange({
              index: this.props.index,
              select: [],
              selectAll: false,
            })
          }
          color={(Project.index === this.props.index) ? 'primary' : 'default'}
        >
          {this.props.icon}
        </IconButton>
      </Tooltip>
    )
  }
}

const mapStateToProps = (state) => ({
  Project: state.Assistant.Project
})

const mapDispatchToProps = (dispatch) => ({
  projectHandleChange: (payload) => dispatch(projectHandleChange(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ToolButton))