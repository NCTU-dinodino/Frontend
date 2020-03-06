
import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import {
  MenuItem,
  ListItemIcon,
  ListItemText,
  Button,
  Dialog,
  DialogContent,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Select,
  withMobileDialog
} from '@material-ui/core'
import CheckIcon from '@material-ui/icons/CheckBox'
import CloseIcon from '@material-ui/icons/Close'
import PrintForm from '../../PrintForm'
import { reviewSubmit } from '../../../../../../Redux/Students/Actions/Graduation/'

const styles = theme => ({
  icon: {
    marginRight: 5
  },
  appBar: {
    position: 'relative',
    background: '#3db586',
    marginBottom: 15
  },
  header: {
    flex: 1,
    fontSize: 15
  },
  form: {
    marginTop: '30px',
    textAlign: 'center',
    fontSize: 20
  },
  label: {
    marginBottom: 0
  },
  select: {
    marginLeft: 10,
    fontSize: 20
  },
  button: {
    marginTop: 25,
    marginBottom: 10
  }
})

class Index extends React.Component {
  constructor (props) {
    super(props)
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = {
      open: false,
      generalCourseType: 0
    }
  }

  handleOpen () {
    this.setState({ open: true })
  }

  handleClose () {
    this.setState({ open: false })
  }

  handleChange (e) {
    this.setState({ generalCourseType: e.target.value })
  }

  handleSubmit () {
    if (window.confirm('確定送出預審嗎?')) {
      this.props.reviewSubmit({
        general_course_type: this.state.generalCourseType,
        professional_field: this.props.professionalField
      })
      this.handleClose()
    }
  }

  render () {
    const { classes } = this.props
    const sid = this.props.studentIdcard.student_id

    return (
      <div>
        <MenuItem onClick={this.handleOpen}>
          <ListItemIcon className={classes.icon}>
            <CheckIcon />
          </ListItemIcon>
          <ListItemText inset primary='送出預審' />
        </MenuItem>

        <Dialog
          fullScreen={this.props.fullScreen}
          maxWidth='md'
          open={this.state.open}
          onClose={this.handleClose}
        >
          <AppBar className={classes.appBar}>
            <Toolbar >
              <Typography variant='title' color='inherit' className={classes.header}>
                確認審查資料
              </Typography>
              <IconButton color='inherit' aria-label='Close' onClick={this.handleClose}>
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <DialogContent>
            <PrintForm
              profile={this.props.studentIdcard}
              courseDetail={this.props.courseDetail}
              reviewStatus={this.props.reviewStatus}
              generalCourseType={this.props.generalCourseType}
              professionalField={this.props.professionalField}
              idCard={this.props.idCard}
              forAssistant={this.props.forAssistant}
            />
            <form className={classes.form}>
              {
                // 學號05(或以前)開頭才有選擇
                sid.substr(0, 2) <= '05' &&
                <div>
                  <label className={classes.label}>請選擇採用的通識制度</label>
                  <Select
                    native
                    className={classes.select}
                    value={this.props.reviewStatus === 0 ? this.state.generalCourseType : this.props.generalCourseType}
                    onChange={this.handleChange}
                    disabled={this.props.reviewStatus !== 0}
                  >
                    <option value={0}>舊制</option>
                    <option value={1}>新制</option>
                  </Select>
                </div>
              }
              <Button
                className={classes.button}
                variant='contained'
                color='primary'
                onClick={this.handleSubmit}
                disabled={this.props.reviewStatus !== 0}
              >
                確認送出
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    )
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired,
  fullScreen: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => ({
  studentIdcard: state.Student.User.studentIdcard,
  courseDetail: state.Student.Graduation.detail.data,
  reviewStatus: state.Student.Graduation.getReview.status,
  generalCourseType: state.Student.Graduation.getReview.generalCourseType,
  professionalField: state.Student.Graduation.getReview.professionalField,
  idCard: state.Student.Graduation.assistant.idCard,
  forAssistant: state.Student.Graduation.assistant.using,
})

const mapDispatchToProps = (dispatch) => ({
  reviewSubmit: (payload) => dispatch(reviewSubmit(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(withMobileDialog()(withStyles(styles)(Index)))
