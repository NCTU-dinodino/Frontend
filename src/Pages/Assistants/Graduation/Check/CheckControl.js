import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'

import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import Chip from '@material-ui/core/Chip'
import blue from '@material-ui/core/colors/blue'

import Button from '@material-ui/core/Button'
import CloudDownloadIcon from '@material-ui/icons/CloudDownload'
import { CSVLink } from "react-csv"

import {
  checkHandleChange
} from '../../../../Redux/Assistants/Actions/Graduation/Check'

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
  chip: {
    margin: '10px',
    marginTop: '20px',
    marginBottom: '20px',
    fontSize: '20px',
    padding: '20px'
  },
  button: {
    width: '100%',
    marginTop: '30px'
  }
})

class CheckControl extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  toggleProgramFilter = (idx) => {
    this.props.checkHandleChange({
      program_filter: this.props.Check.program_filter.map( (v, i) => i === idx ? !v : v)
    })
  }

  csvDownload = () => {
    const { classes, Check } = this.props
    if (!Check.csvDone) {
      return <Button variant="contained" className={classes.button}>
        下載
      </Button>
    }
    return <CSVLink data={Check.csvArr} onClick = { () => console.log(Check.csvArr) }>
      <Button variant="contained" className={classes.button}>
        下載
      </Button>
    </CSVLink>
  }

  render() {
    const { classes, Check } = this.props

    return (
      <div className={classes.container}>
        <FormControl style={{ width: '100%', flex: 1 }}>
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
              (event) => this.props.checkHandleChange({
                input: event.target.value[event.target.value.length - 1] === "\\" ? 
                  event.target.value.substr(0, event.target.value.length - 1) :
                  event.target.value
              })
            }
            value={Check.input}
          />
        </FormControl>
        <br />
        <br />
        <br />
        <h3>班級</h3>
        <div><hr style = {{ margin: 3 }}/></div>
          <div style = {{ display: 'flex', marginTop: '10px' }}>
            <Chip
              label = {
                <span>
                  <div style = {{ display: 'inline', verticalAlign: 'middle' }} >A</div>
                </span>
              }
              className = { classes.chip }
              onClick = { () => this.toggleProgramFilter(0) }
              style = {{ background: Check.program_filter[0] ? blue[300] : null, flex: 1, marginTop: '3px', marginBottom: '3px' }}
            />
            <Chip
              label = {
                <span>
                  <div style = {{ display: 'inline', verticalAlign: 'middle' }} >B</div>
                </span>
              }
              className = { classes.chip }
              onClick = { () => this.toggleProgramFilter(1) }
              style = {{ background: Check.program_filter[1] ? blue[300] : null, flex: 1, marginTop: '3px', marginBottom: '3px' }}
            />
          </div>
          <div style = {{ display: 'flex', marginTop: '10px' }}>
            <Chip
              label = {
                <span>
                  <div style = {{ display: 'inline', verticalAlign: 'middle' }} >C</div>
                </span>
              }
              className = { classes.chip }
              onClick = { () => this.toggleProgramFilter(2) }
              style = {{ background: Check.program_filter[2] ? blue[300] : null, flex: 1, marginTop: '3px', marginBottom: '3px' }}
            />
            <Chip
              label = {
                <span>
                  <div style = {{ display: 'inline', verticalAlign: 'middle' }} >D</div>
                </span>
              }
              className = { classes.chip }
              onClick = { () => this.toggleProgramFilter(3) }
              style = {{ background: Check.program_filter[3] ? blue[300] : null, flex: 1, marginTop: '3px', marginBottom: '3px' }}
            />
          </div>
          {this.csvDownload()}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  Check: state.Assistant.Graduation.Check,

})

const mapDispatchToProps = dispatch => ({
  checkHandleChange: (payload) => dispatch(checkHandleChange(payload))

})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CheckControl))