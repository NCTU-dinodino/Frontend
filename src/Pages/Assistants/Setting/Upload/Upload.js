import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';

import {
  deleteLog,
  deleteAllLogs
} from '../../../../Redux/Assistants/Actions/Setting/Upload'

const styles = theme => ({

  container: {
    width: '90%',
    margin: '0 auto',
    marginBottom: '50px'
  },
  dialog: {
    minWidth: '500px'
  },
  tooltip: {
    fontSize: '15px'
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
  warningText: {
    fontSize: '30px',
    flex: 1,
    textAlign: 'center',
    color: '#6f6f6f'
  },
})


class Upload extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      agreeOpen: false,
      rejectOpen: false,
      check: {}
    }
  }

  hightlight = (label, raw_input) => {
    if (!label)
      return ;
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

  filter = (checks) => {
    
  }

  warningText = (text, css) => {
    return (
      <div style = {{ display: 'flex', width: '100%' }}>
        <div style = {{ flex: 0.1 }}/>
        <div className={css}>
          {text}
        </div>
        <div style = {{ flex: 0.1 }} />
      </div>
    )
  }

  render() {
    const { classes, Upload } = this.props;
    const SEMESTER_CN = ['', '上學期', '下學期']
    const STATUS_CN = ['失敗', '成功', '處理中']

    return (
      Upload.year === '' ? (
        this.warningText("請選取學年", classes.warningText)
      ) : Upload.semester === '' ? (
        this.warningText("請選取學期", classes.warningText)
      ) : (
        <div className={classes.container}>
          <Table>
            <TableHead>
              <TableRow style={{display: 'flex', justifyContent: 'center'}}>
                <TableCell style={{flex: 0.025, padding: '0px'}}>
                  <Tooltip
                    title={'全部刪除'} 
                    placement='top'
                    classes={{
                      tooltip: classes.tooltip
                    }}
                  >
                    <IconButton style={{color: 'red', fontSize: '25px', paddingTop: '5px', paddingRight: '10px'}}
                      onClick = { () => this.props.delete_all_logs() }
                    >
                      <ClearIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
                <TableCell style={{fontSize: '25px', flex: 0.05, paddingTop: '11px', paddingLeft: '0px'}}>學年</TableCell>
                <TableCell style={{fontSize: '25px', flex: 0.05, paddingTop: '11px', paddingLeft: '0px'}}>學期</TableCell>
                <TableCell style={{fontSize: '25px', flex: 0.15, paddingTop: '11px', paddingLeft: '0px'}}>檔案類型</TableCell>
                <TableCell style={{fontSize: '25px', flex: 0.05, paddingTop: '11px', paddingLeft: '0px'}}>狀態</TableCell>
                <TableCell style={{fontSize: '25px', flex: 0.3, paddingTop: '11px', paddingLeft: '0px'}}>備註</TableCell>
                <TableCell style={{fontSize: '25px', flex: 0.2, paddingTop: '11px', paddingLeft: '0px'}}>上傳時間</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {
              Upload.logs
                .filter((log) => log.year === Upload.year && log.semester === Upload.semester)
                .map( (log, idx) => (
                  <TableRow hover style={{ display: 'flex', justifyContent: 'center'}} key={idx} >
                    <TableCell style={{flex: 0.025, padding: '0px'}}>
                      <Tooltip
                        title={'刪除'} 
                        placement='top'
                        classes={{
                          tooltip: classes.tooltip
                        }}
                      >
                        <IconButton style={{color: 'red', fontSize: '18px', paddingRight: '10px'}}
                          onClick = { () => this.props.delete_log({id: log.id}) }
                        >
                          <ClearIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>              
                    <TableCell style={{fontSize: '18px', flex: 0.05, paddingTop: '11px', paddingLeft: '0px'}}>{log.year}</TableCell>
                    <TableCell style={{fontSize: '18px', flex: 0.05, paddingTop: '11px', paddingLeft: '0px'}}>{SEMESTER_CN[log.semester]}</TableCell>
                    <TableCell style={{fontSize: '18px', flex: 0.15, paddingTop: '11px', paddingLeft: '0px'}}>{log.data_type}</TableCell>
                    <TableCell style={{fontSize: '18px', flex: 0.05, paddingTop: '11px', paddingLeft: '0px'}}>{STATUS_CN[log.status]}</TableCell>
                    <TableCell style={{fontSize: '18px', flex: 0.3, paddingTop: '11px', paddingLeft: '0px'}}>{log.message}</TableCell>
                    <TableCell style={{fontSize: '18px', flex: 0.2, paddingTop: '11px', paddingLeft: '0px'}}>{log.time}</TableCell>   
                  </TableRow>
                ))
            }
            </TableBody>
          </Table>
        </div>
      )
    )
  }
}

const mapStateToProps = state => ({
  Upload: state.Assistant.Setting.Upload
})

const mapDispatchToProps = dispatch => ({
  delete_all_logs: () => dispatch(deleteAllLogs()),
  delete_log: (payload) => dispatch(deleteLog(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Upload))