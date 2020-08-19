import React from 'react'
import { connect } from 'react-redux'
import { ChangeTeacher } from '../../../Redux/Teachers/Actions/Research'

// for multiTheme
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import Dialog from '@material-ui/core/Dialog'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'


const styles = {
  buttonStyle: {
    fontSize: '16px',
    fontFamily: '微軟正黑體, sans-serif'
  },
  btnTitle: {
    fontSize: '20px',
    fontFamily: '微軟正黑體, sans-serif',
    padding: '18px 24px',
    fontWeight: '550'
  },
  replyBtn: {
    backgroundColor: '#337ab7',
    fontFamily: '微軟正黑體, sans-serif',
    '&:hover': {
      backgroundColor: '#2e72aa'
    }
  },

}

class ReplyDialogChange extends React.Component {
  constructor (props) {
    super(props)
    //this.handleClick = this.handleClick.bind(this)
    this.state = {open: false}
  }

  handleOpen = () => {
    this.setState({open: true})
  }

  handleClose = (status) => {
    console.log(status)
    // 如果按在視窗外面就跳出，什麼都不做
    if( status !== 1 && status !== 0 ) {
      this.setState({open: false})
      return
    }
    let students = this.props.participants.filter( p => (
      p.replace_pro === 1
    ))
    // 防呆確認
    const statusText = status === 0 ? '『拒絕』' : '『同意』'
    if( !window.confirm('確定回覆' + statusText + '?') ) return

    console.log(this.props.research_title)
    this.setState({open: false})
    students.map((p)=>{
      let payload = {
        student_id: p.student_id,
        semester: this.props.year,
        research_title: this.props.title,
        first_second: this.props.firstSecond,
        agree_replace: parseInt(status, 10) // DB input is integer
      }
      console.log('------- payload -------')
      console.log(payload)
      this.props.ChangeTeacher(payload)
    })

    // trigger update
    //this.props.parentFunction()
  }


  render () {
    const { classes } = this.props
    return (
      <div>
        <MuiThemeProvider>
          <div onClick={this.handleOpen}>
            <Button variant="contained" color='primary' className={classes.replyBtn}>回覆</Button>
            {/*<ReplyStatus status={this.props.status}/>*/}
          </div>
        </MuiThemeProvider>
        <MuiThemeProvider>
          {/*Dialog will be open only if ReplyStatus been clicked*/}
          <Dialog 
            open={this.state.open}
            onClose={this.handleClose}
          >
            <div className={classes.btnTitle}>回覆更換教授申請</div>
            <DialogContent className={classes.buttonStyle}>
              您是否同意
              {this.props.participants.filter(p => p.replace_pro===1).map((p,i,arr)=>(
                <span>{p.replace_pro?p.sname+' ':''}{(i+1)!==arr.length?'、':''}</span>
              ))}更換指導教授？  
              <br/>
              請選擇 『同意』 或 『拒絕』 此申請，此動作不可反悔。
            </DialogContent>
            <DialogActions>
            <Button className={classes.buttonStyle} onClick={() => this.handleClose(1)} color="primary">
              同意
            </Button>
            <Button className={classes.buttonStyle} onClick={() => this.handleClose(0)} color="primary">
              拒絕
            </Button>
          </DialogActions>
          </Dialog>
        </MuiThemeProvider>
      </div>
      
    )
  }
}

const mapState = (state) => ({
})

const mapDispatch = (dispatch) => ({
  ChangeTeacher: (payload) => dispatch(ChangeTeacher(payload))
})

export default connect(mapState, mapDispatch)(withStyles(styles)(ReplyDialogChange))
