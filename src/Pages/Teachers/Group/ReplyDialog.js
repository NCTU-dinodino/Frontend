import React from 'react'
import axios from 'axios'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
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
  warnTitle: {
    fontSize: '20px',
    fontFamily: '微軟正黑體, sans-serif',
    padding: '18px 24px',
    fontWeight: '550',
    color: 'red'
  },
  div: {
    display: 'inline-block'
  }
}

class ReplyDialog extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      open: false,
      openWarning: false
    }
  }

  fetchStudentEmailById (s) {
    axios.post('/professors/students/StudentInfo', {
      student_id: s.student_id
    }).then(res => {
      return res.data.email
    }).catch(err => {
      console.log(err)
      return false
    })
  }



  handleOpen = () => {
    const group = this.props.participants
    var groupCnt = 0
    for(var i=0; i<group.length; i++){
      if(group[i].student_status===1 || group[i].student_status==='1'){
        groupCnt ++
      }
    }
    console.log('------groupCnt------')
    console.log(groupCnt)
    console.log('------currentNum------')
    console.log(this.props.currentNum)
    if((groupCnt+parseInt(this.props.currentNum, 10))>7){
      this.setState({openWarning: true})
    }
    else{
      this.setState({open: true})
    }
    
  }

  handleClose = (status) => {
    console.log(status)
    // 如果按在視窗外面就跳出，什麼都不做
    if( status !== 1 && status !== 3 ) {
      this.setState({open: false})
      return
    }
    // 防呆確認
    const statusText = status === 3 ? '『拒絕』' : '『接受』'
    if( !window.confirm('確定回覆' + statusText + '?') ) return

    let students = this.props.participants.map( p => (
      {
        student_id: p.student_id,
        mail: p.email
      }
    ))
    console.log(students)
    console.log(this.props.firstSecond)
    this.setState({open: false})
    axios.post('/professors/researchApply/setAgree', {
      research_title: this.props.title,
      tname: this.props.idCard.tname,
      mail: this.props.idCard.mail,
      agree: status,
      student: students,
      first_second: this.props.firstSecond,
      year: this.props.year
    }).then(res => {
      console.log(res)
      if(res.data.signal === '1') window.alert('送出成功!')
      window.location.reload()
    }).catch(err => {
      console.log(err)
      window.alert('出現不明錯誤!!!')
      window.location.reload()
    })

    // trigger update
    this.props.parentFunction()
  }

  handleCloseWarning = () => {
    this.setState({openWarning: false})
  }

  render () {
    const { classes } = this.props
    return (
      <div>
        <div className={classes.div} onClick={this.handleOpen}>
          <Button variant="contained" color='primary' className={classes.replyBtn}>進入審核</Button>
          {/*<ReplyStatus status={this.props.status} classes={classes} />*/}
        </div>
      
        {/*Dialog will be open only if ReplyStatus been clicked*/}
        <Dialog
          open={this.state.openWarning}
          onClose={this.handleCloseWarning}
        >
          <div className={classes.warnTitle}>無法回覆該專題</div>
          <DialogContent className={classes.buttonStyle}>
            專題生名額已達上限，無法接受該專題申請
          </DialogContent>
        </Dialog>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div className={classes.btnTitle}>回覆專題申請</div>
          <DialogContent className={classes.buttonStyle}>
            請選擇 『接受』 或 『拒絕』 此申請，此動作不可反悔。
          </DialogContent>
          <DialogActions>
            <Button className={classes.buttonStyle} onClick={() => this.handleClose(1)} color="primary">
              接受
            </Button>
            <Button className={classes.buttonStyle} onClick={() => this.handleClose(3)} color="primary">
              拒絕
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

// const ReplyStatus = (props) => {
//   switch (props.status) {
//     case 0:
//       return <Button variant="contained" color='primary' className={props.classes.replyBtn}>回覆</Button>
//     case 1:
//       return <Button variant="contained" disabled>已接受</Button> // 基本上不會有這種狀況
//     case 2:
//       return <Button variant="contained" color='primary' className={props.classes.replyBtn}>審核中</Button> // 基本上不會有這種狀況
//     default:
//       return <Button variant="contained" color='primary' className={props.classes.replyBtn}>回覆</Button>
//   }
// }
export default withStyles(styles)(ReplyDialog)