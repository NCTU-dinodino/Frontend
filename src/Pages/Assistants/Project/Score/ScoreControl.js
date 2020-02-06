import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'

import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'

import { 
  scoreHandleChange,
  fetchScore,
  fetchCsv
} from '../../../../Redux/Assistants/Actions/Project/Score'

import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import Button from '@material-ui/core/Button';
import { CSVLink } from "react-csv"

const styles = theme => ({
  container: {
    width: '80%',
    margin: '0 auto',
    marginTop: '20px'
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
  }
})

class ScoreControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        
    }
  }

  fetchStatus = (payload) => {
    if (
      payload.year !== "" &&
      payload.semester !== "" &&
      payload.first_second !== ""
    ) {
      this.props.fetch_score({semester: payload.year + '-' + payload.semester, first_second: payload.first_second})
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
    const { classes, Score } = this.props
    console.log(Score.csvDone)
    if (!Score.csvDone) {
      return <Button variant="contained" className={classes.button} disabled={Score.first_second === ''}>
        下載
      </Button>
    }
    return <CSVLink data={Score.csvArr} onClick={() => console.log(Score.csvArr)}>
      <Button variant="contained" className={classes.button} disabled={Score.first_second === ''}>
        下載
      </Button>
    </CSVLink>
  }
  
  render () {
    const { classes, Score } = this.props

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
              (event) => this.props.scoreHandleChange({
                input: event.target.value[event.target.value.length - 1] === "\\" ? 
                  event.target.value.substr(0, event.target.value.length - 1) :
                  event.target.value
              })
            }
            value={Score.input}
          />
        </FormControl>

        <FormControl style={{ width: '100%', marginTop: '10px' }} 
          error = {Score.year === ''}
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
            value={Score.year}
            style={{ fontSize: '15px' }}
            onChange={
              (event) => {
                this.props.scoreHandleChange({ 
                  year: event.target.value 
                })
                this.fetchStatus({
                  year: event.target.value,
                  semester: Score.semester,
                  first_second: Score.first_second
                })
                this.fetchCsv({
                  year: event.target.value,
                  semester: Score.semester,
                  first_second: Score.first_second
                })
              }
            }
          >
            <MenuItem value={"106"} style={{ fontSize: '20px' }} >106</MenuItem>
            <MenuItem value={"107"} style={{ fontSize: '20px' }} >107</MenuItem>
            <MenuItem value={"108"} style={{ fontSize: '20px' }} >108</MenuItem>
          </Select>
        </FormControl>

        <FormControl style={{ width: '100%', marginTop: '10px' }}
          error = {Score.semester === '' && Score.year !== ''}
          disabled = {Score.year === ''}
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
            value={Score.semester}
            style={{ fontSize: '15px' }}
            onChange={
              (event) => {
                this.props.scoreHandleChange({ 
                  semester: event.target.value 
                })
                this.fetchStatus({
                  year: Score.year,
                  semester: event.target.value,
                  first_second: Score.first_second
                })
                this.fetchCsv({
                  year: Score.year,
                  semester: event.target.value,
                  first_second: Score.first_second
                })
              }
            }
          >
            <MenuItem value={"1"} style={{ fontSize: '20px' }} >上學期</MenuItem>
            <MenuItem value={"2"} style={{ fontSize: '20px' }} >下學期</MenuItem>
          </Select>
        </FormControl>

        <FormControl style={{ width: '100%', marginTop: '10px' }}
          error = {Score.first_second === '' && Score.semester !== ''}
          disabled = {Score.semester === ''}
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
            value={Score.first_second}
            style={{ fontSize: '15px' }}
            onChange={
              (event) => {
                this.props.scoreHandleChange({ 
                  first_second: event.target.value 
                })
                this.fetchStatus({
                  year: Score.year,
                  semester: Score.semester,
                  first_second: event.target.value
                })
                this.fetchCsv({
                  year: Score.year,
                  semester: Score.semester,
                  first_second: event.target.value
                })
              }
            }
          >
            <MenuItem value={"1"} style={{ fontSize: '20px' }} >專題一</MenuItem>
            <MenuItem value={"2"} style={{ fontSize: '20px' }} >專題二</MenuItem>
          </Select>
        </FormControl>
        { this.csvDownload() }
    	</div>
    )
  }
}

const mapStateToProps = (state) => ({
  Score: state.Assistant.Project.Score,
})

const mapDispatchToProps = (dispatch) => ({
  scoreHandleChange: (payload) => dispatch(scoreHandleChange(payload)),
  fetch_score: (payload) => dispatch(fetchScore(payload)),
  fetch_csv: (payload) => dispatch(fetchCsv(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ScoreControl))