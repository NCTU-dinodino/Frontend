
import React from 'react'
import { connect } from 'react-redux'
import Card from './Card'

const Index = ({ sid, courseDetail, reviewStatus, generalCourseType, mobile }) => (
  <React.Fragment>
    <Card
      title='共同必修'
      group={courseDetail.compulsory}
      unit='學分'
      mobile={mobile}
    />
    <Card
      title='專業選修'
      group={courseDetail.professional}
      unit='學分'
      mobile={mobile}
    />
    <Card
      title='其他選修'
      group={courseDetail.other}
      unit='學分'
      mobile={mobile}
    />
    <Card
      title='英文授課'
      group={courseDetail.english}
      unit='門'
      mobile={mobile}
    />
    {
      // 學號05(或以前)開頭: 還沒送審或送審時選舊制才顯示
      // 學號06(或以後)開頭: 不顯示
      (sid.substr(0, 2) <= '05' &&
      (reviewStatus === 0 || generalCourseType === 0)) &&
      <Card
        title='通識(舊制)'
        group={courseDetail.general}
        unit='學分'
        mobile={mobile}
      />
    }
    {
      // 學號05(或以前)開頭: 還沒送審或送審時選新制才顯示
      // 學號06(或以後)開頭: 隨時顯示
      (sid.substr(0, 2) > '05' ||
      (reviewStatus === 0 || generalCourseType === 1)) &&
      <Card
        title='通識(新制)'
        group={courseDetail.general_new}
        unit='學分'
        mobile={mobile}
      />
    }
    <Card
      title='外語'
      group={courseDetail.language}
      unit='學分'
      mobile={mobile}
    />
    <Card
      title='體育'
      group={courseDetail.pe}
      unit='門'
      mobile={mobile}
    />
    <Card
      title='服務學習'
      group={courseDetail.service}
      unit='門'
      mobile={mobile}
    />
    <Card
      title='藝文賞析'
      group={courseDetail.art}
      unit='門'
      mobile={mobile}
    />
    <Card
      title='抵免研究所課程'
      group={courseDetail.graduate}
      optional={true}
      unit='學分'
      mobile={mobile}
    />
    <Card
      title='雙主修、輔系、學分學程'
      group={courseDetail.dmajor_minor_program}
      optional={true}
      unit='學分'
      mobile={mobile}
    />
    <Card
      title='其他不計入畢業學分'
      group={courseDetail.exclusion}
      optional={true}
      mobile={mobile}
    />
  </React.Fragment>
)

const mapStateToProps = (state) => ({
  sid: state.Student.User.studentIdcard.student_id,
  courseDetail: state.Student.Graduation.detail.data,
  reviewStatus: state.Student.Graduation.getReview.status,
  generalCourseType: state.Student.Graduation.getReview.generalCourseType
})

const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(Index)
