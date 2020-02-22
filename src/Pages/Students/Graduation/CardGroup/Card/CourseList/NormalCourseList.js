
import React from 'react'
import { NormalCoursePopover } from '../CoursePopover'

/* 
 * 物理一門4學分，資工只要求3學分
 * 微處理機3學分，資工只要求2學分
 * 多餘的1學分會放到專業選修或其他選修
 */
const specialCourse = ['物理(一)', '物理(二)', '物理(一)榮譽班', '物理(二)榮譽班', '微處理機系統實驗']

const Index = ({ courses, title }) => (
  <React.Fragment>
    {
      courses.map((course, index) => (
        <NormalCoursePopover
          key={index}
          label={(specialCourse.includes(course.cn) && course.realCredit > 0)
            ? `${course.cn}  ${course.realCredit}學分`
            : course.cn
          }
          course={course}
          title={title}
        />
      ))
    }
  </React.Fragment>
)

export default Index
