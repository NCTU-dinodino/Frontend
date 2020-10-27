import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import LinearProgress from '@material-ui/core/LinearProgress'

import red from '@material-ui/core/colors/red'
import yellow from '@material-ui/core/colors/yellow'
import green from '@material-ui/core/colors/green'

import Avatar from '@material-ui/core/Avatar'
import Chip from '@material-ui/core/Chip'
import DoneIcon from '@material-ui/icons/Done'
import EditIcon from '@material-ui/icons/Edit'
import ClearIcon from '@material-ui/icons/Clear'
import Tooltip from '@material-ui/core/Tooltip'
import DialogTitle from '@material-ui/core/DialogTitle'
import Dialog from '@material-ui/core/Dialog'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import {
  setScore,
} from '../../../../Redux/Assistants/Actions/Project/Status'

const ADD_STATUS_COLOR = [red['A100'], green[300]]
const STATUS_COLOR_L = [red[100], green[200]]
const STUDENT_STATUS_CN = ['外', '本']

const styles = theme => ({
  container: {
    width: '100%',
    margin: '0 auto',
    position: 'relative',
    marginBottom: '50px'
  },
  warningText: {
    fontSize: '30px',
    flex: 1,
    textAlign: 'center',
    color: '#6f6f6f'
  },
  warningTextSmall: {
    fontSize: '20px',
    flex: 1,
    textAlign: 'center',
    color: '#6f6f6f'
  },
  chip: {
    margin: '10px',
    fontSize: '15px',
  },
  tooltip: {
    fontSize: 15
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 100
  },
  textField2: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 400
  },
  label: {
    fontSize: '20px'
  },
  dialog: {
    padding: '10px'
  },
  button: {
    fontSize: '16px'
  },
})

