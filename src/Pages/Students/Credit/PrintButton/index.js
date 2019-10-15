
import React from 'react'
import ReactToPrint from 'react-to-print'
import { withStyles } from '@material-ui/core/styles'
import { Button, Menu, MenuItem } from '@material-ui/core'
import WaiveCourseForm from '../PrintForm/WaiveCourse'
import ExemptCourseForm from '../PrintForm/ExemptCourse'

const styles = theme => ({
  buttonWrapper: {
    display: 'inline',
    marginLeft: 5
  },
  button: {
    fontSize: 14
  }
})

class PrintMenu extends React.Component {
  onBeforePrint () {
    // 設定title(存檔預設檔名)
    const { studentIdcard, title } = this.props
    this.originalTitle = window.document.title
    window.document.title = `${studentIdcard.student_id}_${title}`

    // 設定橫向列印
    this.fileStyle = document.createElement('style')
    this.fileStyle.innerHTML = '@page{size: landscape;}'
    window.document.head.appendChild(this.fileStyle)
  }

  onAfterPrint () {
    // 恢復title
    window.document.title = this.originalTitle

    // 取消橫向列印
    window.document.head.removeChild(this.fileStyle)
  }

  render () {
    const { type, courses, title, studentIdcard } = this.props

    return (
      <React.Fragment>
        <ReactToPrint
          trigger={() => (
            <MenuItem disabled={courses.length === 0}>
              { title }
            </MenuItem>
          )}
          content={() => this.printRef}
          onBeforeGetContent={() => this.onBeforePrint()}
          onAfterPrint={() => this.onAfterPrint()}
        />
        <div style={{ display: 'none' }}>
          {
            (type === 0 && courses.length) &&
            <WaiveCourseForm
              ref={el => (this.printRef = el)}
              studentIdcard={studentIdcard}
              courses={courses.length && courses}
            />
          }
          {
            (type === 1 && courses.length) &&
            <ExemptCourseForm
              ref={el => (this.printRef = el)}
              studentIdcard={studentIdcard}
              courses={courses.length && courses}
            />
          }
        </div>
      </React.Fragment>
    )
  }
}

class Index extends React.Component {
  constructor (props) {
    super(props)
    this.state = { anchorElement: null }
  }

  render () {
    const { waiveCourse, exemptCourse, studentIdcard, classes } = this.props
    const { anchorElement } = this.state

    return (
      <div className={classes.buttonWrapper}>
        <Button
          className={classes.button}
          variant='contained'
          color='primary'
          aria-owns={anchorElement ? 'print-menu' : undefined}
          aria-haspopup='true'
          onClick={(e) => this.setState({ anchorElement: e.currentTarget })}
        >
          列印申請表
        </Button>
        <Menu
          anchorEl={anchorElement}
          open={Boolean(anchorElement)}
          onClose={() => this.setState({ anchorElement: null })}
        >
          <PrintMenu
            type={0}
            courses={waiveCourse}
            title='抵免學分申請表'
            studentIdcard={studentIdcard}
          />
          <PrintMenu
            type={1}
            courses={exemptCourse}
            title='課程免修申請表'
            studentIdcard={studentIdcard}
          />
        </Menu>
      </div>
    )
  }
}

export default withStyles(styles)(Index)
