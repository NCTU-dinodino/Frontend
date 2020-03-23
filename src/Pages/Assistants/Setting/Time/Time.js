import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'

import { FormControl } from "react-bootstrap";
import moment from "moment";
import DateTimeRangeContainer from "react-advanced-datetimerange-picker";

import { getSemester } from '../../../../Utilities'

import { 
  timeHandleChange,
} from '../../../../Redux/Assistants/Actions/Setting/Time'

const styles = theme => ({
  container: {
    width: '90%',
    margin: '0 auto',
    marginBottom: '50px'
  },
  title: {
    fontSize: '30px',
    fontWeight: 'bold'
  }
})

class Time extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      type: null
    }
  }

  graduateApplyCallBack = (startDate, endDate) => {
    this.props.timeHandleChange({
      graduation: {
        start: startDate,
        end: endDate
      }
    })
  }
  projectApplyCallBack = (startDate, endDate) => {
    this.props.timeHandleChange({
      project: {
        start: startDate,
        end: endDate
      }
    })
  }
  verifyApplyCallBack = (startDate, endDate) => {
    this.props.timeHandleChange({
      verify: {
        start: startDate,
        end: endDate
      }
    })
  }

  renderVanillaPicker(local, type, applyCallback) {
    let {start, end} = this.props.Time[type]
    let value = 
      (start === null || end === null) ? 
      '尚未設定' : 
      `${start.format("YYYY-MM-DD HH:mm")} - ${end.format("YYYY-MM-DD HH:mm")}`;
    let disabled = true;
    return (
      <div>
        <DateTimeRangeContainer
          start={start ? start : moment()}
          end={end ? end : moment(start).add(2, "months").subtract(1, "minute")}
          local={local}
          applyCallback={applyCallback}
          ranges={{}}
          smartMode
        >
          <FormControl
            id="formControlsTextB"
            type="text"
            label="Text"
            placeholder="Enter text"
            style={{ cursor: "pointer" }}
            disabled={disabled}
            value={value}
          />
        </DateTimeRangeContainer>
        <br />
      </div>
    );
  }

  timeSelector = (title, type, applyCallback) => {
    let local = {
      format: "YYYY-MM-DD HH:mm",
      sundayFirst: false
    };
    return (
      <div>
        <div>{title}</div>
        {this.renderVanillaPicker(local, type, applyCallback)}
      </div>
    )
  }

  render () {
    const { classes } = this.props
    const SEMESTER_CN = ['', '上', '下']
    return (
      <div className={classes.container}>
        <div className={classes.title}>
          {getSemester().substr(0, 3) + SEMESTER_CN[getSemester().substr(4, 5)] + "學期"}
        </div>
        {this.timeSelector('畢業預審', 'graduation', this.graduateApplyCallBack)}
        {this.timeSelector('專題申請', 'project', this.projectApplyCallBack)}
        {this.timeSelector('抵免審核', 'verify', this.verifyApplyCallBack)}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  Time: state.Assistant.Setting.Time
})

const mapDispatchToProps = (dispatch) => ({
  timeHandleChange: (payload) => dispatch(timeHandleChange(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Time))