class Status extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      score: {
        open: false,
        student: {
          id: '',
          name: ''
        },
        teacher: {
          id: '',
          name: ''
        },
        score: null,
        comment: ''
      }
    }
  }

  warningText = (text, css) => {
    return (
      <div style = {{ display: 'flex', width: '100%', padding: '20px' }}>
        <div style = {{ flex: 0.1 }}/>
        <div className={css}>
          {text}
        </div>
        <div style = {{ flex: 0.1 }} />
      </div>
    )
  }

  input_filter = (teachers, target) => {
    return teachers.filter( teacher => {
      return (
        target === '' || 
        teacher.professor_name.search(target) !== -1 ||
        teacher.accepted.projects.reduce( (project_prev, project) =>
          project_prev |= project.students.reduce( (student_prev, student) =>
            student_prev |= student.id.search(target) !== -1 || student.name.search(target) !== -1
          ,0) || project.title.search(target) !== -1
        ,false) ||
        teacher.pending.projects.reduce( (project_prev, project) =>
          project_prev |= project.students.reduce( (student_prev, student) =>
            student_prev |= student.id.search(target) !== -1 || student.name.search(target) !== -1
          ,0) || project.title.search(target) !== -1
        ,false)
      )
    })
  }

  hightlight = (label, raw_input) => {
    if (raw_input === '')
      return label
    const target = new RegExp(raw_input,"gi");
    var result, indices = [];
    while ( (result = target.exec(label)) ) {
        indices.push(result.index);
    }
    indices.push(label.length)
    return indices.length ? (
      <span>
        <span>{label.substr(0, indices[0])}</span>
        {
          indices.map( (index, idx) =>
            <span key={idx}>
              <span style={{background: 'yellow'}}>{label.substr(index, raw_input.length)}</span>
              <span>{idx === indices.length - 1 ? '' : label.substr(index + raw_input.length, indices[idx + 1] - index - raw_input.length)}</span>
            </span>
          )
        }
      </span>
    ) : label
  }

  render () {
    const { classes, Status } = this.props;

    return (
      Status.year === '' ? (
        this.warningText("請選取學年", classes.warningText)
      ) : Status.semester === '' ? (
        this.warningText("請選取學期", classes.warningText)
      ) : Status.first_second === '' ? (
        this.warningText("請選取專題", classes.warningText)
      ) : (
        <div className={classes.container} >
        {
          Status.loading ? 
            <div style = {{ display: 'flex', width: '100%', padding: '20px' }}>
              <div style={{ flex: 1 }}/>
              <CircularProgress style={{ color: '#68BB66' }} />
              <div style={{ flex: 1 }}/>
            </div> 
            : 
            this.input_filter(Status.teachers, Status.input).length ? 
              this.input_filter(Status.teachers, Status.input).map( (teacher, idx) => 
                <div key={idx} style={{ width: '90%', margin: '0 auto', marginBottom: '20px', background: 'red' }}>
                  <ExpansionPanel expanded>
                    <ExpansionPanelSummary>
                      <div style={{ width: '100%', display: 'flex' }} >
                        <div style={{ fontSize: 20, flex: 0.2, textAlign: 'center', color: 'black' }} >{this.hightlight(teacher.professor_name, Status.input)}</div>
                        <LinearProgress variant="determinate"
                          value={ teacher.gradeCnt / 7 * 100 }
                          style={{ flex: 0.6, margin: '10px auto' }}
                        />
                        <div style={{ fontSize: 20, flex: 0.2, textAlign: 'center', color: 'black' }} >{teacher.gradeCnt} 人</div>
                      </div>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                      <div style={{ width: '100%' }}>
                        <div style={{ fontWeight: 'bold', fontSize: '25px' }}>接受列表</div>
                        <hr style={{marginTop: '1px'}} />
                        {
                          teacher.accepted.projects.length !== 0 ? (
                            teacher.accepted.projects.map( (project, idx) => 
                              <div key={idx} style={{ paddingLeft: '10px'}}>
                                <div style={{ fontSize: '20px', color: 'black', fontWeight: 'bold' }}>
                                  專題題目：{ this.hightlight(project.title, Status.input) }
                                </div>
                                {
                                  project.students.map( (student, idx) => (
                                    <Tooltip title={
                                      (student.add_status === "0" ? "尚未選課" : "已選課") + "/" + ((student.score === null ? "尚未評分" : (student.score + "分")))
                                    } placement="top" key = {idx} classes={{ tooltip: classes.tooltip }}>
                                      <Chip
                                        label={this.hightlight(student.id + " " + student.name, Status.input)}
                                        className={classes.chip}
                                        style={
                                          { background: ADD_STATUS_COLOR[parseInt(student.add_status, 10)] }
                                        }
                                        deleteIcon={
                                          student.add_status === "0" ? 
                                            <ClearIcon style={{ fontSize: 30, marginRight: '5px'}} /> : 
                                          student.score === null ? 
                                            <EditIcon style={{ fontSize: 30, marginRight: '5px' }}/>
                                            :
                                            <DoneIcon style={{ fontSize: 30, marginRight: '5px' }}/>
                                        }
                                        onDelete={ 
                                          () => { 
                                            if (student.add_status === "1")
                                              this.setState({
                                                score: {
                                                  open: true,
                                                  title: project.title,
                                                  score: student.score,
                                                  comment: student.comment,
                                                  student: {
                                                    id: student.id,
                                                    name: student.name
                                                  },
                                                  teacher: {
                                                    id: teacher.professor_id,
                                                    name: teacher.professor_name
                                                  }
                                                }
                                              })
                                          }
                                        }
                                        avatar={<Avatar style={{ fontSize: 20, background: STATUS_COLOR_L[parseInt(student.add_status, 10)] }}>{STUDENT_STATUS_CN[parseInt(student.status, 10)]}</Avatar>}
                                      />
                                    </Tooltip>
                                  ))
                                }
                                <br />
                                <br />
                                <br />
                              </div>
                            )
                          ) : this.warningText("無資料", classes.warningTextSmall)
                        }
                        <div style={{ fontWeight: 'bold', fontSize: '25px' }}>審核列表</div>
                        <hr style={{marginTop: '1px'}} />
                        {
                          teacher.pending.projects.length !== 0 ? (
                            teacher.pending.projects.map( (project, idx) => 
                              <div key={idx} style={{ paddingLeft: '10px'}}>
                                <div style={{ fontSize: '20px', color: 'black', fontWeight: 'bold' }}>
                                  { this.hightlight(project.title, Status.input) }
                                </div>
                                {
                                  project.students.map( (student, idx) => (
                                    <Chip
                                      label={this.hightlight(student.id + " " + student.name, Status.input)}
                                      className={classes.chip}
                                      style={{ background: yellow[300] }}
                                      avatar={<Avatar style={{ fontSize: 20, background: yellow[200] }}>{STUDENT_STATUS_CN[parseInt(student.status, 10)]}</Avatar>}
                                    />
                                  ))
                                }
                                <br />
                                <br />
                                <br />
                              </div>
                            )
                          ) : this.warningText("無資料", classes.warningTextSmall)
                        }
                      </div>
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                </div>
              ) : this.warningText("找不到符合的資料，請移除所有搜尋條件", classes.warningText)
        }
        <Dialog 
          onClose = { 
            () => this.setState({ 
              score: { ...this.state.score,
                open: false
              }
            })
          } 
          open = { this.state.score.open } 
        >
          <DialogTitle><div style = {{ fontSize: '25px' }} >助理端評分</div></DialogTitle>
            <h4 style = {{ paddingLeft: '30px' }}>{this.state.score.student.id + " " + this.state.score.student.name}</h4>
            <div style = {{ display: 'flex', paddingLeft: '20px', paddingRight: '20px' }}>
              <TextField
                label='分數' type='number'
                value={ this.state.score.score === null ? '' : this.state.score.score }
                onChange={ (event) => this.setState({ 
                  score: { ...this.state.score,
                    score: event.target.value
                  }
                })}
                margin='normal'
                className={classes.textField}
                InputLabelProps={{
                  classes: {
                    root: classes.label
                  },
                  shrink: true
                }}
              />
              <TextField
                label='評論'
                margin='normal'
                value={ this.state.score.comment || '' }
                className={classes.textField2}
                onChange={ (event) => 
                  this.setState({ score: { ...this.state.score,
                    comment: event.target.value
                  }})
                }
                InputLabelProps={{
                  classes: {
                    root: classes.label
                  },
                  shrink: true
                }}
              />
            </div>
            <br />
            <div style = {{ display: 'flex' }}>
              <div style = {{ flex: 1 }} />
              <Button className={classes.button} onClick={ () => 
                this.setState({ 
                  score: { ...this.state.score,
                    open: false,
                  }
                })
              } >
                取消
              </Button>
              <Button color="primary" className={classes.button} onClick = { () => {
                if (
                     parseInt(this.state.score.score, 10) < 0
                  || parseInt(this.state.score.score, 10) > 100
                )
                  alert('分數需介於0~100之間');
                else if ((
                       parseInt(this.state.score.score, 10) >= 90 
                    || parseInt(this.state.score.score, 10) < 60
                  ) && (
                       this.state.score.comment === '' 
                    || this.state.score.comment === null
                  )
                )
                  alert('分數低於60分或是90分以上需附上評論');
                else {
                  this.props.setScore({
                    student_id: this.state.score.student.id,
                    tname: this.state.score.teacher.name,
                    research_title: this.state.score.title,
                    first_second: Status.first_second,
                    semester: Status.year + '-' + Status.semester,
                    new_score: this.state.score.score,
                    new_comment: this.state.score.comment
                  })
                  this.setState({ 
                    score: { ...this.state.score,
                      open: false,
                    }
                  })
                }
              }}>
                送出！
              </Button>
            </div>
          </Dialog>
        </div>
      )
    )
  }
}

const mapStateToProps = (state) => ({
  Status: state.Assistant.Project.Status,
})

const mapDispatchToProps = (dispatch) => ({
  setScore: (payload) => dispatch(setScore(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Status))