import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'

import WebNet from './WebNet'
import OtherProgram from './OtherProgram'

const styles = theme => ({

})

class Compulsory extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    const { student } = this.props
    return (
      (parseInt(student.net_media) === 0 || parseInt(student.net_media) === 1) ? <WebNet student={student} /> : <OtherProgram student={student} />
    )
  }
}

const mapStateToProps = state => ({
  Status: state.Assistant.Graduation.Status,
})

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Compulsory))