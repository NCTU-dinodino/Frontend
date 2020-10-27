import React from 'react'
import { withStyles, MuiThemeProvider, createMuiTheme  } from '@material-ui/core/styles'
import { connect } from 'react-redux'
// import { styles } from './../styles'

import { Tooltip, IconButton } from '@material-ui/core'
import { 
  projectHandleChange 
} from '../../../../Redux/Assistants/Actions/Project'

import Check from '@material-ui/icons/CheckBox'
import CheckNone from '@material-ui/icons/CheckBoxOutlineBlank'


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
import DialogTitle from '@material-ui/core/DialogTitle'
import Dialog from '@material-ui/core/Dialog'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

const ADD_STATUS_COLOR = [red['A100'], green[300]]
const STATUS_COLOR_L = [red[100], green[200]]
const STUDENT_STATUS_CN = ['外', '本']

const theme = createMuiTheme({
  palette: {
    primary: {
      main: 'rgb(104, 187, 102)'
    }
  }
})

const styles = theme => ({
  studentLinearProgressRoot: {
    flexGrow: 1,
  },

  Panels: {
    width: 'calc(100vw - 80px)',
    position: 'relative',
    top: 65,
    left: 60,
    paddingBottom: 50
  },
  chip: {
    margin: '10px',
    fontSize: '15px',
  },
});

class index extends React.Component {
  selectAll = () => {
    const { Project } = this.props;
    if (Project.selectAll) {
      this.props.projectHandleChange({select: [], selectAll: false})
    } else {
      this.props.projectHandleChange({select: Project.curdata, selectAll: true})
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
  
  filterByIndex(teacher) {
    const { Project } = this.props;
    return {
      ...teacher,
      accepted: {
        ...teacher.accepted,
        projects: teacher.accepted.projects.filter( project => project.level === Project.index )
      },
      pending: {
        ...teacher.pending,
        projects: teacher.pending.projects.filter( project => project.level === Project.index )
      }
    }
  }

  studentChip(student, idx) {
    const { classes, Project } = this.props;
    return (
      <Chip
        label={student.id + " " + student.name}
        className={classes.chip}
        style={
          (Project.index !== parseInt(student.level, 10) || Project.index === 5) 
          ? { background: green[300] } 
          : { background: red['A100'] }
        }
        avatar={
          <Avatar style={
            (Project.index !== parseInt(student.level, 10) || Project.index === 5) 
            ? { fontSize: 20, background: green[200] } 
            : { fontSize: 20, background: red[100] }
          }
          >
            {STUDENT_STATUS_CN[parseInt(student.status, 10)]}
          </Avatar>
        }
      />
    );
  }

  showProjectPanel(project, idx) {
    return (
      <div
        key={idx}
        style={{ width: '100%', margin: '0 auto', marginBottom: '20px', background: 'red' }}
      >
        <ExpansionPanel expanded>
          <ExpansionPanelSummary>
            <div style={{ width: '100%', display: 'flex' }} >
              <div style={{ fontSize: 20, flex: 0.2, textAlign: 'center', color: 'black' }} >{project.professor_name}</div>
              <div style={{ fontSize: 20, flex: 0.8, textAlign: 'center', color: 'black' }} >專題題目：{project.title} </div>
            </div>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
          {
            project.students.map( student => { 
              return this.studentChip(student)
            })
          }
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    )
  }

  showIndex() {
    const { Project } = this.props;
    let target = Project.rawData.map( teacher => this.filterByIndex(teacher))
      .filter( (teacher) =>
        teacher.accepted.projects.length !== 0 ||
        teacher.pending.projects.length !== 0
      )
    if (target.length === 0)
      return <div>無資料</div>
    else
      return target.map( (teacher) => {
        return [ ...teacher.accepted.projects, ...teacher.pending.projects ].map( (project, idx) => {
          return this.showProjectPanel({
            ...project,
            professor_name: teacher.professor_name
          }, idx)
        })
      })
    /*
    Project.rawdata.map( (teacher, idx) => 
    <div key={idx} style={{ width: '100%', margin: '0 auto', marginBottom: '20px', background: 'red' }}>
      <ExpansionPanel expanded>
        <ExpansionPanelSummary>
          <div style={{ width: '100%', display: 'flex' }} >
            <div style={{ fontSize: 20, flex: 0.2, textAlign: 'center', color: 'black' }} >{this.hightlight(teacher.professor_name, Project.input)}</div>
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
                      { this.hightlight(project.title, Project.input) }
                    </div>
                    {
                      project.students.map( (student, idx) => (
                        <Tooltip title={
                          (student.add_status === "0" ? "尚未選課" : "已選課") + "/" + ((student.score === null ? "尚未評分" : (student.score + "分")))
                        } placement="top" key = {idx} classes={{ tooltip: classes.tooltip }}>
                          <Chip
                            label={this.hightlight(student.id + " " + student.name, Project.input)}
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
                      { this.hightlight(project.title, Project.input) }
                    </div>
                    {
                      project.students.map( (student, idx) => (
                        <Chip
                          label={this.hightlight(student.id + " " + student.name, Project.input)}
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
    )
    */
  }

  render() {
    const { classes, Project } = this.props;
    return (
      <div className={ classes.Panels } >
      {
        Project.fetching ? 
          <MuiThemeProvider theme={theme}>
            <CircularProgress className={classes.loading} color={'primary'}/>
          </MuiThemeProvider> :
        this.showIndex()
      }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  Project: state.Assistant.Project
})

const mapDispatchToProps = (dispatch) => ({
  projectHandleChange: (payload) => dispatch(projectHandleChange(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(index))