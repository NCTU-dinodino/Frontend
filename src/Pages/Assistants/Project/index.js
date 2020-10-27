import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import Side from './Side'
import Option from './Option'
import Panel from './Panel'

import { 
  fetchData
} from '../../../Redux/Assistants/Actions/Project'

const styles = theme => ({
})

class index extends React.Component {

  componentDidMount() {
    const { Project } = this.props;

    this.props.fetchData({
      year: Project.year,
      semester: Project.semester,
      first_second: Project.first_second
    })
  }

  render() {
    return (
      <div>
        <Side />
        <Option />
        <Panel />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  Project: state.Assistant.Project
})

const mapDispatchToProps = (dispatch) => ({
  fetchData: (payload) => dispatch(fetchData(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(index))