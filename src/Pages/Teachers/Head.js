
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Navbar from '../../Components/Navbar'
import { fetchUser } from '../../Redux/Teachers/Actions/User'

class Head extends Component {
  componentDidMount () {
    this.props.fetchUser()
  }

  render () {
    return (
      <div style={{ paddingTop: 56 }}>
        <Navbar
          type='teacher'
          name={this.props.idCard.tname}
          subname={this.props.idCard.teacher_id}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  idCard: state.Teacher.User.idCard
})

const mapDispatchToProps = (dispatch) => ({
  fetchUser: () => dispatch(fetchUser())
})

export default connect(mapStateToProps, mapDispatchToProps)(Head)
