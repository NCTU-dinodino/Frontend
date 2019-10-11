
import React from 'react'
import { connect } from 'react-redux'
import ReactToPrint from 'react-to-print'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import {
  MenuItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core'
import PrintIcon from '@material-ui/icons/Print'
import PrintForm from '../../PrintForm'

const styles = theme => ({
  icon: {
    marginRight: 5
  },
  printForm: {
    padding: '10px',
    colorAdjust: 'exact',
    textSizeAdjust: '100%'
  }
})

class Index extends React.Component {
  onBeforePrint () {
    // 設定title(存檔預設檔名)
    const sid = this.props.studentIdcard.student_id
    this.originalTitle = window.document.title
    window.document.title = `${sid}_畢業預審表`
  }

  onAfterPrint () {
    // 恢復title
    window.document.title = this.originalTitle
  }

  render () {
    const { classes } = this.props

    return (
      <React.Fragment>
        <ReactToPrint
          trigger={() => (
            <MenuItem>
              <ListItemIcon className={classes.icon}>
                <PrintIcon />
              </ListItemIcon>
              <ListItemText inset primary='列印預審文件' />
            </MenuItem>
          )}
          content={() => this.printRef}
          onBeforeGetContent={() => this.onBeforePrint()}
          onAfterPrint={() => this.onAfterPrint()}
          bodyClass={classes.printForm}
        />
        <div style={{ display: 'none' }}>
          <PrintForm
            ref={el => (this.printRef = el)}
            profile={this.props.studentIdcard}
            reviewData={this.props.reviewData}
            reviewStatus={this.props.reviewStatus}
            generalCourseType={this.props.generalCourseType}
            idCard={this.props.idCard}
            forAssistant={this.props.forAssistant}
          />
        </div>
      </React.Fragment>
    )
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  studentIdcard: state.Student.User.studentIdcard,
  reviewData: state.Student.Graduation.detail.data,
  reviewStatus: state.Student.Graduation.getReview.status,
  generalCourseType: state.Student.Graduation.getReview.generalCourseType,
  idCard: state.Student.Graduation.assistant.idCard,
  forAssistant: state.Student.Graduation.assistant.using
})

const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Index))
