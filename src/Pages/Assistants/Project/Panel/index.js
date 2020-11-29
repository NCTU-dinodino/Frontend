import React from 'react'
import { withStyles, MuiThemeProvider, createMuiTheme  } from '@material-ui/core/styles'
import { connect } from 'react-redux'
// import { styles } from './../styles'

import { Tooltip, IconButton } from '@material-ui/core'
import { 
  projectHandleChange 
} from '../../../../Redux/Assistants/Actions/Project'



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

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';


import BlankBoxIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox'
import WarningIcon from '@material-ui/icons/Warning'
import HourglassFullIcon from '@material-ui/icons/HourglassFull'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'

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
    margin: '0 auto',
    width: '90%',
    position: 'relative',
    top: 90,
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

  getActionStep(progress) {
    switch (progress) {
      case "PENDING_APPLY":
        return 0;
      case "FAIL_CPE":
        return 1;
      case "PENDING_CPE":
        return 1;
      case "PENDING_TEACHER":
        return 2;
      case "WAITING_ADD_COURSE":
        return 3;
      case "PENDING_SCORE":
        return 4;
      case "ACCEPTED":
        return 5;
      default:
        window.alert("Not such progress " + progress)
    }
  }

  getLabelPropsError(progress, index) {
    if (progress === "FAIL_CPE")
      if (index === 1)
        return true;
    return false;
  }

  getRank(progress) {
    switch(progress) {
      case "WAITING_APPLY":
        return 0;
      case "FAIL_CPE":
        return 1;
      case "PENDING_CPE":
        return 2;
      case "PENDING_TEACHER":
        return 3;
      case "WAITING_ADD_COURSE":
        return 4;
      case "PENDING_SCORE":
        return 5;
      case "ACCEPTED":
        return 6;
      default:
        window.alert("No such progress " + progress)
    }
  }

  /* label */
  getLabelDOM(label, color) {
    return <div style={{ color }}>{label}</div>
  }

  labelRangeStructure(progress, config) {
    if (this.getRank(progress) < this.getRank(config.lb))
      return this.getLabelDOM(config.lbLabel, config.lbColor);
    else if (this.getRank(progress) > this.getRank(config.ub))
      return this.getLabelDOM(config.ubLabel, config.ubColor);
    else {
      const targetList = config.items.filter( item => item.condition === progress )
      if (targetList.length !== 0) {
        const target = targetList[0]
        return this.getLabelDOM(target.label, target.color)
      } else
        window.alert("No such progress " + progress)
    }
    return <div></div>
  }

  getLabel(progress, index) {
    if (index === 0) {
      return this.labelRangeStructure(
        progress, {
          lb: "WAITING_APPLY",
          lbLabel: '',
          lbColor: '',
          ub: "WAITING_APPLY",
          ublabel: '學生已在dino申請',
          ubColor: 'green',
          items: [{
            condition: "WAITING_APPLY",
            label: "等待學生在dino申請",
            color: 'blue'
          }]
        }
      )
    } else if (index === 1) {
      return this.labelRangeStructure(
        progress, {
          lb: "FAIL_CPE",
          lbLabel: 'CPE',
          lbColor: '',
          ub: "PENDING_CPE",
          ublabel: 'CPE 通過',
          ubColor: 'green',
          items: [{
            condition: "FAIL_CPE",
            label: "CPE 未通過",
            color: 'red'
          }, {
            condition: "PENDING_CPE",
            label: "CPE 待審核",
            color: 'blue'
          }]
        }
      )
    } else if (index === 2) {
      return this.labelRangeStructure(
        progress, {
          lb: "PENDING_TEACHER",
          lbLabel: '教授審核',
          lbColor: '',
          ub: "PENDING_TEACHER",
          ublabel: '教授審核通過',
          ubColor: 'green',
          items: [{
            condition: "PENDING_TEACHER",
            label: "等待教授審核",
            color: 'blue'
          }]
        }
      )
    } else if (index === 3) {
      return this.labelRangeStructure(
        progress, {
          lb: "WAITING_ADD_COURSE",
          lbLabel: '選課',
          lbColor: '',
          ub: "WAITING_ADD_COURSE",
          ublabel: '學生已選課',
          ubColor: 'green',
          items: [{
            condition: "WAITING_ADD_COURSE",
            label: "等待學生選課",
            color: 'blue'
          }]
        }
      )
    } else if (index === 4) {
      return this.labelRangeStructure(
        progress, {
          lb: "PENDING_SCORE",
          lbLabel: '評分',
          lbColor: '',
          ub: "PENDING_SCORE",
          ublabel: '已評分',
          ubColor: 'green',
          items: [{
            condition: "PENDING_SCORE",
            label: "等待評分",
            color: 'blue'
          }]
        }
      )
    }
  }
  /* label */
  getIconDOM(iconType, color) {
    switch (iconType) {
      case "Warning":
        return <WarningIcon style={{ color }} />
      case "HourglassFull":
        return <HourglassFullIcon style={{ color }} />
      case "CheckCircle":
        return <CheckCircleIcon style={{ color }} />
      case "none":
        return ''
      default:
        window.alert("No such icon type")
    }
    return ''
  }
  iconRangeStructure(progress, config) {
    if (this.getRank(progress) < this.getRank(config.lb))
      return this.getIconDOM(config.lbIconType, config.lbColor);
    else if (this.getRank(progress) > this.getRank(config.ub))
      return this.getIconDOM(config.ubIconType, config.ubColor);
    else {
      const targetList = config.items.filter( item => item.condition === progress )
      if (targetList.length !== 0) {
        const target = targetList[0]
        return this.getIconDOM(target.iconType, target.color)
      } else
        window.alert("No such progress " + progress)
    }
    return <div></div>
  }
  /* icon */
  getIcon(progress, index) {
    if (index === 0) {
      return this.iconRangeStructure(
        progress, {
          lb: "WAITING_APPLY",
          lbIconType: 'HourglassFull',
          lbColor: '',
          ub: "WAITING_APPLY",
          ubIconType: 'CheckCircle',
          ubColor: 'green',
          items: [{
            condition: "WAITING_APPLY",
            iconType: "HourglassFull",
            color: 'blue'
          }]
        }
      )
    } else if (index === 1) {
      return this.iconRangeStructure(
        progress, {
          lb: "FAIL_CPE",
          lbIconType: 'none',
          lbColor: '',
          ub: "PENDING_CPE",
          ubIconType: 'CheckCircle',
          ubColor: 'green',
          items: [{
            condition: "FAIL_CPE",
            iconType: "Warning",
            color: 'red'
          }, {
            condition: "PENDING_CPE",
            iconType: "HourglassFull",
            color: 'blue'
          }]
        }
      )
    } else if (index === 2) {
      return this.iconRangeStructure(
        progress, {
          lb: "PENDING_TEACHER",
          lbIconType: 'none',
          lbColor: '',
          ub: "PENDING_TEACHER",
          ubIconType: 'CheckCircle',
          ubColor: 'green',
          items: [{
            condition: "PENDING_TEACHER",
            iconType: "HourglassFull",
            color: 'blue'
          }]
        }
      )
    } else if (index === 3) {
      return this.iconRangeStructure(
        progress, {
          lb: "WAITING_ADD_COURSE",
          lbIconType: 'none',
          lbColor: '',
          ub: "WAITING_ADD_COURSE",
          ubIconType: 'CheckCircle',
          ubColor: 'green',
          items: [{
            condition: "WAITING_ADD_COURSE",
            iconType: "HourglassFull",
            color: 'blue'
          }]
        }
      )
    } else if (index === 4) {
      return this.iconRangeStructure(
        progress, {
          lb: "PENDING_SCORE",
          lbIconType: 'none',
          lbColor: '',
          ub: "PENDING_SCORE",
          ubIconType: 'CheckCircle',
          ubColor: 'green',
          items: [{
            condition: "PENDING_SCORE",
            iconType: "HourglassFull",
            color: 'blue'
          }]
        }
      )
    }
    return null
  }

  studentChip(student, idx) {
    const { classes, Project } = this.props;
    const steps = [
      '在dino申請', 'CPE', '教授審核', '選課', '評分'
    ]
    return (
      <div 
        style={
          Project.select.filter( obj => obj.id === student.id ).length === 0 ? 
          { display: 'block', margin: '10px', padding: '20px 0' } : 
          { display: 'block', margin: '10px', padding: '20px 0', background: green[100] }
        }
      >
      <IconButton aria-label="delete" style={{ position: 'relative', top: -4, left: 5}}
        disabled={
          Project.select.length === 0 ? false : Project.select[0].level !== student.level
        }
        onClick={ () =>
          Project.select.filter( obj => obj.id === student.id ).length !== 0 ? 
            this.props.projectHandleChange({
              select: Project.select.filter( obj => obj.id !== student.id)
            }) : 
            this.props.projectHandleChange({
              select: [ ...Project.select, student ]
            })
        }
      >
      {
        Project.select.length === 0 || Project.select.filter( obj => obj.id === student.id ).length === 0 ?
        <BlankBoxIcon /> : <CheckBoxIcon/>
      }
      </IconButton>
      <Chip
        label={student.id + " " + student.name}
        className={classes.chip}
        style={ { background: green[300] } }
        avatar={
          <Avatar style={ { fontSize: 20, background: green[200] } }>
            {STUDENT_STATUS_CN[parseInt(student.status, 10)]}
          </Avatar>
        }
      />
      <Stepper activeStep={this.getActiveStep(student.level)} alternativeLabel
        style={
          Project.select.filter( obj => obj.id === student.id ).length === 0 ? {} : { background: green[100]}
        }
      >
      {steps.map((label, index) => {
        const props = {};
        const labelProps = {};

        labelProps.error = this.getLabelPropsError(student.level, index);

        return (
          <Step key={label} {...props}>
            <StepLabel {...labelProps}
              StepIconProps={ this.getIcon(student.level, index) !== null ? { icon: this.getIcon(student.level, index) } : ''}
            >
              {this.getLabel(student.level, index)}
            </StepLabel>
          </Step>
        );
      })}
      </Stepper>
      </div>
    );
  }

  showProjectPanel(project, idx) {
    return <div style={{ margin: '30px' }}>
      <hr style={{ color: 'black' }}/>
      <div style={{ fontSize: 20, color: 'black' }} >專題題目：{project.title} </div>
      <div style={{ display: 'block' }}>
        {project.students.map( student => { 
          return this.studentChip(student)
        })}
      </div>
    </div>
  }

  showTeacherPanel(teacher, idx) {
    const { Project } = this.props;
    return <div
      key={idx}
      style={{ width: '100%', margin: '0 auto', marginBottom: '20px' }}
    >
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
        <ExpansionPanelDetails style={{ display: 'block' }}>
        {
          [ ...teacher.accepted.projects, ...teacher.pending.projects ].map( (project, idx) => {
            return this.showProjectPanel({
              ...project,
              professor_name: teacher.professor_name
            }, idx)
          })
        }
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  }

  showIndex() {
    const { Project } = this.props;
    if (Project.rawData.length === 0)
      return <div>無資料</div>
    else
      return <React.Fragment>{
        Project.rawData.map( (teacher, idx) => {
          return this.showTeacherPanel(teacher, idx);
        })
      }</React.Fragment>
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