
import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import CourseTable from './CourseTable'
import styles from './styles'

const PrintForm = props => {
  const { classes, courseDetail } = props
  const sid = props.forAssistant ? props.idCard.id : props.profile.student_id
  const sname = props.forAssistant ? props.idCard.sname : props.profile.sname
  const program = ['網多組(網)', '網多組(多)', '資工組', '資電組'][props.professionalField]
  
  const csCategory = []
  const commonCategory = []

  csCategory.push({ ...courseDetail.compulsory, title: '共同必修' })
  csCategory.push({ ...courseDetail.professional, title: '專業選修' })
  csCategory.push({ ...courseDetail.other, title: '其他選修' })
  csCategory.push({ ...courseDetail.graduate, title: '抵免研究所課程' })

  // 根據向度排序
  courseDetail.general.course.sort((a, b) => {
    if (a.dimension < b.dimension) return -1
    if (a.dimension > b.dimension) return 1
    return 0
  })
  courseDetail.general_new.course.sort((a, b) => {
    if (a.dimension < b.dimension) return -1
    if (a.dimension > b.dimension) return 1
    return 0
  })
  // 如果未送審就新舊制都顯示，有送審就根據當初選擇
  if (props.reviewStatus === 0) {
    commonCategory.push({ ...courseDetail.general, title: '通識(舊制)' })
    commonCategory.push({
      ...courseDetail.general_new,
      title: '通識(新制)',
      require: courseDetail.general_new.require.total
    })
  } else if (props.generalCourseType === 0) {
    commonCategory.push({ ...courseDetail.general, title: '通識(舊制)' })
  } else if (props.generalCourseType === 1) {
    commonCategory.push({
      ...courseDetail.general_new,
      title: '通識(新制)',
      require: courseDetail.general_new.require.total
    })
  }

  commonCategory.push({ ...courseDetail.language, title: '外語' })
  commonCategory.push({ ...courseDetail.pe, title: '體育' })
  commonCategory.push({ ...courseDetail.service, title: '服務學習' })
  commonCategory.push({ ...courseDetail.art, title: '藝文賞析' })
  commonCategory.push({ ...courseDetail.dmajor_minor_program, title: '雙主修、輔系、學分學程' })
  commonCategory.push({ ...courseDetail.exclusion, title: '其他不計入畢業學分' })

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
          <td colSpan='17' className={classes.program}>105學年度 {program}</td>
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
              title={category.title}
              require={category.require}
              courses={category.course}
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
              title={category.title}
              require={category.require}
              courses={category.course}
            />
          ))
        }
      </tbody>
    </table>
  )
}

export default withStyles(styles)(PrintForm)
