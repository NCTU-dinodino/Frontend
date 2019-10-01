
import React from 'react'
import { Grid } from '@material-ui/core'
import PopoverButton from '../PopoverButton'
import MoveGroupButton from '../MoveGroupButton'

// 決定普通課程的按鈕顏色
const courseBtnColor = (completed, reason) => {
  if (completed) {
    if (reason === 'notCS') return '#a29951'
    if (reason === 'free1' || reason === 'free2' || reason === 'english') return '#6A94A2'
    if (reason === 'now') return '#ab6bd9'
    return '#3db586'
  }
  else {
    if (reason === 'now') return '#ab6bd9'
    return '#d95467'
  }
}

// 決定通識課程的按鈕顏色
const generalCourseBtnColor = (courses) => {
  if (courses.length === 0) return '#d95467'
  if (courses.length === 1 && courses[0].reason === 'now') return '#ab6bd9'
  return '#3cab7d'
}

const CoursePopover = ({ course, title, label, assis, mobile }) => (
  <Grid item xs={6} sm={3} lg={2} container justify='center'>
    <PopoverButton
      label={label}
      backgroundColor={courseBtnColor(course.complete, course.reason)}
      flash={!course.complete}
      mobile={mobile}
    >
      <div>{course.cn}</div>
      <div>分數:&nbsp;{(course.score === null) ? '-' : course.score}</div>
      <div>等級:&nbsp;{(course.grade === '0') ? '-' : course.grade}</div>
      <div>英文授課:&nbsp;{(course.english) ? '是' : '否'}</div>
      <div>實得學分:&nbsp;{course.realCredit}</div>
      <br />
      { (course.reason === 'notCS') && <div>此為外系課程，必須申請過抵免才能算通過。</div> }
      { (course.reason === 'free1') && <div>您已申請過抵免了。</div> }
      { (course.reason === 'free2') && <div>免修課程。</div> }
      { (course.reason === 'english') && <div>此為抵免英文檢定考試的課程。</div> }
      { (course.reason === 'now') && <div>當期課程。</div> }
      { (course.reason === 'now' && course.complete) && <div>已修過這堂課，目前正重複修課中。</div> }
      {
        !assis &&
        <MoveGroupButton
          title={title}
          course={course}
          mobile={mobile}
        />
      }
    </PopoverButton>
  </Grid>
)

const GeneralCoursePopover = ({ type, title, assis, mobile }) => (
  <Grid item xs={6} sm={3} lg={2} container justify='center'>
    <PopoverButton
      label={type.name}
      backgroundColor={generalCourseBtnColor(type.courses)}
      flash={(type.length === 0)}
      mobile={mobile}
    >
      {
        type.courses.map((course, index) => (
          <li key={index}>
            { course.cn }
            <div style={{ float: 'right', color: course.color }}>{ course.score }</div>
            <div style={{ margin: '0 0 15px 8px' }}>
              {
                !assis &&
                <MoveGroupButton
                  title={title}
                  course={course}
                  mobile={mobile}
                />
              }
            </div>
          </li>
        ))
      }
    </PopoverButton>
  </Grid>
)

export { CoursePopover, GeneralCoursePopover }
