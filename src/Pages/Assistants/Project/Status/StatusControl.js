import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'

import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'

import Divider from '@material-ui/core/Divider';

import {
  fetchStatus,
  statusHandleChange,
  fetchCsv
} from '../../../../Redux/Assistants/Actions/Project/Status'

import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import Button from '@material-ui/core/Button';
import { CSVLink } from "react-csv"
import { base64encode } from '../../../../Utilities'

import {
  fetchXLSX,
  uploadXLSX
} from '../../../../Redux/Assistants/Actions/Project/Status'

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
  }
})

class StatusControl extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        
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
          file_data: encoded.split('base64,')[1],
          data_type: "專題選課名單",
          semester: Status.year + '-' + Status.semester
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
        <div style={{margin: '0 auto', width: '90%'}}><h4>寄信提醒</h4></div>
        <div className={classes.containerBlock}>
          <Button
            variant="contained" 
            className={classes.button}
            style={{display: 'inline'}}
          >
            至選課系統選課
          </Button>
        </div>
        <div className={classes.containerBlock}>
          <Button
            variant="contained" 
            className={classes.button}
            style={{display: 'inline'}}
          >
            至dinodino申請
          </Button>
        </div>
        <div className={classes.containerBlock}　>
          <Button
            variant="contained" 
            className={classes.button}
            style={{display: 'inline'}}
          >
            至dinodino評分
          </Button>
        </div>
        <Divider style={{marginTop: '20px'}}/>
        <div style={{margin: '0 auto', width: '90%'}}><h4>資料匯出</h4></div>
        <div className={classes.containerBlock}>
        { this.csvDownload() }
        </div>
        <Divider style={{marginTop: '20px'}}/>
        <div style={{margin: '0 auto', width: '90%'}}><h4>專題退選</h4></div>
        <div className={classes.containerBlock}　>
          <Button
            variant="contained" 
            className={classes.button}
            style={{display: 'inline'}}
          >
            退選未選課專題生
          </Button>
        </div>
        <div className={classes.containerBlock}　style={{height: '50px'}}>
        </div>
      </div>}
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
  upload_xlsx: (payload) => dispatch(uploadXLSX(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(StatusControl))
