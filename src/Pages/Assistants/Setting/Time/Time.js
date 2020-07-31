import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import TextField from '@material-ui/core/TextField';

import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';

import { 
  timeHandleChange,
  fetchTime
} from '../../../../Redux/Assistants/Actions/Setting/Time'

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const styles = theme => ({
  container: {
    width: '90%',
    margin: '0 auto',
    marginBottom: '50px'
  },
  title: {
    margin: '20px',
    fontSize: '30px',
  },
  textField: {
    margin: '20px',
    flex: 0.4,
  },
  btwSign: {
    margin: '20px',
    fontSize: '30px',
  },
  button: {
    margin: '10px',
    fontSize: '30px'
  }
})

class Time extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      displayType: null,
      type: null,
      open: false,
      timeRange: {
        begin: null,
        end: null
      }
    }
    props.fetchTime();
  }

  handleClickOpen = (displayType, type, timeRange) => {
    this.setState({ open: true, displayType, type, timeRange });
  };

  handleCancel = () => {
    this.setState({ open: false });
  };

  handleAgree = () => {
    this.props.timeHandleChange({[this.state.type]: this.state.timeRange})
    this.setState({ open: false });
  }

  timeSetting = (classes, displayType, type, timeRange) => {
    return (
      <div style={{display: "flex"}}>
        <div className={classes.title}>
          {displayType}
        </div>
        <TextField
          type="datetime-local"
          value={timeRange.begin}
          className={classes.textField}
          InputProps={{ readOnly: true }}
        />
        <div className={classes.btwSign}>~</div>
        <TextField
          type="datetime-local"
          value={timeRange.end}
          className={classes.textField}
          InputProps={{ readOnly: true }}
        />
        <IconButton className={classes.button} onClick={ () => this.handleClickOpen(displayType, type, timeRange) }>
          <Icon>edit_icon</Icon>
        </IconButton>
      </div>
    )
  }

  render () {
    const { classes } = this.props
    return (
      <div className={classes.container}>
        <div style={{"width": '100%', "height": '50px'}} />
        {this.timeSetting(classes, "專題申請", "project", this.props.Time.project)}
        {this.timeSetting(classes, "畢業預審", "graduation", this.props.Time.graduation)}
        {this.timeSetting(classes, "課程抵免", "verify", this.props.Time.verify)}

        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
        >
          <DialogTitle>
            <div style={{fontSize: '30px'}}>
              {this.state.displayType}
            </div>
          </DialogTitle>
          <DialogContent>
            <span style={{fontSize: '18px'}}>開始</span>
            <TextField
              type="datetime-local"
              value={this.state.timeRange.begin}
              className={classes.textField}
              onChange={ (e) => 
                this.setState({
                  timeRange: {
                    ...this.state.timeRange,
                    begin: e.target.value
                  }
                })
              }
            />
            <br />
            <span style={{fontSize: '18px'}}>結束</span>
            <TextField
              type="datetime-local"
              value={this.state.timeRange.end}
              className={classes.textField}
              onChange={ (e) => 
                this.setState({
                  timeRange: {
                    ...this.state.timeRange,
                    end: e.target.value
                  }
                })
              }
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCancel} 
              style={{ color: 'grey', fontSize: '20px'}}
            >
              取消
            </Button>
            <Button onClick={this.handleAgree}
              style={{ color: 'blue', fontSize: '20px'}} 
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
  Time: state.Assistant.Setting.Time
})

const mapDispatchToProps = (dispatch) => ({
  timeHandleChange: (payload) => dispatch(timeHandleChange(payload)),
  fetchTime: () => dispatch(fetchTime())
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Time))