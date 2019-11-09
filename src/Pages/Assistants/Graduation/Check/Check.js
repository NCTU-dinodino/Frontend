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
  
})

class Check extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      agreeOpen: false,
      check: {}
    }
    this.props.fetchCheck()
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
              <TableCell style={{fontSize: '25px', flex: 0.2375, paddingTop: '11px', paddingLeft: '20px'}}>學號</TableCell>
              <TableCell style={{fontSize: '25px', flex: 0.2375, paddingTop: '11px', paddingLeft: '0px'}}>姓名</TableCell>
              <TableCell style={{fontSize: '25px', flex: 0.2375, paddingTop: '11px', paddingLeft: '0px'}}>總學分</TableCell>
              <TableCell style={{fontSize: '25px', flex: 0.2375, paddingTop: '11px', paddingLeft: '0px'}}>狀態</TableCell>
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
                <TableCell style={{flex: 0.025, padding: '0px'}}>{check.sname}</TableCell>
                <TableCell style={{flex: 0.025, padding: '0px'}}>{check.student_id}</TableCell>
                <TableCell style={{flex: 0.025, padding: '0px'}}>
                  <CircularProgressbar
                    percentage={100 * check.total_credit / 128}
                    text={check.total_credit ? check.total_credit.toString() : 'error'}
                    initialAnimation
                    styles={{
                      root: { maxWidth: '180px' },
                      path: { stroke: '#34855e' },
                      text: { fill: '#34855e', fontSize: '25px', fontWeight: 'bold' }
                    }}
                  />
                </TableCell>
                <TableCell style={{flex: 0.025, padding: '0px'}}>{check.graduate_status}</TableCell>

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
                {"畢業狀態: " + this.state.check.graduate_status}
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
                this.setState({ agreeOpen: false}),
                this.props.updateGraduateStatus({ student_id: check.student_id, graduate_submit: 3 })
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
                {"畢業狀態: " + this.state.check.graduate_status}
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
                this.setState({ rejectOpen: false}),
                this.props.updateGraduateStatus({ student_id: check.student_id, graduate_submit: 3 })
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