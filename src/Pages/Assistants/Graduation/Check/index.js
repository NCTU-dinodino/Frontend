import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'

import Drawer from '@material-ui/core/Drawer';

import Check from './Check';
import CheckControl from './CheckControl';

import {
  fetchCheck
} from '../../../../Redux/Assistants/Actions/Graduation/Check'

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
  }
})

class index extends React.Component {
  
  componentDidMount() {
    this.props.fetchCheck()
    this.setState({
      idx: setInterval(() => this.props.fetchCheck(), 10000)
    })
  }
  componentWillUnmount() {
    clearInterval(this.state.idx);
  }

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
            <CheckControl />    
          </Drawer>
        </div>
        <div style = {{ marginLeft: '30vh' }}>
            <Check />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({
  fetchCheck: () => dispatch(fetchCheck()),
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(index))