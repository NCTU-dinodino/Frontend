import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'

import { IconButton } from '@material-ui/core'
import MailIcon from '@material-ui/icons/Mail';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';

import BlankBoxIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox'
import IndeterminateCheckBox from '@material-ui/icons/IndeterminateCheckBox'
import Chip from '@material-ui/core/Chip'
import Button from '@material-ui/core/Button';

import { 
  projectHandleChange,
  fetchData,
  sendWarningMail,
  setCPEStatus,
  fetchXLSX,
  fetchCsv,
  uploadXLSX,
  withdrawStudents
} from '../../../../Redux/Assistants/Actions/Project'


import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import Tooltip from '@material-ui/core/Tooltip'

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { PROJECT_MAIL } from '../../../../Utils/constant';
import DoneIcon from '@material-ui/icons/Done'
import ClearIcon from '@material-ui/icons/Clear'
import DeleteIcon from '@material-ui/icons/Delete'

import { CSVLink } from "react-csv"
import { base64encode } from '../../../../Utils'

const styles = theme => ({
  cssLabel: {
    fontSize: 15,
    '&$cssFocused': {
      color: '#68BB66'
    },
    fontWeight: 'normal'
  },
  cssFocused: {},
  cssUnderline: {
    '&:after': {
      borderBottomColor: '#68BB66'
    },
  },
  sideIcon2: {
    position: 'absolute',
    top: 20,
    right: '10vw'
  },
  options: {
    background: '#f5f5f5',
    width: '100%',
    zIndex: 20,
    top: 55,
    marginLeft: 58,
    paddingTop: 85,
    left: 0,
    position: 'fixed'
    // borderBottom: '1px solid rgba(0, 0, 0, 0.34)'
  },
  tooltip: {
    fontSize: 15
  },
  dialog: {
    minWidth: '1068px',
    maxWidth: '1068px',
    minHeight: '768px',
    maxHeight: '768px',
  },
  chip: {
    margin: '10px',
    fontSize: '15px',
  },
});

const rightMenuItem = (classes, value, label, onChange, menuItems) => {
  return (
    <FormControl style={{ width: '100px', margin: '0px 5px' }}>
      <InputLabel
        FormLabelClasses={{ root: classes.cssLabel, focused: classes.cssFocused }}
      >
        {label}
      </InputLabel>
      <Select
        input={ <Input classes={{ underline: classes.cssUnderline }} /> }
        value={ value }
        style={{ fontSize: '15px' }}
        onChange={ onChange }
      > {
        menuItems.map( (menuItem, key) => 
          <MenuItem key={key} value={menuItem.value} style={{ fontSize: '20px' }} >{menuItem.label}</MenuItem>
        )
      }
      </Select>
    </FormControl>
  )
}

