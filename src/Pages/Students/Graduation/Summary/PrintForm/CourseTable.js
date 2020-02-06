
import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import styles from './styles'

const Course = withStyles(styles)(props => {
  const { classes } = props
  const scores = Array(12).fill(null)
  scores[props.year * 3 + props.semester - 3] = props.score // 把分數放到學期對應的格子

  return (
    <tr>
      <td className={classes.left}>{ props.name }</td>
      {
        scores.map((score, index) => (
          <td key={index}>{ score }</td>
        ))
      }
      <td>{ props.credit }</td>
      <td>{ props.realCredit }</td>
      <td className={classes.left}>{ props.comment }</td>
    </tr>
  )
})

const CourseTable = ({ title, require, courses, classes }) => {
  courses.forEach((course, index) => {
    // comment (在此新增的欄位)
    course.comment = ''
    if (title.slice(0, 2) === '通識') {
      course.comment += ' ' + course.dimension
    } else if (title === '其他選修' && course.type === '軍訓') {
      course.comment += ' 此課程不採計為畢業預審學分'
    }

    if (course.english) { course.comment += ' 英文授課' }

    // 抵免
    if (course.reason === 'notCS') {
      course.comment += ' 此為外系課程，必須申請過抵免才能算通過。'
      course.score = ''
    } else if (course.reason === 'free1') {
      course.comment += ' 已抵免'
      course.score = '抵免'
    } else if (course.reason === 'free2') {
      course.comment += ' 免修課程'
    } else if (course.reason === 'now') {
      course.comment += ' 當期課程'
      course.score = ''
    } else if (course.reason === 'english') {
      course.comment += ' 加修(英檢未通過)'
    }

    if (course.score === -1) { course.score = '' }

    // score
    if (course.score === null) {
      if (course.grade === null) {
        course.score = (course.complete === true) ? 'P' : 'F'
      } else {
        course.score = course.grade
      }
    }

    // 未修
    if ((course.score === null || course.score === '') &&
        course.complete === false) {
      course.realCredit = ''
    }
  })

  return (
    <React.Fragment>
      <tr className={classes.subTitle}>
        <td rowSpan={courses.length + 1 + (title === '外語')}>
          {`${title}(${(title === '通識(新制)') ? require.total : require || 0})`}
        </td>
        <td>科目名稱</td>
        <td>學前</td>
        <td>1上</td>
        <td>1下</td>
        <td>1暑</td>
        <td>2上</td>
        <td>2下</td>
        <td>2暑</td>
        <td>3上</td>
        <td>3下</td>
        <td>3暑</td>
        <td>4上</td>
        <td>4下</td>
        <td>課程<br />學分</td>
        <td>實得<br />學分</td>
        <td>備註</td>
      </tr>

      {
        courses.map((course, index) => (
          <Course
            key={index}
            name={course.cn + ' ' + course.en}
            credit={course.originalCredit}
            realCredit={course.realCredit}
            score={course.score}
            semester={course.semester}
            year={course.year}
            comment={course.comment}
          />
        ))
      }
      {
        title === '外語' &&
        <tr>
          <td className={classes.english} colSpan='17'>
            <span>
              ★英檢未通過者需加修並通過「英文進階課程」4學分或於畢業前自行報名並通過所列任ㄧ英文能力檢定考試與標準
            </span>
          </td>
        </tr>
      }
    </React.Fragment>
  )
}

export default withStyles(styles)(CourseTable)
