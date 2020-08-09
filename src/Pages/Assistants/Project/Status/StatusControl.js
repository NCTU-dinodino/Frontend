import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'

import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'

import Chip from '@material-ui/core/Chip'
import Divider from '@material-ui/core/Divider';

import {
  fetchStatus,
  statusHandleChange,
  fetchCsv,
  fetchXLSX,
  uploadXLSX,
  getUnScoreList,
  getNotOnCosList,
  getNotInSystemList,
  sendWarningMail,
  withdrawStudents,
  getCPEStatus,
  setCPEStatus
} from '../../../../Redux/Assistants/Actions/Project/Status'

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import Button from '@material-ui/core/Button';
import { CSVLink } from "react-csv"
import { base64encode } from '../../../../Utils'

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import CircularProgress from '@material-ui/core/CircularProgress';

import red from '@material-ui/core/colors/red'

const styles = theme => ({
  containerBlock: {
    width: '80%',
    margin: '0 auto',
    marginTop: '10px'
  },
  container: {
    width: '100%',
    margin: '0 auto',
    marginTop: '10px'
  },
  warningText: {
    fontSize: '30px',
    flex: 1,
    textAlign: 'center',
    color: '#6f6f6f'
  },
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
  button: {
    width: '100%',
    fontSize: '16px'
  },
  chip: {
    margin: '3px',
    padding: '3px',
    fontSize: '15px',
  },
  dialog: {
    minWidth: '70vw',
    maxWidth: '70vw',
    minHeight: '60vh',
    maxHeight: '60vh',
  },
  drawerPaper: {
    position: 'relative',
    width: '300px',
    height: '60vh'
  },
  drawer: {
    position: 'fixed',
    overflow: 'hidden',
    zIndex: 1,
    flexGrow: 1,
    display: 'flex',
  },
  listItemText: {
    fontSize: '30px'
  }
})

