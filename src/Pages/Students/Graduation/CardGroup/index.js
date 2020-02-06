
import React from 'react'
import { connect } from 'react-redux'
import Card from './Card'

const Index = ({ overview, reviewStatus, generalCourseType, mobile }) => (
  <React.Fragment>
    <Card
      title='共同必修'
      complete={overview.compulsory}
      require={overview.compulsory_require}
      value={overview.compulsory / overview.compulsory_require * 100}
      unit='學分'
      mobile={mobile}
    />
    <Card
      title='專業選修'
      complete={overview.pro}
      require={overview.pro_require}
      value={overview.pro / overview.pro_require * 100}
      unit='學分'
      mobile={mobile}
    />
    <Card
      title='其他選修'
      complete={overview.other}
      require={overview.other_require}
      value={overview.other / overview.other_require * 100}
      unit='學分'
      mobile={mobile}
    />
    <Card
      title='英文授課'
      complete={overview.english}
      require={overview.english_require}
      value={overview.english / overview.english_require * 100}
      unit='門'
      mobile={mobile}
    />
    {
      // 還沒送審或送審時選舊制
      (reviewStatus === 0 || generalCourseType === 0) &&
      <Card
        title='通識(舊制)'
        complete={overview.general}
        require={overview.general_require}
        value={overview.general / overview.general_require * 100}
        unit='學分'
        mobile={mobile}
      />
    }
    {
      // 還沒送審或送審時選新制
      // (reviewStatus === 0 || generalCourseType === 1) &&
      // <Card
      //   title='通識(新制)'
      //   complete={overview.general_new}
      //   require={overview.general_new_require}
      //   value={overview.general_new / overview.general_new_require * 100}
      //   unit='學分'
      //   mobile={mobile}
      // />
    }
    <Card
      title='外語'
      complete={overview.language}
      require={overview.language_require}
      value={overview.language / overview.language_require * 100}
      unit='學分'
      mobile={mobile}
    />
    <Card
      title='體育'
      complete={overview.pe}
      require={overview.pe_require}
      value={overview.pe / overview.pe_require * 100}
      unit='門'
      mobile={mobile}
    />
    <Card
      title='服務學習'
      complete={overview.service}
      require={overview.service_require}
      value={overview.service / overview.service_require * 100}
      unit='門'
      mobile={mobile}
    />
    <Card
      title='藝文賞析'
      complete={overview.art}
      require={overview.art_require}
      value={overview.art / overview.art_require * 100}
      unit='門'
      mobile={mobile}
    />
    <Card
      title='軍訓'
      complete={overview.military}
      optional={true}
      value={100}
      unit='學分'
      mobile={mobile}
    />
    <Card
      title='抵免研究所課程'
      complete={overview.graduate}
      optional={true}
      value={100}
      unit='學分'
      mobile={mobile}
    />
    <Card
      title='雙主修、輔系、學分學程'
      complete={overview.dmajor_minor_program}
      optional={true}
      value={100}
      unit='學分'
      mobile={mobile}
    />
  </React.Fragment>
)

const mapStateToProps = (state) => ({
  overview: state.Student.Graduation.detail.overview,
  reviewStatus: state.Student.Graduation.getReview.status,
  generalCourseType: state.Student.Graduation.getReview.generalCourseType
})

const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(Index)
