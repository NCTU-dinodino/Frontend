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
  uploadXLSX
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
    left: 'calc(100vw - 750px)'
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
    const { classes, Status } = this.props
    if (!Status.csvDone) {
      return <Button variant="contained" className={classes.button} >
        專題資料CSV匯出
      </Button>
    }
    return <CSVLink data={Status.csvArr} onClick={() => console.log(Status.csvArr)}>
      <Button variant="contained" className={classes.button} >
        專題資料CSV匯出
      </Button>
    </CSVLink>
  }

  getMailAction(level) {
    const { classes } = this.props;
    if (level === "0" || level === "1" || level === "5") return null;
    return <Tooltip 
      title={
        level === "2" ? "寄信提醒教授審核" :
        level === "3" ? "寄信提醒學生選課" : 
        level === "4" ? "寄信提醒教授評分" : ''
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

  getCPEAction(level) {
    const { classes, Project } = this.props;
    if (level === "0") {
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
    } else if (level === "1") {
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
    } else {
      return (
        <div style={{ display: 'inline' }}>
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
    }
  }

  showMailModel() {
    const { classes, Project } = this.props;
    if (Project.select.length === 0) return null
    let people = [], mailType;
    if (Project.select[0].level === "2") {
      people = Project.select.map( person => {
        return {
          id: person.professor_id,
          name: person.professor_name
        }}).filter((v,i,a)=>a.findIndex(t=>(t.id === v.id))===i)
      mailType = 2
    } else if (Project.select[0].level === "3") {
      mailType = Project.first_second === "1" ? 0 : 4
      people = Project.select
    } else if (Project.select[0].level === "4") {
      mailType = Project.first_second === "1" ? 3 : 5
      people = Project.select.map( person => {
        return {
          id: person.professor_id,
          name: person.professor_name
        }}).filter((v,i,a)=>a.findIndex(t=>(t.id === v.id))===i)
    } else return null
    return (
      <Dialog
        open={this.state.openMail}
        onClose={() => this.setState({openMail: false})}
        classes={{ paper: classes.dialog }}
      >
        <DialogTitle style={{ marginLeft: '300px' }}>
          <div style={{fontSize: '30px'}}>
            {"Hello"}
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

  showLeftOptions() {
    const { Project, classes } = this.props;
    return (
      <div style={{ 
        position: 'absolute',
        left: 30,
        top: 20,
      }}>
        
        {
          Project.select.length === 0 ? 
          <Tooltip 
            title={
              "請先選擇一個目標"
            } 
            placement="top" 
            classes={{ tooltip: classes.tooltip }}
          >
            <IconButton><BlankBoxIcon/></IconButton>
          </Tooltip> : 
          Project.select.length === Project.rawData.reduce( (sum, teacher) =>
            sum + [ ...teacher.accepted.projects, ...teacher.pending.projects ].reduce( (pro_sum, project) => 
              pro_sum + project.students.reduce( (stu_sum, student) => stu_sum + (student.level === Project.select[0].level), 0)
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
                          [ ...pro_arr, ...project.students.filter( student => student.level === Project.select[0].level ) ]
                      , []) ]
                  , [])
                })
              }
            >
              <IndeterminateCheckBox />
            </IconButton>
            </Tooltip >
        }
        { Project.select.length !== 0 ? this.getMailAction( Project.select[0].level) : ''}
        { Project.select.length !== 0 ? this.getCPEAction( Project.select[0].level) : ''}
        { this.showMailModel() }
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
              year: event.target.value,
              semester: Project.semester,
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
              year: Project.year,
              semester: event.target.value,
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
              year: Project.year,
              semester: Project.semester,
              first_second: event.target.value
            })
          },
          [{value: "1", label: "專題一"},
          {value: "2", label: "專題二"}],
        )
      }
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
  uploadXLSX: (payload) => dispatch(uploadXLSX(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(index))