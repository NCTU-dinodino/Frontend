
import React from 'react'
import { ServiceCoursePopover } from '../CoursePopover'

const Index = ({ courses, title }) => {
  const service1 = {
    name: '服務學習(一)',
    courses: []
  }
  const service2 = {
    name: '服務學習(二)',
    courses: []
  }

  // 把服學一二分類
  courses.forEach(course => {
    if (course.cn.indexOf('服務學習(一)') !== -1)      service1.courses.push(course)
    else if (course.cn.indexOf('服務學習(二)') !== -1) service2.courses.push(course)
    else if (course.cn.indexOf('服務學習二') !== -1)   service2.courses.push(course)
  })

  return (
    <React.Fragment>
      <ServiceCoursePopover
        type={service1}
        title={title}
      />
      <ServiceCoursePopover
        type={service2}
        title={title}
      />
    </React.Fragment>
  )
}

export default Index
