import React from 'react'
import { connect } from 'react-redux'
import { ChangeTeacher } from '../../../Redux/Teachers/Actions/Research'
//import Button from '@material-ui/core/Button'
// for multiTheme
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
// for bootstrap 3
import {Button} from 'react-bootstrap'
import axios from 'axios'

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
    console.log('-------- students ---------')
    console.log(students)
    // 防呆確認
    const statusText = status === 0 ? '『拒絕』' : '『接受』'
    //if( !window.confirm('確定回覆' + statusText + '?') ) return

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

  // handleClick (agree) {
  //   let payload = {
  //     student_id: this.props.student_id,
  //     semester: this.props.sem,
  //     research_title: this.props.research.research_title,
  //     first_second: this.props.research.first_second,
  //     agree_replace: agree
  //   }
  //   this.props.ChangeTeacher(payload)
  // }

  render () {
    const actions = [
      <FlatButton
        label='同意'
        primary
        onClick={ () => this.handleClose(1) }
      />,
      <FlatButton
        label='拒絕'
        secondary
        onClick={ () => this.handleClose(0) }
      />
    ]
    return (
      <div>
        <MuiThemeProvider>
          <div onClick={this.handleOpen}>
            <Button bsStyle='primary'>回覆</Button>
            {/*<ReplyStatus status={this.props.status}/>*/}
          </div>
        </MuiThemeProvider>
        <MuiThemeProvider>
          {/*Dialog will be open only if ReplyStatus been clicked*/}
          <Dialog 
            title='回覆更換教授申請'
            actions={actions}
            modal={false}
            open={this.state.open}
            onRequestClose={this.handleClose}
          >
            您是否同意
            {this.props.participants.filter(p => p.replace_pro===1).map((p,i,arr)=>(
              <span>{p.replace_pro?p.sname+' ':''}{(i+1)!==arr.length?'、':''}</span>
            ))}更換指導教授？  
            <br/>
            請選擇『同意』或『拒絕』此申請，此動作不可反悔。
          </Dialog>
        </MuiThemeProvider>
      </div>
      
    )
  }
}
const ReplyStatus = (props) => {
  switch (props.status) {
    case 0:
      return <Button bsStyle='primary'>回覆</Button>
    case 1:
      return <Button bsStyle='success' disabled>已接受</Button> // 基本上不會有這種狀況
    case 2:
      return <Button bsStyle='info'>審核中</Button> // 基本上不會有這種狀況
    default:
      return <Button bsStyle='primary'>回覆</Button>
  }
}
const mapState = (state) => ({
})

const mapDispatch = (dispatch) => ({
  ChangeTeacher: (payload) => dispatch(ChangeTeacher(payload))
})

export default connect(mapState, mapDispatch)(ReplyDialogChange)
