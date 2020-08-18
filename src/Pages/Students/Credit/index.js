
import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import PrintButton from './PrintButton'
import WaiveCoursePanel from './Panel/waiveCoursePanel'
import ExemptCoursePanel from './Panel/exemptCoursePanel'
import CompulsoryCoursePanel from './Panel/compulsoryCoursePanel'
import EnglishCoursePanel from './Panel/englishCoursePanel'
import { actions, getCreditList } from '../../../Redux/Students/Actions/Credit'
import { FETCHING_STATUS } from '../../../Utils/constant'
import creditImg from '../../../Resources/credit_no_upload.png'
import { 
  Button
} from '@material-ui/core'

const styles = theme => ({
  img: {
    width: '100%',
    marginTop: '25px'
  },
  btn: {
    fontSize: '14px'
  },
  status0: {
    width: '10px',
    height: '10px',
    margin: '15px 7px 5px 7px',
    backgroundColor: '#f3864a',
    float: 'left'
  },
  status1: {
    width: '10px',
    height: '10px',
    margin: '15px 7px 5px 7px',
    backgroundColor: '#3aa276',
    float: 'left'
  },
  status2: {
    width: '10px',
    height: '10px',
    margin: '15px 7px 5px 7px',
    backgroundColor: '#d93a64',
    float: 'left'
  },
  status3: {
    width: '10px',
    height: '10px',
    margin: '15px 7px 5px 7px',
    backgroundColor: '#aaaaaa',
    float: 'left'
  },
  text: {
    color: '#7B7B7B',
    float: 'left',
    opacity: '0.8',
    fontFamily: 'Noto Sans CJK TC',
    marginTop: '10px'
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  }
})

