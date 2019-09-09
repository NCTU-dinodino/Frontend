import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'


const styles = theme => ({

})

class Score extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        
    }
  }

  render () {

    return (
      <div>Score Hello</div>
    )
  }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Score))