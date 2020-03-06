
import React, { Component } from 'react'
import { Grid, Row } from 'react-bootstrap'
import { connect } from 'react-redux'
import Navbar from '../../Components/Navbar'
import { fetchUser } from '../../Redux/Teachers/Actions/User'

class Head extends Component {
  componentDidMount () {
    this.props.fetchUser()
  }

  render () {
    return (
      <Grid id='Head' fluid>
        <Row style={{ background: '#F5F5F5' }}>
          <Navbar
            type='teacher'
            name={this.props.idCard.tname}
            subname={this.props.idCard.teacher_id}
          />
        </Row>
      </Grid>
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
