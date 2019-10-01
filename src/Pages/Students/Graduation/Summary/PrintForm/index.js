
import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import CourseTable from './CourseTable'
import styles from './styles'

const PrintForm = props => {
  const { classes } = props
  const sid = props.assis ? props.idCard.id : props.profile.student_id
  const sname = props.assis ? props.idCard.sname : props.profile.sname

  const programsAssis = {
    資工: '資訊工程組',
    網多: '網路與多媒體工程組',
    資電: '資電工程組'
  }
  const programs = {
    資工A: '資訊工程組',
    資工B: '資訊工程組',
    網多: '網路與多媒體工程組',
    資電: '資電工程組'
  }
  const program = props.assis
    ? programsAssis[props.idCard.program]
    : programs[props.profile.program]

  const commonCategoryTitle = ['外語', '體育', '服務學習', '藝文賞析']
  const csCategory = []
  const commonCategory = []

  props.reviewData.forEach((item, index) => {
    if (item.title.slice(0, 2) === '通識') {
      // 根據向度排序
      item.course.sort((a, b) => {
        if (a.dimension < b.dimension) return -1
        if (a.dimension > b.dimension) return 1
        return 0
      })

      // 如果未送審就新舊制都顯示，有送審就根據當初選擇
      if (props.reviewCheck === 0) {
        commonCategory.push(item)
      } else if (props.generalCourseSelect === 0 && item.title === '通識(舊制)') {
        commonCategory.push(item)
      } else if (props.generalCourseSelect === 1 && item.title === '通識(新制)') {
        commonCategory.push(item)
      }
    } else if (commonCategoryTitle.indexOf(item.title) !== -1) {
      commonCategory.push(item)
    } else {
      csCategory.push(item)
    }
  })

  return (
    <table className={classes.table}>
      <colgroup>
        <col className={classes.col0} />
        <col className={classes.col1} />
        <col className={classes.col2} />
        <col className={classes.col3} />
        <col className={classes.col4} />
        <col className={classes.col5} />
        <col className={classes.col6} />
        <col className={classes.col7} />
        <col className={classes.col8} />
        <col className={classes.col9} />
        <col className={classes.col10} />
        <col className={classes.col11} />
        <col className={classes.col12} />
        <col className={classes.col13} />
        <col className={classes.col14} />
        <col className={classes.col15} />
        <col className={classes.col16} />
      </colgroup>

      <tbody>
        <tr>
          <td colSpan='17' className={classes.program}>105學年度 - {program}</td>
        </tr>
        <tr>
          <td colSpan='17' className={classes.infoRow}>
            <span className={classes.sid}>學號：{sid}</span>
            <span>姓名：{sname}</span>
          </td>
        </tr>

        <tr>
          <td colSpan='17' className={classes.title1}>
            <span>一、本系專業科目(畢業前須通過</span>
            <span className={classes.red}>1</span>
            <span>門本系開授或認可之英文授課專業課程)</span>
          </td>
        </tr>
        {
          csCategory.map((category, index) => (
            <CourseTable
              key={index}
              courses={category.course}
              title={category.title}
            />
          ))
        }

        <tr>
          <td colSpan='17' className={classes.title2}>
            <span>二、校訂共同科目</span>
          </td>
        </tr>
        {
          commonCategory.map((category, index) => (
            <CourseTable
              key={index}
              courses={category.course}
              title={category.title}
            />
          ))
        }
      </tbody>
    </table>
  )
}

export default withStyles(styles)(PrintForm)
