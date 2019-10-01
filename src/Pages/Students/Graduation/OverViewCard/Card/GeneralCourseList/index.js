
import React from 'react'
import { GeneralCoursePopover } from '../CoursePopover'

const Index = ({ courses, title, assis, mobile }) => {
  const generalCourseTypes = [
    {
      name: '當代',
      dimension: '通識',
      courses: []
    },
    {
      name: '公民',
      dimension: '公民',
      courses: []
    },
    {
      name: '群己',
      dimension: '群己',
      courses: []
    },
    {
      name: '文化',
      dimension: '文化',
      courses: []
    },
    {
      name: '歷史',
      dimension: '歷史',
      courses: []
    },
    {
      name: '自然',
      dimension: '自然',
      courses: []
    }
  ]

  // 把每個通識丟到正確的分類，然後加上會在 GeneralCoursePopover 用到的欄位
  courses.forEach(course => {
    const type = generalCourseTypes.find(type => course.dimension === type.dimension)
    if (type) {
      if (course.reason === 'now') {
        type.courses.push({
          ...course,
          color: '#9e48d9',
          score: '(當期課程)'
        })
      } else if (course.reason === 'free1' || course.reason === 'free2') {
        type.courses.push({
          ...course,
          color: '#6A94A2',
          cn: `${course.cn} (抵免課程)`
        })
      } else {
        type.courses.push({
          ...course,
          color: 'green'
        })
      }
    }
  })

  return (
    <React.Fragment>
      {
        generalCourseTypes.map((type, index) => (
          <GeneralCoursePopover
            key={index}
            type={type}
            title={`${title}-${type.dimension}`}
            assis={assis}
            mobile={mobile}
          />
        ))
      }
    </React.Fragment>
  )
}

export default Index
