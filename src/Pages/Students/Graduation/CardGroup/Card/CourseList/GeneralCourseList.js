
import React from 'react'
import { GeneralCoursePopover } from '../CoursePopover'

const Index = ({ courses, title }) => {
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

  // 把每個通識丟到正確的分類
  courses.forEach(course => {
    const type = generalCourseTypes.find(type => course.dimension === type.dimension)
    if (type) type.courses.push({ ...course })
  })

  return (
    <React.Fragment>
      {
        generalCourseTypes.map((type, index) => (
          <GeneralCoursePopover
            key={index}
            type={type}
            title={`${title}-${type.dimension}`}
          />
        ))
      }
    </React.Fragment>
  )
}

export default Index
