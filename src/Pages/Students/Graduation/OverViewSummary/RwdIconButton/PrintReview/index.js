
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
          bodyClass={classes.printForm}
        />
        <div style={{ display: 'none' }}>
          <PrintForm
            ref={el => (this.printRef = el)}
            profile={this.props.studentIdcard}
            idCard={this.props.idCard}
            assis={this.props.assis}
            reviewData={this.props.reviewData}
            reviewCheck={this.props.reviewCheck}
            generalCourseSelect={this.props.generalCourseSelect}
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
  idCard: state.Student.Graduation.assistant.idCard,
  assis: state.Student.Graduation.assistant.using,
  reviewCheck: state.Student.Graduation.getReview.check,
  generalCourseSelect: state.Student.Graduation.getReview.generalCourseSelect
})

const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Index))
