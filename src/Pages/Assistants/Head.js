
import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import Navbar from '../../Components/Navbar'
import { UpdateUserInfo } from '../../Redux/Assistants/Actions/User'

class Head extends React.Component {
  componentDidMount () {
    axios.get('/_api/assistants/profile')
      .then(studentData => {
        if (studentData.data[0].status) {
          this.props.UpdateUserInfo({
            name: studentData.data[0].aname,
            prog: studentData.data[0].assistant_id,
            grad: studentData.data[0].status
          })
        } else window.location.assign('/logout')
      })
      .catch(err => {
        console.log(err)
      })
  }

  render () {
    return (
      <div style={{ paddingTop: 56 }}>
        <Navbar
          type='assistant'
          name={this.props.idCard.name}
          subname={this.props.idCard.prog + this.props.idCard.grad}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  idCard: state.Assistant.User.idCard
})

const mapDispatchToProps = (dispatch) => ({
  UpdateUserInfo: (payload) => dispatch(UpdateUserInfo(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(Head)
