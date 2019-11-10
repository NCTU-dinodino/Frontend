import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'

import Drawer from '@material-ui/core/Drawer';

import Status from './Status';
import StatusControl from './StatusControl';

const styles = theme => ({
  root: {
    width: '100%'
  },
  drawer: {
    position: 'fixed',
    overflow: 'hidden',
    zIndex: 1,
    flexGrow: 1,
    display: 'flex',
    height: '100vh',
  },
  drawerPaper: {
    position: 'relative',
    width: '30vh',
    background: '#EBEBEB',
    color: '#3B3B3B'
  },
})

class index extends React.Component {

  render() {

    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.drawer}>
          <Drawer
            variant="permanent"
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <StatusControl />
          </Drawer>
        </div>
        <div style = {{ marginLeft: '30vh' }}>
          <Status /> 
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(index))