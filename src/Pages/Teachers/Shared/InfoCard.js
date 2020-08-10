import React from 'react'
import axios from 'axios'
// mui
import Avatar from 'material-ui/Avatar'
import {Card, CardText} from 'material-ui/Card'
import {CardHeader, Table, TableBody, TableRow, TableRowColumn} from 'material-ui'
import {Tabs, Tab} from 'material-ui/Tabs'
// for multiTheme
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
// others
import {ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts'
import MailButton from '../../../Components/mail/MailButton'

import FakeData from '../../../Resources/FakeData'

// REDUX
import { connect } from 'react-redux'
import { updateSudentInfo, upadteStudentScore } from '../../../Redux/Teachers/Actions/InfoCard/index'

const semester = ['', '上', '下', '暑']

class InfoCard extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      scoreData: {
        student_id: '0316000',
        sname: '吳泓寬',
        program: '網多',
        graduate: '0',
        graduate_submit: '0',
        email: 'student@gmail.com',
        failed: true,
        score: FakeData.StudentScore
      }
    }
  }

  fetchStudentProfile () {
    const s = this.props.student
    let scoreData = this.state.scoreData
    scoreData.student_id = s.student_id
    scoreData.sname = s.sname
    axios.post('/professors/advisee/personalInfo', {
      student_id: s.student_id
    }).then(res => {
      console.log('student Info', res.data)
      const r = res.data
      scoreData.sname = r.sname
      scoreData.email = r.email
      scoreData.program = r.program
      this.setState({scoreData})
    }).catch(err => {
      console.log(err)
    })
    this.setState({scoreData})
  }

  fetchData () {
    let sid = this.props.student.student_id
    this.props.UpdateSudentInfo(sid)
    this.props.UpadteStudentScore(sid)
  }

  componentDidMount () {
    this.fetchData()
    // const s = this.props.student
    // console.log('---------- s ----------')
    // console.log(s)
    // this.handleSelected(s.student_id)
    // this.fetchStudentProfile()
    // console.log('SCORE DATA: ', this.state.scoreData)
  }

  handleSelected (sid) {
    console.log('HANDLE SELECTED ' + sid)
    let scoreData = this.state.scoreData
    scoreData.score = FakeData.StudentScore
    axios.post('/professors/advisee/semesterGradeList', {
      student_id: sid
    }).then(res => {
      console.log('--> res = ')
      console.log(res)
      scoreData.score = res.data
      this.setState({scoreData})
    }).catch(err => {
      console.log(err)
    })
    this.setState({scoreData})
  }
  render () {
    return (
      <MuiThemeProvider>
        <Card style={this.state.scoreData.failed && {backgroundColor: '#fff', border: '2px solid #F50057'}}>
          <CardHeader
            avatar={
              <Avatar style={
                this.state.scoreData.failed
                  ? {backgroundColor: '#F50057', color: '#fff'}
                  : {backgroundColor: '#3949AB', color: '#fff'}
              }>
                {this.props.studentInfo.sname[0]}
              </Avatar>
            }
            title={this.props.studentInfo.sname}
            subtitle={`${this.props.studentInfo.program} / ${this.props.student.student_id}`}>
            <span style={{position: 'absolute', right: 20}}>
              <MailButton
                sender={this.props.sender}
                sender_email={this.props.sender_email}
                receiver={this.props.student.student_id}
                receiver_email={this.props.studentInfo.email}
                failed={this.state.scoreData.failed}
              />
            </span>
          </CardHeader>
          {/*<CardText>
            <div className='text-center h5 mb-2'>各學年度平均總成績</div>
            <div>
              <ResponsiveContainer
                width={(window.innerWidth < 768) ? window.innerWidth * 0.6 : window.innerWidth * 0.4}
                aspect={2}>
                <LineChart
                  data={this.props.studentScore}
                  margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                  <XAxis dataKey='semester' />
                  <YAxis domain={[0, 100]} />
                  <CartesianGrid strokeDasharray='3 3' />
                  <Tooltip />
                  <Line
                    type='monotone'
                    dataKey='avg'
                    stroke={`${this.state.scoreData.failed ? '#F50057' : '#8884d8'}`}
                    activeDot={{r: 8}}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardText>
          <CardText>
            <Tabs>
              {
                this.props.studentScore && this.props.studentScore.map(
                  (v, i) => (
                    <Tab
                      key={i}
                      label={`${v.semester.split('-')[0]}${semester[parseInt(v.semester.split('-')[1], 10)]}`}
                      buttonStyle={
                        v.failed
                          ? {backgroundColor: '#fd93b5'}
                          : {backgroundColor: '#87cdff'}}>
                      {<Table>
                        {comment<TableHeader displaySelectAll={false}>
                        <TableRow>
                          <TableRowColumn>科目</TableRowColumn>
                          <TableRowColumn>成績</TableRowColumn>
                        </TableRow>
                      </TableHeader> style={c.pass || {color: 'red'}}comment}
                        <TableBody displayRowCheckbox={false} >
                          {v.score.map((c, idx) => (
                            <TableRow key={idx} >
                              <TableRowColumn>{c.cn}</TableRowColumn>
                              <TableRowColumn>{c.score === null ? (c.pass ? '通過' : '不通過') : c.score}</TableRowColumn>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>}
                    </Tab>
                  )
                )
              }
            </Tabs>

          </CardText>*/}
        </Card>
      </MuiThemeProvider>
    )
  }
}

const mapStateToProps = (state) => ({
  studentScore: state.Teacher.InfoCard.studentScore,
  studentInfo: state.Teacher.InfoCard.studentInfo,
})
const mapDispatchToProps = (dispatch) => ({
  UpdateSudentInfo: (sid) => dispatch(updateSudentInfo(sid)),
  UpadteStudentScore: (sid) => dispatch(upadteStudentScore(sid))
})
export default connect(mapStateToProps, mapDispatchToProps)(InfoCard)
