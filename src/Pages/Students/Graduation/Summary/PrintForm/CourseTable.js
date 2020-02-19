
import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import styles from './styles'

const Course = withStyles(styles)(({ course, title, classes }) => {
  course.comment = '' // 備註 (在此新增的欄位)

  if (title.slice(0, 2) === '通識') course.comment += ' ' + course.dimension
  if (course.english)              course.comment += ' 英文授課'

  if (course.reason === 'notCS') course.comment += ' 此為外系課程，必須申請過抵免才能算通過。'
  if (course.reason === 'free1') course.comment += ' 已抵免'
  if (course.reason === 'free2') course.comment += ' 免修課程'
  if (course.reason === 'now')   course.comment += ' 當期課程'
  if (course.reason === 'english') course.comment += ' 加修(英檢未通過)'

  // 把分數放到學期對應的格子
  const scores = Array(12).fill(null)
  course.scores.forEach(s => {
    const index = s.year * 3 + parseInt(s.semester.charAt(4), 10) - 3
    if (s.score === -1) {
      if (course.reason === 'notCS')      scores[index] = ''
      else if (course.reason === 'free1') scores[index] = ''
      else if (course.reason === 'free2') scores[index] = ''
      else if (course.reason === 'now')   scores[index] = ''
      else scores[index] = (course.complete) ? 'P' : 'F'
    }
    else  scores[index] = s.score 
  })

  return (
    <tr>
      <td className={classes.left}>{course.cn + ' ' + course.en}</td>
      {
        scores.map((score, index) => (
          <td key={index}>{score}</td>
        ))
      }
      <td>{course.originalCredit}</td>
      <td>{course.realCredit}</td>
      <td className={classes.left}>{course.comment}</td>
    </tr>
  )
})

const CourseTable = ({ title, require, courses, classes }) => (
  <React.Fragment>
    <tr className={classes.subTitle}>
      <td rowSpan={courses.length + 1}>{`${title} (${require || 0})`}</td>
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
        <Course key={index} title={title} course={course} />
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

export default withStyles(styles)(CourseTable)
