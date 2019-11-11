import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'

import Table from '@material-ui/core/Table';
import Tooltip from '@material-ui/core/Tooltip';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import {
  fetchCheck,
  updateGraduateStatus
} from '../../../../Redux/Assistants/Actions/Graduation/Check'

import CircularProgressbar from 'react-circular-progressbar'

const styles = theme => ({

  container: {
    width: '80%',
    margin: '0 auto',
    marginBottom: '50px'
  },
  dialog: {
    minWidth: '500px'
  },
  tooltip: {
    fontSize: '15px'
  }
  
})

const GRAD_STATUS_CN = ['未符合', '將符合', '已符合']

class Check extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      agreeOpen: false,
      rejectOpen: false,
      check: {}
    }
    this.props.fetchCheck()
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

  render() {
    const { classes } = this.props
    return (
      <div className={classes.container}>
        <Table>
          <TableHead>
            <TableRow style={{display: 'flex', justifyContent: 'center'}}>
              <TableCell style={{flex: 0.025, padding: '0px'}} >
                <IconButton style={{fontSize: '18px'}} disabled/>
              </TableCell>
              <TableCell style={{flex: 0.025, padding: '0px'}} >
                <IconButton style={{fontSize: '18px'}} disabled/>
              </TableCell>
              <TableCell style={{fontSize: '25px', flex: 0.19, paddingTop: '11px', paddingLeft: '20px'}}>學號</TableCell>
              <TableCell style={{fontSize: '25px', flex: 0.19, paddingTop: '11px', paddingLeft: '0px'}}>姓名</TableCell>
              <TableCell style={{fontSize: '25px', flex: 0.19, paddingTop: '11px', paddingLeft: '0px'}}>年級</TableCell>
              <TableCell style={{fontSize: '25px', flex: 0.19, paddingTop: '11px', paddingLeft: '0px'}}>總學分</TableCell>
              <TableCell style={{fontSize: '25px', flex: 0.19, paddingTop: '11px', paddingLeft: '0px'}}>狀態</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {
            this.props.Check.checks.map( (check, idx) => (
              <TableRow hover style={{ display: 'flex', justifyContent: 'center'}} key={idx} > 
                <TableCell style={{flex: 0.025, padding: '0px'}}>
                  <Tooltip
                    title={'同意'} 
                    placement='top'
                    classes={{
                      tooltip: classes.tooltip
                    }}
                  >
                    <IconButton style={{color: 'green', fontSize: '18px'}}
                      onClick = { () =>
                        this.setState({ 
                          agreeOpen: true,
                          check
                        })
                      }
                    >
                      <DoneIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
                <TableCell style={{flex: 0.025, padding: '0px'}}>
                  <Tooltip
                    title={'退回'} 
                    placement='top'
                    classes={{
                      tooltip: classes.tooltip
                    }}
                  >
                    <IconButton style={{color: 'red', fontSize: '18px'}}
                      onClick = { () => 
                        this.setState({
                          rejectOpen: true,
                          check
                        })
                      }
                    >
                      <ClearIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
                <TableCell style={{fontSize: '18px', flex: 0.19, paddingTop: '11px', paddingLeft: '20px'}}>{this.hightlight(check.sname, this.props.Check.input)}</TableCell>
                <TableCell style={{fontSize: '18px', flex: 0.19, paddingTop: '11px', paddingLeft: '10px'}}>{this.hightlight(check.student_id, this.props.Check.input)}</TableCell>
                <TableCell style={{fontSize: '18px', flex: 0.19, paddingTop: '11px', paddingLeft: '10px'}}>{this.hightlight(check.grade, this.props.Check.input)}</TableCell>
                <TableCell style={{fontSize: '18px', flex: 0.19, paddingTop: '3px', paddingLeft: '30px'}}>
                  <CircularProgressbar
                    percentage={100 * check.total_credit / 128}
                    text={check.total_credit ? check.total_credit.toString() : 'error'}
                    initialAnimation
                    styles={{
                      root: { maxWidth: '40px' },
                      path: { stroke: '#34855e' },
                      text: { fill: '#34855e', fontSize: '30px', fontWeight: 'bold' }
                    }}
                  />
                </TableCell>
                <TableCell style={{fontSize: '18px', flex: 0.19, paddingTop: '11px', paddingLeft: '0px'}}>{this.hightlight(GRAD_STATUS_CN[check.graduate_status], this.props.Check.input)}</TableCell>

              </TableRow>
            ))
          }
          </TableBody>
        </Table>

        <Dialog
          open={this.state.agreeOpen}
          onClose={ () => this.setState({ agreeOpen: false})}
          className={this.props.classes.dialog}
          fullWidth
        >
          <DialogTitle>
            <div style={{fontSize: '30px', fontWeight: 'bold'}}>畢業預審同意確認</div>
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              <div style={{fontSize: '20px', margin: '10px', color: 'black'}}>
                {"姓名: " + this.state.check.sname}
              </div>
              <div style={{fontSize: '20px', margin: '10px', color: 'black'}}>
                {"學號: " + this.state.check.student_id}
              </div>
              <div style={{fontSize: '20px', margin: '10px', color: 'black'}}>
                {"畢業學分: " + this.state.check.total_credit}
              </div>
              <div style={{fontSize: '20px', margin: '10px', color: 'black'}}>
                {"畢業狀態: " + GRAD_STATUS_CN[this.state.check.graduate_status]}
              </div>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button 
              onClick={() => 
                this.setState({ agreeOpen: false})
              }
              style={{ color: 'grey', fontSize: '20px'}} 
            >
              取消
            </Button>
            <Button 
              onClick={() => {
                this.setState({ agreeOpen: false})
                this.props.updateGraduateStatus({ student_id: this.state.check.student_id, graduate_submit: 2 })
              }} 
              style={{ color: 'blue', fontSize: '20px'}} 
            >
              確定同意
            </Button>
          </DialogActions>
        </Dialog>


        <Dialog
          open={this.state.rejectOpen}
          onClose={ () => this.setState({ rejectOpen: false})}
          className={this.props.classes.dialog}
          fullWidth
        >
          <DialogTitle>
            <div style={{fontSize: '30px', fontWeight: 'bold'}}>畢業預審退回確認</div>
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              <div style={{fontSize: '20px', margin: '10px', color: 'black'}}>
                {"姓名: " + this.state.check.sname}
              </div>
              <div style={{fontSize: '20px', margin: '10px', color: 'black'}}>
                {"學號: " + this.state.check.student_id}
              </div>
              <div style={{fontSize: '20px', margin: '10px', color: 'black'}}>
                {"畢業學分: " + this.state.check.total_credit}
              </div>
              <div style={{fontSize: '20px', margin: '10px', color: 'black'}}>
                {"畢業狀態: " + GRAD_STATUS_CN[this.state.check.graduate_status]}
              </div>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button 
              onClick={() => 
                this.setState({ rejectOpen: false})
              }
              style={{ color: 'grey', fontSize: '20px'}} 
            >
              取消
            </Button>
            <Button 
              onClick={() => {
                this.setState({ rejectOpen: false})
                this.props.updateGraduateStatus({ student_id: this.state.check.student_id, graduate_submit: 3 })
              }}
              style={{ color: 'red', fontSize: '20px'}} 
            >
              確定退回
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  Check: state.Assistant.Graduation.Check
})

const mapDispatchToProps = dispatch => ({
  fetchCheck: () => dispatch(fetchCheck()),
  updateGraduateStatus: (payload) => dispatch(updateGraduateStatus(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Check))