class StatusControl extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      openMail: false,
      mailTitle: '',
      mailType: "",
      openWithdraw: false,
      openCPEStauts: false,
      cpeStatus: '',
      cpeTitle: ''
    }
    this.fileRef = React.createRef()
    this.props.fetch_xlsx({"data_type": "專題選課名單"})
  }

  fetchStatus = (payload) => {
    if (
      payload.year !== "" &&
      payload.semester !== "" &&
      payload.first_second !== ""
    ) {
      this.props.fetch_status(payload)
    }
  }

  fetchCsv = (payload) => {
    if (
      payload.year !== "" &&
      payload.semester !== "" &&
      payload.first_second !== ""
    ) {
      this.props.fetch_csv({semester: payload.year + '-' + payload.semester, first_second: payload.first_second})
    }
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
  
  handleFileChange = (e) => {
    const { Status } = this.props
    const file = e.target.files[0]
    base64encode(file)
      .then(encoded => {
        this.props.upload_xlsx({
          upload: {
            file_data: encoded.split('base64,')[1],
            data_type: "專題選課名單",
            semester: Status.year + '-' + Status.semester,
            first_second: Status.first_second
          },
          refresh: {
            year: Status.year,
            semester: Status.semester,
            first_second: Status.first_second
          }
        })
        // this.props.uploadHandleChange(encoded)
        // this.setState({ filename: file.name })
      })
      .catch(err => console.log(err))
  }

  downloadXLSX = () => {
    const { Status } = this.props
    if (!Status.templateDone)
      return ;
    const linkSource = `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${Status.templateFile}`;
    const downloadLink = document.createElement("a");
    const fileName = "專題選課名單範例.xlsx";

    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  }

  getWithdrawList = () => {
    const { Status } = this.props
    return Status.teachers.reduce( (teacher_students_flatten, teacher) => [ ...teacher_students_flatten, 
      ...teacher.accepted.projects.reduce( (project_students_flatten, project) => [ ...project_students_flatten,
        ...project.students
          .filter( student => student.add_status === "0" )
          .map( student => { 
            return { 
              student_id: student.id,
              research_title: project.title,
              semester: student.semester,
              first_second: student.first_second
            }
          })
      ], []),
      ...teacher.pending.projects.reduce( (project_students_flatten, project) => [ ...project_students_flatten,
        ...project.students
          .map( student => { 
            return { 
              student_id: student.id,
              research_title: project.title,
              semester: student.semester,
              first_second: student.first_second
            }
          })
      ], []),
    ], [])
  }

  render () {
    const { classes, Status } = this.props

    return (
      <div className={classes.container}>
        <div className={classes.containerBlock}>
          <FormControl style={{ width: '100%', marginTop: '5px' }} 
            error = {Status.year === ''}
          >
            <InputLabel
              FormLabelClasses={{
                root: classes.cssLabel,
                focused: classes.cssFocused,
              }}
            >
              學年
            </InputLabel>
            <Select
              input={
                <Input
                  classes={{
                    underline: classes.cssUnderline,
                  }}
                />
              }
              value={Status.year}
              style={{ fontSize: '15px' }}
              onChange={
                (event) => {
                  this.props.statusHandleChange({ 
                    year: event.target.value 
                  })
                  this.fetchStatus({
                    year: event.target.value,
                    semester: Status.semester,
                    first_second: Status.first_second
                  })
                  this.fetchCsv({
                    year: event.target.value,
                    semester: Status.semester,
                    first_second: Status.first_second
                  })
                }
              }
            >
              <MenuItem value={"106"} style={{ fontSize: '20px' }} >106</MenuItem>
              <MenuItem value={"107"} style={{ fontSize: '20px' }} >107</MenuItem>
              <MenuItem value={"108"} style={{ fontSize: '20px' }} >108</MenuItem>
              <MenuItem value={"109"} style={{ fontSize: '20px' }} >109</MenuItem>
            </Select>
          </FormControl>
          <FormControl style={{ width: '100%', marginTop: '5px' }}
            error = {Status.semester === '' && Status.year !== ''}
            disabled = {Status.year === ''}
          >
            <InputLabel
              FormLabelClasses={{
                root: classes.cssLabel,
                focused: classes.cssFocused,
              }}
            >
              學期
            </InputLabel>
            <Select
              input={
                <Input
                  classes={{
                    underline: classes.cssUnderline,
                  }}
                />
              }
              value={Status.semester}
              style={{ fontSize: '15px' }}
              onChange={
                (event) => {
                  this.props.statusHandleChange({ 
                    semester: event.target.value 
                  })
                  this.fetchStatus({
                    year: Status.year,
                    semester: event.target.value,
                    first_second: Status.first_second
                  })
                  this.fetchCsv({
                    year: Status.year,
                    semester: event.target.value,
                    first_second: Status.first_second
                  })
                }
              }
            >
              <MenuItem value={"1"} style={{ fontSize: '20px' }} >上學期</MenuItem>
              <MenuItem value={"2"} style={{ fontSize: '20px' }} >下學期</MenuItem>
            </Select>
          </FormControl>
          <FormControl style={{ width: '100%', marginTop: '5px' }}
          error = {Status.first_second === '' && Status.semester !== ''}
          disabled = {Status.semester === ''}
        >
          <InputLabel
            FormLabelClasses={{
              root: classes.cssLabel,
              focused: classes.cssFocused,
            }}
          >
            專題
          </InputLabel>
          <Select
            input={
              <Input
                classes={{
                  underline: classes.cssUnderline,
                }}
              />
            }
            value={Status.first_second}
            style={{ fontSize: '15px' }}
            onChange={
              (event) => {
                this.props.statusHandleChange({ 
                  first_second: event.target.value 
                })
                this.fetchStatus({
                  year: Status.year,
                  semester: Status.semester,
                  first_second: event.target.value
                })
                this.fetchCsv({
                  year: Status.year,
                  semester: Status.semester,
                  first_second: event.target.value
                })
              }
            }
          >
            <MenuItem value={"1"} style={{ fontSize: '20px' }} >專題一</MenuItem>
            <MenuItem value={"2"} style={{ fontSize: '20px' }} >專題二</MenuItem>
          </Select>
        </FormControl>
        </div>
        { Status.first_second !== '' && <div>
        <Divider style={{marginTop: '20px'}}/>

        <div className={classes.containerBlock}>
          <FormControl style={{ width: '100%', flex: 1 }} >
          <InputLabel
            FormLabelClasses={{
              root: classes.cssLabel,
              focused: classes.cssFocused,
            }}
          >
            搜尋
          </InputLabel>
          <Input
            classes={{
              underline: classes.cssUnderline,
            }}
            onChange={
              (event) => this.props.statusHandleChange({
                input: event.target.value[event.target.value.length - 1] === "\\" ? 
                  event.target.value.substr(0, event.target.value.length - 1) :
                  event.target.value
              })
            }
            value={Status.input}
          />
        </FormControl>
        </div>
        <Divider style={{marginTop: '20px'}}/>
        <div style={{margin: '0 auto', width: '90%'}}><h4>更新選課名單</h4></div>
        <div style={{display: 'flex'}} className={classes.containerBlock}>
          <form style={{flex: 0.45}} disabled={Status.first_second === ""}>
            <label style={{width: '100%'}}>
              <Button 
                variant="contained" 
                className = { classes.button } 
                onClick = { () => this.downloadXLSX() } 
                style = {{display: 'inline', width:'100%'}}
                disabled = { Status.first_second === "" }
              >
                下載範例
              </Button>
            </label>
          </form>
          <div style={{flex: 0.1}} />
          <form style={{flex: 0.45}} >
            <label htmlFor='fileInput' style={{width: '100%'}}>
              <Button
                variant="contained" 
                className={classes.button}
                onClick={ () => this.fileRef.current.click() }
                disabled={Status.first_second === ""}
                style={{display: 'inline', width: '100%'}}
              >
                上傳資料
              </Button>
              <input
                style={{ display: 'none' }}
                ref={this.fileRef}
                type='file'
                accept='.xlsx'
                id='fileInput'
                onChange={this.handleFileChange}
              />
            </label>
          </form>
        </div>
        <Divider style={{marginTop: '20px'}}/>
        <div className={classes.containerBlock}>
          <Button
            variant="contained" 
            className={classes.button}
            style={{display: 'inline'}}
            onClick={ () => {
              this.setState({
                openCPEStatus: true,
                cpeStatus: '0',
                cpeTitle: '未審核列表'
              })
            }}
          >
            審核CPE狀態
          </Button>
        </div>
        <Divider style={{marginTop: '20px'}}/>
        <div className={classes.containerBlock}>
          <Button
            variant="contained" 
            className={classes.button}
            style={{display: 'inline'}}
            onClick={ () => {
              this.props.getNotOnCosList({
                semester: Status.year + '-' + Status.semester,
                first_second: Status.first_second
              })
              this.setState({ openMail: true, mailTitle: '至選課系統選課寄信提醒', mainType: "1" })
            }}
          >
            寄信提醒
          </Button>
        </div>
        <Divider style={{marginTop: '20px'}}/>
        <div className={classes.containerBlock}>
        { this.csvDownload() }
        </div>
        <Divider style={{marginTop: '20px'}}/>
        <div className={classes.containerBlock}　>
          <Button
            variant="contained" 
            className={classes.button}
            style={{display: 'inline'}}
            onClick={ () => {
              this.props.getNotOnCosList({
                semester: Status.year + '-' + Status.semester,
                first_second: Status.first_second
              })
              this.setState({ openWithdraw: true })
            }}
          >
            退選未選課專題生
          </Button>
        </div>
        <div className={classes.containerBlock}　style={{height: '100px'}}>
        </div>
      </div>}
      <Dialog
          open={this.state.openCPEStatus}
          onClose={() => this.setState({openCPEStatus: false})}
          classes={{ paper: classes.dialog }}
          id='cpeStatusDialog'
        >
          <div className={classes.drawer}>
            <Drawer
              variant="permanent"
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                container: () => document.getElementById('cpeStatusDialog')
              }}
              anchor='left'
            >
              <List component="nav">
                <ListItem button
                  onClick={ () => {
                    this.props.getCPEStatus({
                      semester: Status.year + '-' + Status.semester,
                      cpe_status: '0'
                    })
                    this.setState({ cpeStatus: '0', cpeTitle: '未審核列表' })
                  }}
                >
                  <span style={{ fontSize: '18px' }}>未審核列表</span>
                </ListItem>
                <ListItem button
                  onClick={ () => {
                    this.props.getCPEStatus({
                      semester: Status.year + '-' + Status.semester,
                      cpe_status: '1'
                    })
                    this.setState({ cpeStatus: '1', cpeTitle: '已通過列表' })
                  }}
                >
                  <span style={{ fontSize: '18px' }}>已通過列表</span>
                </ListItem>
                <ListItem button
                  onClick={ () => {
                    this.props.getCPEStatus({
                      semester: Status.year + '-' + Status.semester,
                      cpe_status: '2'
                    })
                    this.setState({ cpeStatus: '2', cpeTitle: '未通過列表' })
                  }}
                >
                  <span style={{ fontSize: '18px' }}>未通過列表</span>
                </ListItem>
              </List>
            </Drawer>
          </div>
          <DialogTitle style={{ marginLeft: '300px' }}>
            <div style={{fontSize: '30px'}}>
              {this.state.cpeTitle}
            </div>
          </DialogTitle>
          <DialogContent style={{ marginLeft: '300px', flex: 1 }} >
          {
            Status.loadingModal ? 
              <div style = {{ display: 'flex', width: '100%', padding: '20px' }}>
                <div style={{ flex: 1 }}/>
                <CircularProgress style={{ color: '#68BB66' }} />
                <div style={{ flex: 1 }}/>
              </div> 
            :
              Status.people.map( (person, idx) => 
                <Chip label={person.id + person.name} className={classes.chip} key={idx}/>
              )
          }
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
          </DialogActions>
        </Dialog>
        <Dialog
          open={this.state.openMail}
          onClose={() => this.setState({openMail: false})}
          classes={{ paper: classes.dialog }}
          id='mailDialog'
        >
          <div className={classes.drawer}>
            <Drawer
              variant="permanent"
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                container: () => document.getElementById('mailDialog')
              }}
              anchor='left'
            >
              <List component="nav">
                <ListItem button
                  onClick={ () => {
                    this.props.getNotOnCosList({
                      semester: Status.year + '-' + Status.semester,
                      first_second: Status.first_second
                    })
                    this.setState({ openMail: true, mailTitle: '至選課系統選課寄信提醒', mainType: "1" })
                  }}
                >
                  <span style={{ fontSize: '18px' }}>至選課系統選課</span>
                </ListItem>
                <ListItem button
                  onClick={ () => {
                    this.props.getNotInSystemList({
                      semester: Status.year + '-' + Status.semester,
                      first_second: Status.first_second
                    })
                    this.setState({ openMail: true, mailTitle: '至dinodino申請專題寄信提醒', mailType: "0" })
                  }}
                >
                  <span style={{ fontSize: '18px' }}>至dinodino申請專題</span>
                </ListItem>
                <ListItem button
                  onClick={ () => {
                    this.props.getUnScoreList()
                    this.setState({ openMail: true, mailTitle: '至dinodino評分專題寄信提醒', mailType: "2" })
                  }}
                >
                  <span style={{ fontSize: '18px' }}>至dinodino評分專題</span>
                </ListItem>
              </List>
            </Drawer>
          </div>
          <DialogTitle style={{ marginLeft: '300px' }}>
            <div style={{fontSize: '30px'}}>
              {this.state.mailTitle}
            </div>
          </DialogTitle>
          <DialogContent style={{ marginLeft: '300px', flex: 1 }} >
            收件者: <br />
            {
              Status.loadingModal ? 
                <div style = {{ display: 'flex', width: '100%', padding: '20px' }}>
                  <div style={{ flex: 1 }}/>
                  <CircularProgress style={{ color: '#68BB66' }} />
                  <div style={{ flex: 1 }}/>
                </div> 
              :
                Status.people.map( (person, idx) => 
                  <Chip label={person.id + person.name} className={classes.chip} key={idx}/>
                )
            }
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
            <Button onClick={ 
              () => this.props.sendWarningMail({
                type: this.state.mailType,
                people: Status.people
              })
            }
              style={ Status.loadingModal ? 
                { color: 'grey', fontSize: '20px'}
                :
                { color: 'blue', fontSize: '20px'}
              } 
              disabled = { Status.loadingModal }
            >
              確認
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={this.state.openWithdraw}
          onClose={
            () => { 
              this.setState({ openWithdraw: false })
            }
          }
          classes={{ paper: classes.dialog }}
        >
          <DialogTitle>
            <div style={{fontSize: '30px', color: 'red'}}>
              退選專題
            </div>
          </DialogTitle>
          <DialogContent>
            退選學生: <br />
            {
              Status.loadingModal ? 
                <div style = {{ display: 'flex', width: '100%', padding: '20px' }}>
                  <div style={{ flex: 1 }}/>
                  <CircularProgress style={{ color: '#68BB66' }} />
                  <div style={{ flex: 1 }}/>
                </div> 
              :
                Status.people.map( (person, idx) => 
                  <Chip label={person.id + person.name} className={classes.chip} style={{ backgroundColor: red[100] }} key={idx}/>
                )
            }
          </DialogContent>
          <DialogActions>
            <Button 
              onClick={
                () => { 
                  this.setState({ openWithdraw: false })
                }
              }
              style={{ color: 'grey', fontSize: '20px'}}
            >
              取消
            </Button>
            <Button 
              onClick={ 
                () => {
                  const arr = this.getWithdrawList()
                  if (window.confirm("此操作無法返回, 將退選" + arr.length + "人並發送信件, 確定執行此動作?")) {
                    this.props.withdrawStudents({
                      people: arr,
                      refresh: {
                        year: Status.year,
                        semester: Status.semester,
                        first_second: Status.first_second
                      }
                    })
                    this.setState({ openWithdraw: false })
                  }
                }
              }
              style={ Status.loadingModal ? 
                { color: 'grey', fontSize: '20px'}
                :
                { color: 'blue', fontSize: '20px'}
              } 
              disabled = { Status.loadingModal }
            >
              確認
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  Status: state.Assistant.Project.Status,
})

const mapDispatchToProps = (dispatch) => ({
  statusHandleChange: (payload) => dispatch(statusHandleChange(payload)),
  fetch_status: (payload) => dispatch(fetchStatus(payload)),
  fetch_csv: (payload) => dispatch(fetchCsv(payload)),
  fetch_xlsx: (payload) => dispatch(fetchXLSX(payload)),
  upload_xlsx: (payload) => dispatch(uploadXLSX(payload)),
  getUnScoreList: () => dispatch(getUnScoreList()),
  getNotOnCosList: (payload) => dispatch(getNotOnCosList(payload)),
  getNotInSystemList: (payload) => dispatch(getNotInSystemList(payload)),
  sendWarningMail: (payload) => dispatch(sendWarningMail(payload)),
  withdrawStudents: (payload) => dispatch(withdrawStudents(payload)),
  getCPEStatus: (payload) => dispatch(getCPEStatus(payload)),
  setCPEStatus: (payload) => dispatch(setCPEStatus(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(StatusControl))
