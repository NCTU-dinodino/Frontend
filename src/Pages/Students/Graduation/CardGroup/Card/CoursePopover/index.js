
import React from 'react'
import { Grid } from '@material-ui/core'
import PopoverButton from './PopoverButton'
import MoveGroupButton from './MoveGroupButton'

// 顏色和 /Pages/Students/Graduation/Summary/index.js 對應
const green = '#3db586'
const red = '#d95467'
const purple = '#8888ff'
const grey = '#bdbdbd'
const greyGreen = '#6a94a2'

// 決定普通課程的按鈕顏色
const normalCourseColor = (course, title) => {
  const { complete, reason, type } = course

  if (complete) {
    if (reason === 'notCS') return '#a29951'
    if (reason === 'free1' || reason === 'free2' || reason === 'english') return greyGreen
    // 非通識課程放在通識區
    if (title.slice(0, 2) === '通識' && type !== '通識') return grey
    // 通識課程放在其他區
    if (title.slice(0, 2) !== '通識' && type === '通識') return grey
    return green
  }
  else {
    if (reason === 'now') return purple
    return red
  }
}

// 決定通識課程的按鈕顏色
const generalCourseColor = (courses) => {
  if (courses.length === 0) return red
  for (let i = 0; i < courses.length; i++) {
    if (courses[i].type !== '通識')  return grey
  }
  if (courses.length === 1 && courses[0].reason === 'now') return purple
  return green
}

// 決定服學課程的按鈕顏色
const serviceCourseColor = (courses) => {
  if (courses.length === 0) return red
  if (courses.length === 1 && courses[0].reason === 'now') return purple
  return green
}

const supplementText = (course, title) => {
  if (course.reason === 'notCS') return '(此為外系課程，必須申請抵免)'
  if (course.reason === 'free1') return '(已申請過抵免)'
  if (course.reason === 'free2') return '(免修課程)'
  if (course.reason === 'english') return '(抵免英文檢定考試的課程)'
  if (course.reason === 'now' && course.complete) return '(重複修課中)'
  if (course.reason === 'now') return '(當期課程)'
  // 非通識課程放在通識區
  if (title.slice(0, 2) === '通識' && course.type !== '通識') return '(待助理確認)'
  // 通識課程放在其他區
  if (title.slice(0, 2) !== '通識' && course.type === '通識') return '(待助理確認)'
  return ''
}

const scoreText = (scores) => {
  if (!scores.length) return '無'

  let str = ''
  scores.forEach((s, index) => {
    if (index > 0)  str += '、'

    if (s.score === -1) str += '無'
    else { // 有分數才有等級
      str += s.score
      str += '('

      str += s.grade
      str += ')'
    }
    str += ' - '

    str += s.semester.slice(0, 3) // 取出 '107-1' 的 '107'
    str += { 1: '上', 2: '下', 3: '暑' }[s.semester.charAt(4)] // 把學期轉成中文
  })
  return str
}

class NormalCoursePopover extends React.Component {
  constructor (props) {
    super(props)
    this.state = { anchorEl: null }
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  handleOpen (e) {
    this.setState({ anchorEl: e.currentTarget })
  }

  handleClose () {
    this.setState({ anchorEl: null })
  }

  render () {
    const { course, title, label, mobile } = this.props

    return (
      <Grid item xs={6} sm={3} lg={2} container justify='center'>
        <PopoverButton
          label={label}
          backgroundColor={normalCourseColor(course, title)}
          flash={!course.complete}
          mobile={mobile}
          anchorEl={this.state.anchorEl}
          onOpen={this.handleOpen}
          onClose={this.handleClose}
        >
          <div>{course.cn}</div>
          <div>分數:&nbsp;{scoreText(course.scores)}</div>
          <div>英文授課:&nbsp;{(course.english) ? '是' : '否'}</div>
          <div>實得學分:&nbsp;{course.realCredit}</div>
          <br />
          <div style={{ color: 'red' }}>{supplementText(course, title)}</div>
          <MoveGroupButton
            title={title}
            course={course}
            onClose={this.handleClose}
          />
        </PopoverButton>
      </Grid>
    )
  }
}

class GeneralCoursePopover extends React.Component {
  constructor (props) {
    super(props)
    this.state = { anchorEl: null }
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  handleOpen (e) {
    this.setState({ anchorEl: e.currentTarget })
  }

  handleClose () {
    this.setState({ anchorEl: null })
  }

  render () {
    const { type, title, mobile } = this.props

    return (
      <Grid item xs={6} sm={3} lg={2} container justify='center'>
        <PopoverButton
          label={type.name}
          backgroundColor={generalCourseColor(type.courses)}
          flash={(type.length === 0)}
          mobile={mobile}
          anchorEl={this.state.anchorEl}
          onOpen={this.handleOpen}
          onClose={this.handleClose}
        >
          {
            type.courses.map((course, index) => (
              <li key={index}>
                {course.cn}
                <div style={{ display: 'inline', color: 'red' }}>
                  {supplementText(course, title)}
                </div>
                <div style={{ float: 'right' }}>{scoreText(course.scores)}</div>
                <div style={{ margin: '0 0 15px 8px' }}>
                  <MoveGroupButton
                    title={title}
                    course={course}
                    onClose={this.handleClose}
                  />
                </div>
              </li>
            ))
          }
        </PopoverButton>
      </Grid>
    )
  }
}

class ServiceCoursePopover extends React.Component {
  constructor (props) {
    super(props)
    this.state = { anchorEl: null }
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  handleOpen (e) {
    this.setState({ anchorEl: e.currentTarget })
  }

  handleClose () {
    this.setState({ anchorEl: null })
  }

  render () {
    const { type, title, mobile } = this.props

    return (
      <Grid item xs={6} sm={3} lg={2} container justify='center'>
        <PopoverButton
          label={type.name}
          backgroundColor={serviceCourseColor(type.courses)}
          flash={(type.length === 0)}
          mobile={mobile}
          anchorEl={this.state.anchorEl}
          onOpen={this.handleOpen}
          onClose={this.handleClose}
        >
          {
            type.courses.map((course, index) => (
              <li key={index}>
                {course.cn}
                <div style={{ display: 'inline', color: 'red' }}>
                  {supplementText(course, title)}
                </div>
                <div style={{ float: 'right' }}>{scoreText(course.scores)}</div>
                <div style={{ margin: '0 0 15px 8px' }}>
                  <MoveGroupButton
                    title={title}
                    course={course}
                    onClose={this.handleClose}
                  />
                </div>
              </li>
            ))
          }
        </PopoverButton>
      </Grid>
    )
  }
}

export { NormalCoursePopover, GeneralCoursePopover, ServiceCoursePopover }
