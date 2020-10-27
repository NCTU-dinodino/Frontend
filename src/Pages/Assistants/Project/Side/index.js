import React from 'react'
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { connect } from 'react-redux'

import ToolButton from './ToolButton'
import ApplyIcon from '@material-ui/icons/Assignment'
import WaitIcon from '@material-ui/icons/AccessTime'
import AlarmIcon from '@material-ui/icons/Alarm'
import OKIcon from '@material-ui/icons/Done'
import TrashIcon from '@material-ui/icons/Delete'
import CreateIcon from '@material-ui/icons/Create'

const styles = theme => ({
  side: {
    position: 'fixed',
    top: 110,
    left: 5,
    width: 50
  },
  sideIconBottom:{
    position: 'fixed',
    bottom: 50,
    left: 5,
    width: 50,
  },
})

const theme = createMuiTheme({
  palette: {
    primary: {
      main: 'rgb(104, 187, 102)'
    }
  }
})

class index extends React.Component {

  render() {
    const { classes } = this.props;
    return (
      <MuiThemeProvider theme={theme}>
        <div className={ classes.side }>
          <ToolButton index={1} title={'CPE審核'} icon={<ApplyIcon />} />
          <ToolButton index={2} title={'教授審核'} icon={<WaitIcon />}/>
          <ToolButton index={3} title={'等待選課'} icon={<AlarmIcon />}/>
          <ToolButton index={4} title={'等待評分'} icon={<CreateIcon />}/>
          <ToolButton index={5} title={'已評分'} icon={<OKIcon />}/>
          <ToolButton index={0} title={'CPE未通過'} icon={<TrashIcon />} style={classes.sideIconBottom}/>
        </div>
      </MuiThemeProvider>
    )
  }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(index))