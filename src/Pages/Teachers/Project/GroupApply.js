import React from 'react'

import defaultPic from '../../../Resources/default_profile.jpg'
import ReplyDialog from '../Group/ReplyDialog'
import InfoCard from '../Shared/InfoCard'
import Loading from '../../../Components/Loading'
// mui
import Avatar from 'material-ui/Avatar'
//Chips are compact elements that represent an input, attribute, or action.
import Chip from 'material-ui/Chip' 
import Dialog from '@material-ui/core/Dialog'
import HelpIcon from '@material-ui/icons/Help'
// for multiTheme
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { withStyles } from '@material-ui/core/styles/index'
// REDUX
import { connect } from 'react-redux'
import { fetchResearchApplyList, fetchResearchList } from '../../../Redux/Teachers/Actions/Research/index'

const styles = {
  noticeTitle: {
    fontSize: '2.8em',
    fontWeight: '500',
    color: '#ae777c',
    margin: '32px 0 0 50px',
    float: 'left'
  },
  mainTitle: {
    fontSize: '2.8em',
    fontWeight: '500',
    color: '#e5e5e5',
    margin: '32px 0 0 70px',
    float: 'left'
  },
  subTitle: {
    fontSize: '1.2em',
    fontWeight: '4300',
    color: '#727272',
    margin: '55px 0 0 37px',
    float: 'left'
  },
  subHintTitle: {
    fontSize: '1.2em',
    fontWeight: '4300',
    color: '#bfbfbf',
    margin: '-25px 80px 0px 37px',
    float: 'left'
  },
  groups: {
    margin: '0 0 60px 0'
  },
  groupBtn: {
    margin: 30,
    padding: 20,
    background: '#ececec',
    borderRadius: '6px',
    border: '1px #dfdfdf solid',
    boxShadow: 'rgba(51, 51, 102, 0.3) 2px 4px 15px -2px'
  },
  pic: {
    width: '80%'
  },
  groupYear: {
    fontSize: '1.2em',
    fontWeight: '200',
    color: '#575757'
  },
  groupTitle: {
    fontSize: '2em',
    fontWeight: '100',
    color: '#575757'
  },
  chip: {
    margin: 5
  },
  chipWrapper: {
    padding: 5,
    display: 'flex',
    flexWrap: 'wrap'
  },
  groupIntro: {
    padding: 5,
    color: '#9c9c9c',
    fontSize: '1.4em',
    fontWeight: 100
  },
  reply: {
    default: {
      fontSize: '1.5em',
      fontWeight: '400',
      color: '#575757'
    },
    red: {
      fontSize: '1.5em',
      fontWeight: '400',
      color: '#9f2624'
    },
    brown: {
      fontSize: '1.5em',
      fontWeight: '400',
      color: '#845b2d'
    },
    green: {
      fontSize: '1.5em',
      fontWeight: '400',
      color: '#3c8a63'
    }
  }
}


class GroupApply extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      chipOpen: {},
      sem: getSemester(),
      InfoDialog: false
    }
  }

  handleShowInfo = () => {
    this.setState({InfoDialog: true})
  }

  handleCloseInfo = () => {
    this.setState({InfoDialog: false})
  }

  fetchData () {
    let tid = this.props.idCard.teacher_id
    let sem = this.state.sem
    // avoid padding wrong request tid, because the api
    // get /professors/profile hasn't update redux state yet
    if( tid === '001' ){
      // NOT A VALID TID
      setTimeout(() => {
        this.fetchData()
      }, 1500)
      return
    }
    this.props.FetchResearchApplyList(tid)
    this.props.FetchResearchList(tid, sem)
    this.initChip()
  }
  // execute after component be render to DOM
  componentDidMount () {
    this.fetchData()
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.idCard !== nextProps.idCard) {
      console.log(nextProps)
      this.fetchData()
    }
  }

  delay(t){
    return new Promise((res, rej) => {
      setTimeout(() => (res(1)), t)
    })
  }

  initChip = () => {
    var sidList = []
    var sidObject = {}
    for(var i=0; i<this.props.applyList.length; i++){
      for(var j=0; j<this.props.applyList[i].participants.length; j++){
        var temp_sid = this.props.applyList[i].participants[j].student_id
        sidList.push(temp_sid)
      }
    }
    for(var k=0; k<sidList.length; k++){
      sidObject[sidList[k]] = false
    }
    this.setState(prevState => {
      let temp_state = Object.assign({}, prevState)
      temp_state.chipOpen = JSON.parse(JSON.stringify(sidObject))
      return temp_state
    })
  }

  triggerUpdate = () => {
    this.fetchData()
    this.delay(1000).then((v) => (
      this.fetchData()
    )).catch((e) => (
      console.log('trigger update error' + e)
    ))
  }

  // FOR CHIP
  handleChip = (i) => {
    this.setState(prevState=>{
      let chipOpen = {...prevState.chipOpen}
      chipOpen[i] = true
      return {chipOpen}
    })
  }

  handleRequestClose = (id) => {
    this.setState(prevState=>{
      let chipOpen = {...prevState.chipOpen}
      chipOpen[id] = false
      return {chipOpen}
    })
  }

  render () {
    const acc = this.props.research.current_accept // 目前已招收人數
    const { applyList } = this.props // this.props.applyList

    return (
      <div>
        <div className='subTitle'>
          <div>
            <span>本學年度專題一已收: {acc}人 (上限7人)</span>
          </div>
          <div className='InfoBtn' onClick={this.handleShowInfo}><HelpIcon/></div>
          <Dialog
            open={this.state.InfoDialog}
            onClose={this.handleCloseInfo}
          >
            <div className='dialog_title'>教授可收專題人數說明</div>
            <div className='dialog_text'>每學年度以指導7人為上限(專題一)，每組以3人為原則<br/>
            以下幾種情形不列入名額：(1) 大五以上學生 (2) 電資學士班學生 (3) 雙主修學生 (4) 跨域學生
            (5) 外系生 (6) 交換生 (7) 專二更換指導教授學生</div>
          </Dialog>
          <div className='subTitle_item_hint'>
            <StudentStatusHint status={1}/>
            <StudentStatusHint status={0}/>
          </div>
        </div>
        <div className='groups'>
          <Loading
            size={50}
            left={40}
            top={20}
            isLoading={this.props.loadApplyList} />
          {(!this.props.loadApplyList && (Object.keys(applyList).length !== 0))
            ?
            applyList.map((item, i) => (  // item: a project group
              <ApplyButton
                key={i}
                keyId={i}
                item={item}
                idCard={this.props.idCard}
                parentFunction={this.triggerUpdate}
                chipOpen={this.state.chipOpen}
                handleChip={this.handleChip}
                handleRequestClose={this.handleRequestClose}
                currentNum={this.props.research.current_accept}
              />
            ))
            : ''
          }
        </div>
      </div>
    )
  }
}

