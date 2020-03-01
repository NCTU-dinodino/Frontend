
import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Button, Menu, MenuItem } from '@material-ui/core'
import {
  actions,
  getGraduationInfo,
  getMoveTargets,
  moveCourse
} from '../../../../../../../Redux/Students/Actions/Graduation'

const styles = theme => ({
  root: {
    fontFamily: 'Noto Sans CJK TC',
    letterSpacing: 1
  }
})

class Index extends React.Component {
  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleItemSelect = this.handleItemSelect.bind(this)
    this.state = {
      anchorEl: null
    }
  }

  componentDidUpdate () {
    // 移動成功後，重新拿課程資料並重置移動狀態
    if (this.props.success) {
      this.props.getGraduationInfo()
      this.props.moveCourseDone()
    }
  }

  handleClick (event) {
    const { forAssistant, idCard, studentIdcard, course } = this.props
    const sid = forAssistant ? idCard.id : studentIdcard.student_id
    // 拿取可移動的目標
    this.props.getMoveTargets({
      student_id: sid,
      cn: course.cn, // 中文課名
      code: course.code, // 課號
      type: course.type
    })

    this.setState({
      anchorEl: event.currentTarget
    })
  }

  handleClose () {
    this.setState({
      anchorEl: null
    })
    this.props.resetMoveTargets()
  }

  handleItemSelect (target) {
    const sid = this.props.forAssistant ? this.props.idCard.id : this.props.studentIdcard.student_id

    this.props.moveCourse({
      student_id: sid,
      cn: this.props.course.cn, // 中文課名
      origin_group: this.props.title,
      target_group: target
    })
    this.handleClose()
    this.props.onClose()
  }

  render () {
    const { classes, targets, title } = this.props
    const moveDisabled = (title === '英文授課')

    return (
      <div>
        <Button
          variant='outlined'
          onClick={this.handleClick}
          className={classes.root}
          disabled={moveDisabled}
        >
          移動課程
        </Button>

        <Menu
          id='simple-menu'
          anchorEl={this.state.anchorEl}
          open={Boolean(this.state.anchorEl)}
          onClose={this.handleClose}
          className={classes.root}
        >
          {
            targets &&
            targets.map((target, index) => (
              <MenuItem
                key={index}
                className={classes.root}
                onClick={() => this.handleItemSelect(target)}
              >
                { target }
              </MenuItem>
            ))
          }
        </Menu>

      </div>
    )
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  studentIdcard: state.Student.User.studentIdcard,
  targets: state.Student.Graduation.moveCourse.targets,
  success: state.Student.Graduation.moveCourse.success,
  idCard: state.Student.Graduation.assistant.idCard,
  forAssistant: state.Student.Graduation.assistant.using,
})

const mapDispatchToProps = (dispatch) => ({
  getGraduationInfo: () => dispatch(getGraduationInfo()),
  getMoveTargets: (payload) => dispatch(getMoveTargets(payload)),
  resetMoveTargets: () => dispatch(actions.graduation.moveCourse.store([])),
  moveCourse: (payload) => dispatch(moveCourse(payload)),
  moveCourseDone: () => dispatch(actions.graduation.moveCourse.setSuccess(false))
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Index))
