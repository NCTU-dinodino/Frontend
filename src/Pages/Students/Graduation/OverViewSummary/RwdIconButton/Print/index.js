
import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import {
  MenuItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core'
import PrintIcon from '@material-ui/icons/Print'

const styles = theme => ({
  icon: {
    marginRight: 5
  }
})

class Index extends React.Component {
  handlePrint (fileName) {
    const original = document.title
    if (fileName !== null) { document.title = fileName }
    window.print()
    document.title = original
  }

  render () {
    const { classes, rwd } = this.props
    const sid = this.props.studentIdcard.student_id

    return (
      <MenuItem onClick={() => this.handlePrint('105學年度畢業預審表-' + sid)}>
        <ListItemIcon className={classes.icon}>
          <PrintIcon />
        </ListItemIcon>
        <ListItemText inset primary='列印預審文件' />
      </MenuItem>
    )
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  studentIdcard: state.Student.User.studentIdcard
})

const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Index))
