
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
    const sid = this.props.assis ? this.props.idCard.id : this.props.studentIdcard.student_id

    // 拿取可移動的目標
    this.props.getMoveTargets({
      student_id: sid,
      cn: this.props.course.cn, // 中文課名
      code: this.props.course.code, // 課號
      type: this.props.course.type
    })
    this.setState({
      anchorEl: event.currentTarget
    })
  }

  handleClose () {
    this.setState({
      anchorEl: null
    })
  }

  handleItemSelect (target) {
    const sid = this.props.assis ? this.props.idCard.id : this.props.studentIdcard.student_id

    this.props.moveCourse({
      student_id: sid,
      cn: this.props.course.cn, // 中文課名
      origin_group: this.props.title,
      target_group: target
    })
    this.setState({
      anchorEl: null
    })
  }

  render () {
    const { classes, englishCheck, course, targets } = this.props
    const moveDisabled = (
      (
        (englishCheck === '0' || englishCheck === null) &&
        course.cn.search('進階英文') !== -1
      ) ||
      course.reason === 'english'
    )

    return (
      <div>
        <Button
          variant='outlined'
          onClick={this.handleClick}
          className={classes.root}
          disabled={moveDisabled}
        >
          { moveDisabled ? '不能移動此課程' : '移動課程' }
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
  idCard: state.Student.Graduation.assistant.idCard,
  assis: state.Student.Graduation.assistant.using,
  targets: state.Student.Graduation.moveCourse.targets,
  success: state.Student.Graduation.moveCourse.success
})

const mapDispatchToProps = (dispatch) => ({
  getGraduationInfo: () => dispatch(getGraduationInfo()),
  getMoveTargets: (payload) => dispatch(getMoveTargets(payload)),
  moveCourse: (payload) => dispatch(moveCourse(payload)),
  moveCourseDone: () => dispatch(actions.graduation.moveCourse.setSuccess(false))
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Index))
