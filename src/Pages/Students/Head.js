
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Navbar from '../../Components/Navbar'
import { fetchUser } from '../../Redux/Students/Actions/User'
import { getGraduationInfo } from '../../Redux/Students/Actions/Graduation'
import { fetchProfessors } from '../../Redux/Students/Actions/Professor'

class Head extends Component {
  componentDidMount () {
    this.props.fetchUser()
    this.props.getGraduationInfo()
    this.props.fetchProfessor()
  }

  render () {
    const { studentIdcard } = this.props

    return (
      <div style={{ paddingTop: 56 }}>
        <Navbar
          type='student'
          name={studentIdcard.sname}
          subname={studentIdcard.program + studentIdcard.grade}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  studentIdcard: state.Student.User.studentIdcard
})

const mapDispatchToProps = (dispatch) => ({
  fetchUser: () => dispatch(fetchUser()),
  getGraduationInfo: () => dispatch(getGraduationInfo()),
  fetchProfessor: () => dispatch(fetchProfessors())
})

export default connect(mapStateToProps, mapDispatchToProps)(Head)
