import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'

import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

import Upload from './Upload/Upload';
import UploadControl from './Upload/UploadControl';

import Time from './Time/Time';

// import { 
//   fetchCheck,
// } from '../../../Redux/Assistants/Actions/Project/Check'

// import {
//   fetchStatus,
// } from '../../../Redux/Assistants/Actions/Project/Status'


const styles = theme => ({
  root: {
    width: '100%',
  },
  drawer: {
    position: 'fixed',
    overflow: 'hidden',
    zIndex: 1,
    flexGrow: 1,
    display: 'flex',
    height: '100vh',
  },
  button: {
    fontSize: '20px',
  },
  drawerPaper: {
    position: 'relative',
    width: '30vh',
    background: '#EBEBEB',
    color: '#3B3B3B'
  },
  warningText: {
    fontSize: '30px',
    flex: 1,
    textAlign: 'center',
    color: '#6f6f6f'
  },

  cssLabel: {
    fontSize: 20,
    '&$cssFocused': {
      color: '#68BB66'
    },
    fontWeight: 'normal'
  },
  cssFocused: {},
  cssUnderline: {
    '&:after': {
      borderBottomColor: '#68BB66'
    },
  },
})

class index extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      type: 'UNCHOOSE',
    }
  }

  toolBarButton = (hightlight, type, label) => {
    return (
      <Button 
        className={this.props.classes.button}
        style = {{
          color: (hightlight ? '#68BB66' : '#6f6f6f')
        }}
        onClick = { () => {
          this.setState({
            type
          })
        }}
      >
        {label}
      </Button>
    )
  }

  render () {
    const { classes } = this.props;
    const { type } = this.state;

    return (
      <div className={classes.root}>
        <div className={classes.drawer}>
          <Drawer
            variant="permanent"
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            {this.toolBarButton(type === 'UPLOAD', 'UPLOAD', '上傳資料')}
            {this.toolBarButton(type === 'TIME', 'TIME', '時間設定')}
            <Divider />
            {
              type === 'UPLOAD' ? (
                <UploadControl />
              ) : ''
            }
          </Drawer>
        </div>
        <div style = {{ marginLeft: '30vh' }}>
        {
          type === 'UNCHOOSE' ? (
            <div style = {{ display: 'flex', width: '100%' }}>
              <div style = {{ flex: 0.1 }}/>
              <div className={classes.warningText}>
                請選取左方的選項
              </div>
              <div style = {{ flex: 0.1 }} />
            </div>
          ) : type === 'UPLOAD' ? (
            <Upload />
          ) : type === 'TIME' ? (
            <Time />
          ) : ''
        }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
    Upload: state.Assistant.Setting.Upload,
    Time: state.Assistant.Setting.Time
})

const mapDispatchToProps = (dispatch) => ({
//   fetch_status: (payload) => dispatch(fetchStatus(payload)),
//   fetch_check: (payload) => dispatch(fetchCheck(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(index))