class Index extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      filter: {
        type: -1, // 抵免種類
        status: -1 // 抵免狀態
      }
    }
    this.handleFilterChange = this.handleFilterChange.bind(this)
    this.checkFilter = this.checkFilter.bind(this)
  }

  componentDidMount () {
    this.props.getCreditList()
    this.props.resetCourse()
    this.props.setError(false)
    //window.alert('請注意，本學期抵免改由紙本申請')
  }

  componentDidUpdate (prevProps) {
    if (this.props.deleteStatus !== prevProps.deleteStatus &&
        this.props.deleteStatus === FETCHING_STATUS.DONE) {
      this.props.getCreditList()
    }
  }

  handleFilterChange (name, value) {
    this.setState({
      filter: {
        ...this.state.filter,
        [name]: value
      }
    })
  }

  checkFilter (type, status) {
    return (
      (this.state.filter.type === type || this.state.filter.type === -1) &&
      (this.state.filter.status === status || this.state.filter.status === -1)
    )
  }

  render () {
    const { classes, creditList, times } = this.props
    const waiveCourse = creditList.waive_course.filter((data) => this.checkFilter(0, data.status))
    const exemptCourse = creditList.exempt_course.filter((data) => this.checkFilter(1, data.status))
    const compulsoryCourse = creditList.compulsory_course.filter((data) => this.checkFilter(2, data.status))
    const englishCourse = creditList.english_course.filter((data) => this.checkFilter(3, data.status))
    const waiveCourseForPrint = creditList.waive_course.filter((data) => (data.status !== 3))
    const exemptCourseForPrint = creditList.exempt_course.filter((data) => (data.status !== 3))
    const emptyCredit = !waiveCourse.length && !exemptCourse.length && !compulsoryCourse.length && !englishCourse.length
    let begin = times["verify"].begin, end = times["verify"].end, today = new Date()
    let date = today.getFullYear() + '-'
            + ('0' + (today.getMonth()+1)).slice(-2) + '-'
            + ('0' + today.getDate()).slice(-2) + 'T'
            + ('0' + today.getHours()).slice(-2) + ':'
            + ('0' + today.getMinutes()).slice(-2)
    const inTime = ( date >= begin && date <= end ? true : false)
      
    return (
      <div className='container' style={{ marginBottom: '50px' }}>
        <div className='row'>
          {/* For PC screen */}
          <div className='col-md-12 hidden-xs' style={{ marginTop: '20px' }}>
            <div>
              <div className={classes.status0} />
              <div className={classes.text}>審核中</div>
              <div className={classes.status1} />
              <div className={classes.text}>審核通過</div>
              <div className={classes.status2} />
              <div className={classes.text}>審核不通過</div>
              <div className={classes.status3} />
              <div className={classes.text}>退件</div>
            </div>

            <div className='pull-right'>
              <FormControl className={classes.formControl}>
                <Select
                  value={this.state.filter.type}
                  onChange={(e) => this.handleFilterChange('type', e.target.value)}
                >
                  <MenuItem value={-1} style={{ height: '10px' }}>所有抵免種類</MenuItem>
                  <MenuItem value={0} style={{ height: '10px' }}>學分抵免</MenuItem>
                  <MenuItem value={1} style={{ height: '10px' }}>課程免修</MenuItem>
                  <MenuItem value={2} style={{ height: '10px' }}>本系必修課程抵免</MenuItem>
                  <MenuItem value={3} style={{ height: '10px' }}>英授專業課程抵免</MenuItem>
                </Select>
              </FormControl>
              <FormControl className={classes.formControl}>
                <Select
                  value={this.state.filter.status}
                  onChange={(e) => this.handleFilterChange('status', e.target.value)}
                >
                  <MenuItem value={-1} style={{ height: '10px' }}>所有狀態</MenuItem>
                  <MenuItem value={0} style={{ height: '10px' }}>審核中</MenuItem>
                  <MenuItem value={1} style={{ height: '10px' }}>審核通過</MenuItem>
                  <MenuItem value={2} style={{ height: '10px' }}>審核不通過</MenuItem>
                  <MenuItem value={3} style={{ height: '10px' }}>退件</MenuItem>
                </Select>
              </FormControl>
              {
              intime ? 
              <Link to='/students/credit/apply'>
                <Button
                  className={classes.btn}
                  variant='contained'
                  color='primary'
                  onClick={() => this.props.setError(false)}
                >
                  抵免申請
                </Button>
              </Link> :
              <Link to='/students/credit'>
                <Button
                  className={classes.btn}
                  variant='contained'
                  color='primary'
                  onClick={() => window.alert('現在非抵免申請時間!')}
              >
                  抵免申請
                </Button>
              </Link> 
              }
              <PrintButton
                studentIdcard={this.props.studentIdcard}
                waiveCourse={waiveCourseForPrint}
                exemptCourse={exemptCourseForPrint}
              />
            </div>
          </div>

          {/* For mobile & xs */}
          <div className='hidden-sm hidden-md hidden-lg' style={{ margin: '20px 20px 5px 20px' }}>
            <div style={{ width: '300px' }}>
              {
              <Link to='/students/credit/apply'>
                <Button
                  className={classes.btn}
                  variant='contained'
                  color='primary'
                  style={{ margin: 'auto', width: '40%' }}
                  onClick={() => this.props.setError(false)}
                >
                  抵免申請
                </Button>
              </Link>}
              <PrintButton
                studentIdcard={this.props.studentIdcard}
                waiveCourse={waiveCourseForPrint}
                exemptCourse={exemptCourseForPrint}
              />
            </div>

            <FormControl className={classes.formControl}>
              <Select
                value={this.state.filter.type}
                onChange={(e) => this.handleFilterChange('type', e.target.value)}
              >
                <MenuItem value={-1} style={{ height: '10px' }}>所有抵免種類</MenuItem>
                <MenuItem value={0} style={{ height: '10px' }}>學分抵免</MenuItem>
                <MenuItem value={1} style={{ height: '10px' }}>課程免修</MenuItem>
                <MenuItem value={2} style={{ height: '10px' }}>本系必修課程抵免</MenuItem>
                <MenuItem value={3} style={{ height: '10px' }}>英授專業課程抵免</MenuItem>
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <Select
                value={this.state.filter.status}
                onChange={(e) => this.handleFilterChange('status', e.target.value)}
              >
                <MenuItem value={-1} style={{ height: '10px' }}>所有狀態</MenuItem>
                <MenuItem value={0} style={{ height: '10px' }}>審核中</MenuItem>
                <MenuItem value={1} style={{ height: '10px' }}>審核通過</MenuItem>
                <MenuItem value={2} style={{ height: '10px' }}>審核不通過</MenuItem>
                <MenuItem value={3} style={{ height: '10px' }}>退件</MenuItem>
              </Select>
            </FormControl>
          </div>

          {/* For PC screen */}
          <div className='col-md-12 hidden-xs' style={{ marginTop: '20px' }}>
            {
              waiveCourse.map((data, index) => (
                <WaiveCoursePanel key={index} data={data} />
              ))
            }
            {
              exemptCourse.map((data, index) => (
                <ExemptCoursePanel key={index} data={data} />
              ))
            }
            {
              compulsoryCourse.map((data, index) => (
                <CompulsoryCoursePanel key={index} data={data} />
              ))
            }
            {
              englishCourse.map((data, index) => (
                <EnglishCoursePanel key={index} data={data} />
              ))
            }
            {
              emptyCredit &&
              <div
                className='col-md-4 col-md-offset-4 col-xs-8 col-xs-offset-2'
                style={{ marginTop: '50px' }}
              >
                <h2 className='text-center'>尚無任何抵免申請</h2>
                <img className={classes.img} src={creditImg} alt='' />
              </div>
            }
          </div>

          {/* For mobile & xs */}
          <div
            className='hidden-sm hidden-md hidden-lg'
            style={{
              marginTop: '15px',
              width: '100vw'
            }}>
            {
              waiveCourse.map((data, index) => (
                <WaiveCoursePanel key={index} data={data} mobile />
              ))
            }
            {
              exemptCourse.map((data, index) => (
                <ExemptCoursePanel key={index} data={data} mobile />
              ))
            }
            {
              compulsoryCourse.map((data, index) => (
                <CompulsoryCoursePanel key={index} data={data} mobile />
              ))
            }
            {
              englishCourse.map((data, index) => (
                <EnglishCoursePanel key={index} data={data} mobile />
              ))
            }
            {
              emptyCredit &&
              <div
                className='col-md-4 col-md-offset-4 col-xs-8 col-xs-offset-2'
                style={{ marginTop: '50px' }}
              >
                <h3 className='text-center'>尚無任何抵免申請</h3>
                <img className={classes.img} src={creditImg} alt='' />
              </div>
            }
          </div>
        </div>
      </div>
    )
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  studentIdcard: state.Student.User.studentIdcard,
  creditList: state.Student.Credit.list,
  deleteStatus: state.Student.Credit.delete.status,
  times: state.Student.User.times
})

const mapDispatchToProps = (dispatch) => ({
  getCreditList: () => dispatch(getCreditList()),
  resetCourse: () => dispatch(actions.credit.form.reset()),
  setError: (payload) => dispatch(actions.credit.form.setError(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Index))
