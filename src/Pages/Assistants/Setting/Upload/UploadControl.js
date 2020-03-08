import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'

import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'

import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button'

import { base64encode } from '../../../../Utilities'

import {
  uploadHandleChange,
  fetchXLSX,
  fetchLogs,
  uploadXLSX
} from '../../../../Redux/Assistants/Actions/Setting/Upload'

import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'

const styles = theme => ({
  container: {
    width: '80%',
    margin: '0 auto',
    marginTop: '20px',
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
    marginTop: '30px'
  },
  text1: {
    fontSize: '18px',
    fontWeight: 'normal',
    display: 'inline'
  },  
  uploadButton: {
    margin: theme.spacing.unit
  },
})

class UploadControl extends React.Component {

  constructor(props) {
    super(props);
    this.props.fetch_logs()
    this.fileRef = React.createRef(),
    this.state = {
      filename: ''
    }
  }

  downloadXLSX = () => {
    const { Upload } = this.props
    if (!Upload.done)
      return ;
    const linkSource = `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${Upload.file}`;
    const downloadLink = document.createElement("a");
    const fileName = Upload.data_type + "範例.xlsx";

    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  }
  
  handleFileChange = (e) => {
    const { Upload } = this.props
    const file = e.target.files[0]
    base64encode(file)
      .then(encoded => {
        this.props.upload_xlsx({
          file_data: encoded.split('base64,')[1],
          data_type: Upload.data_type,
          semester: Upload.year + '-' + Upload.semester
        })
        // this.props.uploadHandleChange(encoded)
        // this.setState({ filename: file.name })
      })
      .catch(err => console.log(err))
  }

  render () {
    const { classes, Upload } = this.props

    return (
      <div className={classes.container}>

        <FormControl style={{ width: '100%', marginTop: '10px' }} 
          error = {Upload.year === ''}
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
            value={Upload.year}
            style={{ fontSize: '15px' }}
            onChange={
              (event) => {
                this.props.uploadHandleChange({ 
                  year: event.target.value 
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

        <FormControl style={{ width: '100%', marginTop: '10px' }}
          error = {Upload.semester === '' && Upload.year !== ''}
          disabled = {Upload.year === ''}
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
            value={Upload.semester}
            style={{ fontSize: '15px' }}
            onChange={
              (event) => {
                this.props.uploadHandleChange({ 
                  semester: event.target.value 
                })
              }
            }
          >
            <MenuItem value={"1"} style={{ fontSize: '20px' }} >上學期</MenuItem>
            <MenuItem value={"2"} style={{ fontSize: '20px' }} >下學期</MenuItem>
          </Select>
        </FormControl>
        
        <Divider style={{marginTop: '40px', marginBottom: '10px'}} />

        <FormControl style={{ width: '100%', marginTop: '10px' }}
          error = {Upload.semester !== '' && Upload.year !== '' && Upload.data_type === ''}
          disabled = {Upload.semester === ''}
        >
          <InputLabel
            FormLabelClasses={{
              root: classes.cssLabel,
              focused: classes.cssFocused,
            }}
          >
            上傳類別
          </InputLabel>
          <Select
            input={
              <Input
                classes={{
                  underline: classes.cssUnderline,
                }}
              />
            }
            value={Upload.data_type}
            style={{ fontSize: '15px' }}
            onChange={
              (event) => {
                this.props.uploadHandleChange({ 
                  data_type: event.target.value 
                }),
                this.props.fetch_xlsx({data_type: event.target.value})
              }
            }
          >
            <MenuItem value={"課程成績資料"} style={{ fontSize: '20px' }} >課程成績資料</MenuItem>
            <MenuItem value={"學生資料"} style={{ fontSize: '20px' }} >學生資料</MenuItem>
            <MenuItem value={"當期修課資料"} style={{ fontSize: '20px' }} >當期修課資料</MenuItem>
            <MenuItem value={"新老師資料"} style={{ fontSize: '20px' }} >新老師資料</MenuItem>
            <MenuItem value={"抵免資料"} style={{ fontSize: '20px' }} >抵免資料</MenuItem>
            <MenuItem value={"英文換修資料"} style={{ fontSize: '20px' }} >英文換修資料</MenuItem>
          </Select>
        </FormControl>

        <div style={{display: 'flex'}}>
          <div style={{flex: 0.3}} />
          <Button 
            variant="contained" 
            className = { classes.button } 
            onClick = { this.downloadXLSX } 
            style={{display: 'inline', width: '30%'}}
            disabled={Upload.data_type === ""}
          >
            下載模板
          </Button>
          <div style={{flex: 0.4}} />
          <form>
            <label htmlFor='fileInput'>
              <Button
                variant="contained" 
                className={classes.button}
                onClick={() => this.fileRef.current.click()}
                disabled={Upload.data_type === ""}
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
          <div style={{flex: 0.3}} />
        </div>
    	</div>
    )
  }
}

const mapStateToProps = (state) => ({
  Upload: state.Assistant.Setting.Upload,
})

const mapDispatchToProps = (dispatch) => ({
  uploadHandleChange: (payload) => dispatch(uploadHandleChange(payload)),
  fetch_xlsx: (payload) => dispatch(fetchXLSX(payload)),
  fetch_logs: () => dispatch(fetchLogs()),
  upload_xlsx: (payload) => dispatch(uploadXLSX(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(UploadControl))