class index extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      openMail: false
    }
    this.fileRef = React.createRef()
    this.props.fetchXLSX({"data_type": "專題選課名單"})
  }

  csvDownload = () => {
    const { classes, Project } = this.props

 
    if (!Project.csvDone) {
      return <Tooltip 
        title={
          "專題CSV資料匯出"
        } 
        placement="top" 
        classes={{ tooltip: classes.tooltip }}
      >
        <IconButton 
        >
          <CloudDownloadIcon />
        </IconButton>
      </Tooltip>
    }
    return <CSVLink data={Project.csvArr} onClick={() => console.log(Project.csvArr)}>
      <Tooltip 
        title={
          "專題CSV資料匯出"
        } 
        placement="top" 
        classes={{ tooltip: classes.tooltip }}
      >
        <IconButton 
        >
          <CloudDownloadIcon />
        </IconButton>
      </Tooltip>
    </CSVLink>
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

  getMailAction(progress) {
    const { classes } = this.props;
    if (progress === "FAIL_CPE" || progress === "PENDING_CPE" || progress === "ACCEPTED") return null;
    return <Tooltip 
      title={
        progress === "WAITING_APPLY" ? "寄信提醒學生至dino申請" :
        progress === "PENDING_TEACHER" ? "寄信提醒教授審核" :
        progress === "WAITING_ADD_COURSE" ? "寄信提醒學生選課" : 
        progress === "PENDING_SCORE" ? "寄信提醒教授評分" : ''
      } 
      placement="top" 
      classes={{ tooltip: classes.tooltip }}
    >
      <IconButton 
        onClick={() => this.setState({ openMail: true })}
      >
        <MailIcon />
      </IconButton>
    </Tooltip>
  }

  getCPEAction(progress) {
    const { classes, Project } = this.props;
    if (progress === "FAIL_CPE") {
      return (
        <div style={{ display: 'inline' }}>
          <Tooltip 
            title={"CPE 通過"} 
            placement="top" 
            classes={{ tooltip: classes.tooltip }}
          >
            <IconButton 
              onClick={
                () => this.props.setCPEStatus( { people: Project.select.map( person => {
                  return {
                    semester: Project.year + "-" + Project.semester,
                    student_id: person.id,
                    new_cpe_status: "1"
                  }
                }), refresh: {
                  "year": Project.year,
                  "semester": Project.semester,
                  "first_second": Project.first_second
                } })
              }
            >
              <DoneIcon style={{ color: 'green' }}/>
            </IconButton>
          </Tooltip>
        </div>
      )
    } else if (progress === "PENDING_CPE") {
      return (
        <div style={{ display: 'inline' }}>
          <Tooltip 
            title={"CPE 通過"} 
            placement="top" 
            classes={{ tooltip: classes.tooltip }}
          >
            <IconButton 
              onClick={
                () => this.props.setCPEStatus( { people: Project.select.map( person => {
                  return {
                    semester: Project.year + "-" + Project.semester,
                    student_id: person.id,
                    new_cpe_status: "1"
                  }
                }), refresh: {
                  "year": Project.year,
                  "semester": Project.semester,
                  "first_second": Project.first_second
                } })
              }
            >
              <DoneIcon style={{ color: 'green' }}/>
            </IconButton>
          </Tooltip>
          <Tooltip 
            title={ "CPE 不通過" } 
            placement="top" 
            classes={{ tooltip: classes.tooltip }}
          >
            <IconButton 
              onClick={
                () => this.props.setCPEStatus( { people: Project.select.map( person => {
                  return {
                    semester: Project.year + "-" + Project.semester,
                    student_id: person.id,
                    new_cpe_status: "2"
                  }
                }), refresh: {
                  "year": Project.year,
                  "semester": Project.semester,
                  "first_second": Project.first_second
                } })
              }
            >
              <ClearIcon style={{ color: 'red' }}/>
            </IconButton>
          </Tooltip>
        </div>
      )
    } else ;
  }

  showMailModel() {
    const { classes, Project } = this.props;
    if (Project.select.length === 0) return null
    let people = [], mailType, mailTitle;
    if (Project.select[0].progress === "PENDING_TEACHER") {
      people = Project.select.map( person => {
        return {
          id: person.professor_id,
          name: person.professor_name
        }}).filter((v,i,a)=>a.findIndex(t=>(t.id === v.id))===i)
      mailType = 2
      mailTitle = "提醒教授審核專題通知"
    } else if (Project.select[0].progress === "WAITING_ADD_COURSE") {
      mailType = Project.first_second === "1" ? 0 : 4
      people = Project.select
      mailTitle = "提醒同學選課通知"
    } else if (Project.select[0].progress === "PENDING_SCORE") {
      mailType = Project.first_second === "1" ? 3 : 5
      people = Project.select.map( person => {
        return {
          id: person.professor_id,
          name: person.professor_name
        }}).filter((v,i,a)=>a.findIndex(t=>(t.id === v.id))===i)
        mailTitle = "提醒教授評分通知"
    } else return null
    return (
      <Dialog
        open={this.state.openMail}
        onClose={() => this.setState({openMail: false})}
        classes={{ paper: classes.dialog }}
      >
        <DialogTitle style={{ marginLeft: '300px' }}>
          <div style={{fontSize: '30px'}}>
            {mailTitle}
          </div>
        </DialogTitle>
        <DialogContent style={{ flex: 1 }} >
          收件者: <br />
          {
              people.map( (person, idx) => 
                <Chip label={person.id + person.name} className={classes.chip} key={idx}/>
              )
          }
        </DialogContent>
        <DialogContent style={{ flex: 1 }} >
        {<div>
          <p>[主旨]{PROJECT_MAIL[mailType].subject}</p>
          <p>[內文]</p>
          {PROJECT_MAIL[mailType].content}
        </div>}
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={
              () => { 
                this.setState({ openMail: false })
              }
            }
            style={{ color: 'grey', fontSize: '20px'}}
          >
            取消
          </Button>
          <Button onClick={ () => {
            this.props.sendWarningMail({
              mail: PROJECT_MAIL[mailType],
              people: people
            })
          }}
            style={{ color: 'blue', fontSize: '20px' }} 
          >
            確認
          </Button>
        </DialogActions>
      </Dialog>
    )
  }

  getWithDrawAction(progress) {
    const { classes, Project } = this.props;
    if (progress !== "WAITING_ADD_COURSE") return null;
    return <Tooltip 
      title={"退回申請單"} 
      placement="top" 
      classes={{ tooltip: classes.tooltip }}
    >
      <IconButton 
        onClick={
          () => {
            if (window.confirm("此操作無法返回, 將退選" + Project.select.length + "人並發送信件, 確定執行此動作?")) {
              this.props.withdrawStudents({
                people: Project.select.map( person => {
                return {
                  student_id: person.id,
                  research_title: person.research_title,
                  semester: Project.year + '-' +Project.semester,
                  first_second: Project.first_second,
                  type: person.type
                }
              }), refresh: {
                "year": Project.year,
                "semester": Project.semester,
                "first_second": Project.first_second
              } })
            }
          }
        }
      >
        <DeleteIcon />
      </IconButton>
    </Tooltip>
  }

  showLeftOptions() {
    const { Project, classes } = this.props;
    return (
      <div style={{ 
        position: 'absolute',
        left: 30,
        top: 20,
      }}>
        
        {
          Project.select.length === 0 && Project.progress === "ALL" ? 
          <Tooltip 
            title={
              "請先選擇一個目標"
            } 
            placement="top" 
            classes={{ tooltip: classes.tooltip }}
          >
            <IconButton><BlankBoxIcon/></IconButton>
          </Tooltip> : 
          Project.select.length === 0 ? 
          <Tooltip 
            title={
              "全選"
            } 
            placement="top" 
            classes={{ tooltip: classes.tooltip }}
          >
            <IconButton
              onClick={ () => 
                this.props.projectHandleChange({
                  select: Project.rawData.reduce(
                    (res_arr, teacher) => 
                      [ ...res_arr, ...[ ...teacher.accepted.projects, ...teacher.pending.projects ].reduce(
                        (pro_arr, project) => 
                          [ ...pro_arr, ...project.students.filter( student => student.progress === Project.progress ) ]
                      , []) ]
                  , [])
                })
              }
            ><BlankBoxIcon/></IconButton>
          </Tooltip> : 
          Project.select.length === Project.rawData.reduce( (sum, teacher) =>
            sum + [ ...teacher.accepted.projects, ...teacher.pending.projects ].reduce( (pro_sum, project) => 
              pro_sum + project.students.reduce( (stu_sum, student) => stu_sum + (student.progress === Project.select[0].progress), 0)
            , 0)
          , 0) ? 
            <Tooltip 
              title={
                "取消全選"
              } 
              placement="top" 
              classes={{ tooltip: classes.tooltip }}
            >
            <IconButton
              onClick={ () => 
                this.props.projectHandleChange({ select: [] })
              }
            >
              <CheckBoxIcon />
            </IconButton></Tooltip> :
            <Tooltip 
              title={
                "全選相同狀態"
              } 
              placement="top" 
              classes={{ tooltip: classes.tooltip }}
            >
            <IconButton
              onClick={ () => 
                this.props.projectHandleChange({
                  select: Project.rawData.reduce(
                    (res_arr, teacher) => 
                      [ ...res_arr, ...[ ...teacher.accepted.projects, ...teacher.pending.projects ].reduce(
                        (pro_arr, project) => 
                          [ ...pro_arr, ...project.students.filter( student => student.progress === Project.select[0].progress ) ]
                      , []) ]
                  , [])
                })
              }
            >
              <IndeterminateCheckBox />
            </IconButton>
            </Tooltip >
        }
        { Project.select.length !== 0 ? this.getMailAction( Project.select[0].progress) : ''}
        { Project.select.length !== 0 ? this.getCPEAction( Project.select[0].progress) : ''}
        { this.showMailModel() }
        { Project.select.length !== 0 ? this.getWithDrawAction( Project.select[0].progress) : ''}
      </div>
    )
 
  }

  handleFileChange = (e) => {
    const { Project } = this.props
    const file = e.target.files[0]
    base64encode(file)
      .then(encoded => {
        this.props.uploadXLSX({
          upload: {
            file_data: encoded.split('base64,')[1],
            data_type: "專題選課名單",
            semester: Project.year + '-' + Project.semester,
            first_second: Project.first_second
          },
          refresh: {
            year: Project.year,
            semester: Project.semester,
            first_second: Project.first_second
          }
        })
      })
      .catch(err => console.log(err))
    e.target.value = null
  }


  downloadXLSX = () => {
    const { Project } = this.props
    if (!Project.templateDone)
      return ;
    const linkSource = `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${Project.templateFile}`;
    const downloadLink = document.createElement("a");
    const fileName = "專題選課名單範例.xlsx";

    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  }

  showRightOptions() {
    const { classes, Project } = this.props;
    return (
      <div className={classes.sideIcon2}>
      {
        rightMenuItem(classes, Project.progress, '狀態', 
          (event) => {
            this.props.projectHandleChange({ progress: event.target.value, select: [] })
          },
          [
            {value: "ALL", label: "全部狀態"},
            {value: "WAITING_APPLY", label: "尚未至dino申請"},
            {value: "FAIL_CPE", label: "CPE 未通過"},
            {value: "PENDING_CPE", label: "CPE 待審核"},
            {value: "PENDING_TEACHER", label: "等待教授審核"},
            {value: "WAITING_ADD_COURSE", label: "等待學生選課"},
            {value: "PENDING_SCORE", label: "等待教授評分"},
            {value: "ACCEPTED", label: "已評分"}
          ]
        )
      }
      <Tooltip 
        title={
          "下載上傳選課名單範例"
        } 
        placement="top" 
        classes={{ tooltip: classes.tooltip }}
      >
        <IconButton 
          onClick = { () => this.downloadXLSX() } 
        >
          <CloudDownloadIcon />
        </IconButton>
      </Tooltip>
      <Tooltip 
        title={
          "上傳選課名單"
        } 
        placement="top" 
        classes={{ tooltip: classes.tooltip }}
      >
        <IconButton 
          onClick={ () => this.fileRef.current.click() }
        >
          <input
            style={{ display: 'none' }}
            ref={this.fileRef}
            type='file'
            accept='.xlsx'
            id='fileInput'
            onChange={this.handleFileChange}
          />
          <CloudUploadIcon />
        </IconButton>
      </Tooltip>
      {
        rightMenuItem(classes, Project.year, '學年', 
          (event) => {
            this.props.projectHandleChange({ 
              year: event.target.value 
            })
            this.props.fetchData({
              year: event.target.value,
              semester: Project.semester,
              first_second: Project.first_second
            })
            this.props.fetchCsv({
              semester: event.target.value + '-' + Project.semester,
              first_second: Project.first_second
            })
          },
          [{value: "107", label: "107"},
          {value: "108", label: "108"},
          {value: "109", label: "109"}]
        )
      }
      {
        rightMenuItem(classes, Project.semester, '學期', 
          (event) => {
            this.props.projectHandleChange({ 
              semester: event.target.value 
            })
            this.props.fetchData({
              year: Project.year,
              semester: event.target.value,
              first_second: Project.first_second
            })
            this.props.fetchCsv({
              semester: Project.year + '-' + event.target.value,
              first_second: Project.first_second
            })
          },
          [{value: "1", label: "上學期"},
          {value: "2", label: "下學期"}],
        )
      }
      {
        rightMenuItem(classes, Project.first_second, '課程名稱', 
          (event) => {
            this.props.projectHandleChange({ 
              first_second: event.target.value 
            })
            this.props.fetchData({
              year: Project.year,
              semester: Project.semester,
              first_second: event.target.value
            })
            this.props.fetchCsv({
              semester: Project.year + '-' + Project.semester,
              first_second: event.target.value
            })
          },
          [{value: "1", label: "專題一"},
          {value: "2", label: "專題二"}],
        )
      }
      { this.csvDownload() }
    </div>
    )
  }


  render() {
    const { classes } = this.props;
    return (
      <div className={ classes.options }>
        {this.showLeftOptions()}
        {this.showRightOptions()}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  Project: state.Assistant.Project
})

const mapDispatchToProps = (dispatch) => ({
  projectHandleChange: (payload) => dispatch(projectHandleChange(payload)),
  fetchData: (payload) => dispatch(fetchData(payload)),
  sendWarningMail: (payload) => dispatch(sendWarningMail(payload)),
  setCPEStatus: (payload) => dispatch(setCPEStatus(payload)),
  fetchXLSX: (payload) => dispatch(fetchXLSX(payload)),
  fetchCsv: (payload) => dispatch(fetchCsv(payload)),
  uploadXLSX: (payload) => dispatch(uploadXLSX(payload)),
  withdrawStudents: (payload) => dispatch(withdrawStudents(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(index))