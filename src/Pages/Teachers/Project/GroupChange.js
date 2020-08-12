import React from 'react'

import defaultPic from '../../../Resources/default_profile.jpg'
// import ReplyDialog from '../Group/ReplyDialog'
import ReplyDialogChange from './ReplyDialogChange'
import InfoCard from '../Shared/InfoCard'
import Loading from '../../../Components/Loading'
// mui
import Avatar from 'material-ui/Avatar'
import Chip from 'material-ui/Chip'
import { Dialog } from 'material-ui'
// for multiTheme
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { withStyles } from '@material-ui/core/styles/index'
// REDUX
import { connect } from 'react-redux'
import { fetchChangeTeacherList, fetchResearchList } from '../../../Redux/Teachers/Actions/Research/index'

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


class GroupChange extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: true,
      message: '系統正在讀取資料中，請耐心等候。',
      chipOpen: new Map(),
      sem: getSemester()
    }
  }

  fetchData () {
    this.setState({loading: true})
    let tid = this.props.idCard.teacher_id
    let sem = this.state.sem
    this.props.FetchChangeTeacherList(tid, sem)
    this.props.FetchResearchList(tid, sem)
    this.setState({loading: false})
  }

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
    let chipOpen = this.state.chipOpen
    chipOpen.set(i, true) // set the map, key=i, value=true
    this.setState({chipOpen})
  }

  handleRequestClose = () => {
    this.setState({
      chipOpen: new Map(),
    })
  }

  isEmpty = (obj) => {
    for(var key in obj) {
      if(obj.hasOwnProperty(key))
        return false;
    }
    return true;
  }

  render () {
    const acc = this.props.research.current_accept
    const { changeTeacherList } = this.props
    //const test = changeTeacherList[0]
    return (
      <div>
        <div className='subTitle'>
          <div style={styles.subHintTitle}>
            <StudentStatusHint status={1}/>
            <StudentStatusHint status={0}/>
          </div>
          <div className='subTitle-item'>
            已收本系生: {acc}人
          </div>
        </div>
        <div className='groups'>
          <Loading
            size={50}
            left={40}
            top={20}
            isLoading={this.props.loadChangeTeacherList} />
          {(!this.props.loadChangeTeacherList && (Object.keys(changeTeacherList).length !== 0))
            ?
            // split each group in changeTeacher List, each item means a project
            changeTeacherList.map((item, i) => (  
              <ApplyButton
                key={i}
                keyId={i}
                item={item}
                idCard={this.props.idCard}
                parentFunction={this.triggerUpdate}
                chipOpen={this.state.chipOpen}
                handleChip={this.handleChip}
                handleRequestClose={this.handleRequestClose}
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
          backgroundColor={ props.status === 1 ? '#BDD8CC' : '#FFCD80' }>
      <Avatar src={defaultPic}/> { props.status === 1 ? '本系生' : '外系生' }
    </Chip>
  </MuiThemeProvider>
)

const ApplyButton = (props) => {
  
  return (
    <div className='groupBtn' key={props.keyId}>
      
      {/*show year and project title*/}
      <div className='groupTitle'>
        <span className='apply-btn-year'>{props.item.year}</span>
        {props.item.research_title}
      </div>
      {/*show all members*/}
      <div>
        <MuiThemeProvider>
          <div className='chipWrapper'>
            {props.item.participants.map((p, i) => (
              <div key={i}>
                <Chip className='group-chip'
                      backgroundColor={ (p.student_status === 1 || p.student_status === '1') ? '#BDD8CC' : '#FFCD80' }
                      key={i}
                      onClick={() => props.handleChip(props.key + p.student_id)}>
                  <Avatar src={defaultPic}/> {p.student_id} {p.sname}
                  <span style={{color: 'red'}}>  {p.score}</span>
                </Chip>

                <MuiThemeProvider>
                  <Dialog
                    key={i}
                    modal={false}
                    open={props.chipOpen.size === 0 ? false : props.chipOpen.get(props.key + p.student_id)}
                    onRequestClose={() => props.handleRequestClose()}
                    autoScrollBodyContent
                    contentStyle={{maxWidth: 'none', width: '70%', position: 'absolute', top: 0, left: '15%'}}
                  >
                    <InfoCard
                      key={i}
                      student={p}
                      sender={props.idCard.tname}
                      sender_email={props.idCard.email}
                    />
                  </Dialog>
                </MuiThemeProvider>
              </div>
            ))}
          </div>
        </MuiThemeProvider>
      </div>
      <div className='applymem'>
        <div className='changeText'>申請更換專題的學生：</div>
        {props.item.participants.filter(p => p.replace_pro===1).map((p,i,arr)=>(
          <div className='student_name'>{p.replace_pro?p.sname+' ':''}
          {(i+1)!==arr.length?'、':''}
          </div>
        ))}
        {/*show reply button*/}
        <div className='replybtn'>
          <ReplyDialogChange
            idCard={props.idCard}
            status={props.item.status}
            title={props.item.research_title}
            participants={props.item.participants}
            firstSecond={props.item.first_second}
            year={props.item.year}
            parentFunction={props.parentFunction}
          />
        </div>
      </div>
    </div>
  )
}

const getSemester = () => {
  const Today = new Date()
  return ((Today.getFullYear() - 1912) + Number(((Today.getMonth() + 1) >= 8 ? 1 : 0))) + '-' + ((Today.getMonth() + 1) >= 8 ? '1' : '2')
}

// mapStateToProps(): pass the state in the redux store as props to the component.
// It is called every time the store state changes.
// return idCard, applyList, research to component
const mapStateToProps = (state) => ({
  idCard: state.Teacher.User.idCard, // check Redux/Teachers/Reducers/User.js
  changeTeacherList: state.Teacher.Research.changeTeacherList, // check Redux/Teachers/Reducers/Research.js
  research: state.Teacher.Research.research, // check Redux/Teachers/Reducers/Research.js
  loadChangeTeacherList: state.Teacher.Research.loadChangeTeacherList
})
const mapDispatchToProps = (dispatch) => ({
  FetchChangeTeacherList: (tid, sem) => dispatch(fetchChangeTeacherList(tid, sem)),
  FetchResearchList: (tid, sem) => dispatch(fetchResearchList(tid, sem))
})
// the connection of react component and redux store
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(GroupChange))