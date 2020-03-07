import React from 'react'
import axios from 'axios'
import {Grid, Row, Col} from 'react-bootstrap'
import Navbar from '../../Components/Navbar'
import {connect} from 'react-redux'
import {UpdateUserInfo} from '../../Redux/Assistants/Actions/User'

class Head extends React.Component {
  componentDidMount () {
    axios.get('/assistants/profile')
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
      <Grid fluid>
        <Row>
          <Col>
            <Navbar
              type='assistant'
              name={this.props.idCard.name}
              subname={this.props.idCard.prog + this.props.idCard.grad}
            />
          </Col>
        </Row>
      </Grid>
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
