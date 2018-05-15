import React from 'react'
import axios from 'axios'
import {Grid, Row, Col, Form, FormGroup, ControlLabel, FormControl} from 'react-bootstrap'

import Table from '../../../Components/Table'
import Badge from '../../../Components/Badge'
import FakeData from '../../../Resources/FakeData/index'

class StudentList extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      year: 109,
      studentProjects: []
    }
  }

  componentWillMount () {
    this.fetchList(this.state.year)
  }

  handleYearChange = (e) => {
    this.fetchList(e.target.value)
  }

  fetchList = (year) => {

    // Format Params
    const pad = (num, size) => {
      const s = "000000000" + num;
      return s.substr(s.length-size);
    }
    let yearParam = pad(year-104, 2)
    console.log(yearParam)

    axios.post('/assistants/researchTeacher', {
      year: yearParam
    }).then((resp) => {
      this.setState({
        ...this.state,
        studentProjects: resp.data,
        year: year
      })
    }).catch(err => {
      console.log(err)
    })
  }

  render () {
    const studentsProject = FakeData.StudentProject
    return (
      <Grid>
        <Col sm={12} xsHidden style={{height: 30}} />
        <Row>
          <Col xs={12} sm={7}>
            <Table>
              <thead>
              <tr>
                <th>學號</th>
                <th>學生姓名</th>
                <th>組別</th>
                <th>專題指導教授</th>
              </tr>
              </thead>
              <tbody>
              {this.state.studentProjects.map((student) => {
                const foundProjectTeacher = (student.project_tname != null)
                return (
                  <tr>
                    <td>{student.student_id}</td>
                    <td>{student.name}</td>
                    <td>{student.program}</td>
                    <td style={{color: foundProjectTeacher ? '#418166' : '#c61234'}}>{foundProjectTeacher ? student.project_tname : '尚未找到專題教授'}</td>
                  </tr>
                )
              })}
              </tbody>
            </Table>
          </Col>
          <Col xs={12} sm={4}>
            <Form >
              <FormGroup controlId="formControlsSelect">
                <ControlLabel>學生畢業學年度</ControlLabel>
                <FormControl
                  componentClass='select'
                  placeholder='請選擇畢業學年度'
                  onChange={this.handleYearChange}
                >
                  <option value='107'>107</option>
                  <option value='108'>108</option>
                  <option value='109' selected>109</option>
                </FormControl>
              </FormGroup>
            </Form>
            <Badge bgColor='#cc3333'>未找專題</Badge>
            <Badge bgColor='#64b5f6'>資工A班</Badge>
            <Badge bgColor='#64b5f6'>資工B班</Badge>
            <Badge bgColor='#64b5f6'>資電組</Badge>
            <Badge bgColor='#64b5f6'>網多組</Badge>
          </Col>
        </Row>
      </Grid>
    )
  }
}

export default StudentList
