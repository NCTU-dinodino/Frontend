import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import FadeIn from 'react-fade-in'
import { Grid, Row, Col } from 'react-bootstrap'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import HomeItem from './Home.js'
import CourseItem from './Course/index.js'
import GroupItem from './Group/Group.js'
import FamilyItem from './Family/index.js'
import ProfileItem from './Profile.js'
import Mail from '../../Components/mail'

import Navbar from '../../Components/Navbar'

class Head extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedIndex: 0,
      idCard: {
        name: '資料錯誤',
        status: '',
        id: ''
      }
    }
  }

  componentWillMount () {
    let _this = this

    axios.get('/professors/profile').then(res => {
      _this.setState({
        idCard: {
          name: res.data[0].tname,
          status: res.data[0].status,
          id: res.data[0].teacher_id
        }
      })
      this.select(2)
    }).catch(err => {
      console.log(err)
    })
  }

  componentDidMount () {
    this.select(2)
  }

  select (index) {
    if (index === 0) {
      ReactDOM.render(
        <Col xsHidden smHidden>
          <div>
            <FadeIn>
              <HomeItem />
            </FadeIn>
          </div>
        </Col>,
        document.getElementById('page'))
    } else if (index === 1) {
      ReactDOM.render(
        <Col xsHidden smHidden>
          <div>
            <FadeIn>
              <CourseItem tid={this.state.idCard.id} />
            </FadeIn>
          </div>
        </Col>,
        document.getElementById('page'))
    } else if (index === 2) {
      ReactDOM.render(
        <Col xsHidden >
          <FadeIn>
            <GroupItem idCard={this.state.idCard} />
          </FadeIn>
        </Col>,
        document.getElementById('page'))
    } else if (index === 3) {
      ReactDOM.render(
        <Col xsHidden smHidden>
          <a>
            <FadeIn>
              <FamilyItem tid={this.state.idCard.id} />
            </FadeIn>
          </a>
        </Col>,
        document.getElementById('page'))
    } else if (index === 4) {
      ReactDOM.render(
        <Col xsHidden smHidden>
          <a>
            <FadeIn>
              <MuiThemeProvider>
                <Mail type='professor' id={this.state.idCard.id} />
              </MuiThemeProvider>
            </FadeIn>
          </a>
        </Col>,
        document.getElementById('page'))
    } else if (index === 5) {
      ReactDOM.render(
        <FadeIn>
          <ProfileItem idCard={this.state.idCard} />
        </FadeIn>,
        document.getElementById('page'))
    }

    this.setState({selectedIndex: index})
  }

  render () {
    const onTouchTaps = [
      () => this.select(0),
      () => this.select(1),
      () => this.select(2),
      () => this.select(3),
      () => this.select(4),
      () => this.select(5)
    ]
    return (
      <Grid id='Head' fluid>
        <Row style={{background: '#F5F5F5'}}>
          <Navbar type='teacher'
            name={this.state.idCard.name}
            subname={this.state.idCard.id}
            selectedIndex={this.state.selectedIndex}
            onTouchTaps={onTouchTaps}
          />

          <div id='page' />
          {/* For mobile, tablet user */}
          <Col xs={12} lgHidden>
            <h2> { this.state.selectedIndex === 5
              ? ''
              : '行動版功能目前測試中，造成不便敬請見諒。' } </h2>
          </Col>
        </Row>
      </Grid>
    )
  }
}

export default Head