const StudentStatusHint = (props) => (
  <MuiThemeProvider>
    <Chip style={styles.chip }
          backgroundColor={ props.status === 1 ? '#b6d7a8' : '#f9cb9c' }>
      <Avatar src={defaultPic}/> { props.status === 1 ? '本系生' : '外系生' }
    </Chip>
  </MuiThemeProvider>
)

const ApplyButton = (props) => {
  return (
    <div className='groupBtn' key={props.keyId}>
      {/*this reply button is define in Group/ReplyDialog */}
      <ReplyDialog
        idCard={props.idCard}
        status={props.item.status} // 0:
        title={props.item.research_title}
        participants={props.item.participants}
        firstSecond={props.item.first_second}
        year={props.item.year}
        parentFunction={props.parentFunction}
        currentNum={props.currentNum}
      />
      <div className='groupTitle'>
        <span className='apply-btn-year'>{props.item.year}</span>
        {"專題題目: "+props.item.research_title}
      </div>
      <div>
        <MuiThemeProvider>
          <div className='chipWrapper'>
          {/*show the little tag(chip) of each student: student name and id*/}
            {props.item.participants.map((p, i) => (
              <div key={i}>
                <Chip className='group-chip'
                      backgroundColor={ (p.student_status === 1 || p.student_status === '1') ? '#b6d7a8' : '#f9cb9c' }
                      key={i}
                      onClick={(event) => props.handleChip(p.student_id)}> 
                  <Avatar src={defaultPic}/> {p.student_id} {p.sname}
                </Chip>
                {props.chipOpen[p.student_id]===true?
                <MuiThemeProvider>
                  <Dialog
                    key={i}
                    modal={false}
                    open={props.chipOpen[p.student_id]} //props.chipOpen[p.student_id]
                    onClose={() => props.handleRequestClose(p.student_id)}
                    autoScrollBodyContent
                    maxWidth={'md'}
                  >
                    {<InfoCard
                      key={i}
                      student={p}
                      sender={props.idCard.tname}
                      sender_email={props.idCard.email}
                    />}
                  </Dialog>
                </MuiThemeProvider>:""}
              </div>
            ))}
          </div>
        </MuiThemeProvider>
      </div>
    </div>
  )
}

const getSemester = () => {
  const Today = new Date()  // current time
  return ((Today.getFullYear() - 1912) + Number(((Today.getMonth() + 1) >= 8 ? 1 : 0))) + '-' + ((Today.getMonth() + 1) >= 8 ? '1' : '2')
}

// mapStateToProps : trigger when the state in store changed
// props of GroupApply
const mapStateToProps = (state) => ({
  idCard: state.Teacher.User.idCard,
  applyList: state.Teacher.Research.applyList,
  research: state.Teacher.Research.research,
  loadApplyList: state.Teacher.Research.loadApplyList
})
const mapDispatchToProps = (dispatch) => ({
  FetchResearchApplyList: (tid) => dispatch(fetchResearchApplyList(tid)),
  FetchResearchList: (tid, sem) => dispatch(fetchResearchList(tid, sem))
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(GroupApply))