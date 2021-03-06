import React from 'react'

// resource
import defaultPic from '../../../Resources/default_profile.jpg'

// component
import InfoCard from '../Shared/InfoCard'
import Loading from '../../../Components/Loading'
import ChangeTitleDialog from '../Group/ChangeTitleDialog'
import ScoreDialog from '../Group/ScoreDialog'

// mui
import Avatar from 'material-ui/Avatar'
import Chip from 'material-ui/Chip'
import Dialog from '@material-ui/core/Dialog';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import HelpIcon from '@material-ui/icons/Help';
import { withStyles } from '@material-ui/core/styles/index';

// REDUX
import { fetchResearchList1, fetchResearchList2 } from '../../../Redux/Teachers/Actions/Research/index'
import { connect } from 'react-redux'

class GroupList extends React.Component {
    constructor (props) {
      super(props)
      this.state = {
        message: '系統正在讀取資料中，請耐心等候。',
        chipOpen: new Map(),
        semVal: getSemester(),
        yearVal: getYear(),
        yearList: ['107'],
        InfoDialog: false
      }
    }

    fetchData (year) {
      let tid = this.props.idCard.teacher_id
      // avoid padding wrong request tid, because the api
      // get /professors/profile hasn't update redux state yet
      if( tid === '001' ){
        // NOT A VALID TID
        setTimeout(() => {
          console.log('----- fetchData AGAIN!!!! ----')
          this.fetchData(year)
        }, 3000)
        return
      }
      this.props.FetchResearchList1(tid, year)
      this.props.FetchResearchList2(tid, year)
    }

    componentDidMount () {
      this.fetchData(this.state.yearVal)
      this.makeYearList()
    }

    componentWillReceiveProps (nextProps) {
      if (this.props.idCard !== nextProps.idCard) {
        this.fetchData(this.state.yearVal)
      }
    }

    delay (t) {
      return new Promise((res, rej) => {
        setTimeout(() => (res(1)), t)
      })
    }

    triggerUpdate = () => {
      this.delay(1000).then((v) => (
        this.fetchData(this.state.yearVal)
      )).catch((e) => (
        console.log('trigger update error' + e)
      ))
    }

    handleChip = (i) => {
      let chipOpen = this.state.chipOpen
      chipOpen.set(i, true)
      this.setState({chipOpen})
    }

    handleRequestClose = () => {
      this.setState({
        chipOpen: new Map(),
      })
    }

    handleDropDownChange = (event, index, yearVal) => {
      this.setState({yearVal})
      this.fetchData(yearVal)
    }

    makeYearList = () => {
      let yearList = []
      let y = getYear()
      yearList.push(y)
      while(y !== '106'){
        let ty = parseInt(y, 10) - 1
        y = ty.toString()
        yearList.push(y)
      }
      this.setState({yearList})
    }

    handleShowInfo = () => {
      this.setState({InfoDialog: true})
    }

    handleCloseInfo = () => {
      this.setState({InfoDialog: false})
    }

    calStudentNum = (sem) => {
      var cs_2 = 0
      var other_2 = 0
      if(sem===1){
        const group = this.props.research1.groups
        for(var i=0; i<group.length; i++){
          if(group[i].first_second==='2'){
            const par = group[i].participants
            for(var j=0; j<par.length; j++){
              if(par[j].student_status===1){ // 專二資工
                cs_2 += 1
              }
              else if(par[j].student_status===0){ // 專二外系
                other_2 += 1
              }
            }
          }
        }
        const cs_1 = this.props.research1.cs_number - cs_2
        const other_1 = this.props.research1.other_number - other_2
        return [cs_1, other_1, cs_2, other_2]
      }
      else if(sem===2){
        const group = this.props.research2.groups
        for(var i=0; i<group.length; i++){
          if(group[i].first_second==='2'){
            const par = group[i].participants
            for(var j=0; j<par.length; j++){
              if(par[j].student_status===1){ // 專二資工
                cs_2 += 1
              }
              else if(par[j].student_status===0){ // 專二外系
                other_2 += 1
              }
            }
          }
        }
        const cs_1 = this.props.research2.cs_number - cs_2
        const other_1 = this.props.research2.other_number - other_2
        return [cs_1, other_1, cs_2, other_2]
      }
    }

    render () {
      const sem1 = this.calStudentNum(1)
      const sem2 = this.calStudentNum(2)
      const groups1 = this.props.research1.groups
      const groups2 = this.props.research2.groups
      const accept_num = this.props.research1.current_accept
      return (
        <div>
          <div className='subTitle'>
            <div className='subTitle-item'>選擇年度: </div>
            <div >
              <MuiThemeProvider>
                <DropDownMenu
                  value={this.state.yearVal}
                  onChange={this.handleDropDownChange}
                  style={{width: 150, fontFamily: 'Noto Sans CJK TC'}}
                  autoWidth={false}
                >
                {
                  this.state.yearList.map( item =>
                    <MenuItem value={item} primaryText={item} />
                  )
                }
                </DropDownMenu>
              </MuiThemeProvider>
            </div>
            <div>
              <span>本學年度專題一已收: {accept_num}人 (上限7人)</span>
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
          <div className='subTitle-sem'>
            <div className="currentSem">上學期</div>
            <div className='studentNum'>
              <span>專題(一)：已收&nbsp;&nbsp;本系學生: {sem1[0]}人
              &nbsp;&nbsp; / &nbsp;&nbsp; 外系學生: {sem1[1]}人</span>
              <span>專題(二)：已收&nbsp;&nbsp;本系學生: {sem1[2]}人
              &nbsp;&nbsp; / &nbsp;&nbsp; 外系學生: {sem1[3]}人</span>
            </div>
          </div>
          <div className='groups'>
            <Loading
              size={50}
              left={40}
              top={20}
              isLoading={this.props.loadReacherList1} />
              {!this.props.loadReacherList1 && groups1.length !== undefined
                ? groups1.map((item, i) => {
                  if(item.year[4] === '1')
                    return (
                      <GroupButton
                        key={i}
                        keyId={i}
                        item={item}
                        idCard={this.props.idCard}
                        groupClick={this.props.handleGroupClick}
                        parentFunction={this.triggerUpdate}
                        chipOpen={this.state.chipOpen}
                        handleChip={this.handleChip}
                        sem={1}
                        year={this.state.yearVal}
                        handleRequestClose={this.handleRequestClose}
                      />
                    )
                  else return null
                })
                : ''
              }
          </div>
          <div className='subTitle-sem subTitle-sem-orange'>
            <div className="currentSem">下學期</div>
            <div className='studentNum'>
              <span>專題(一)：已收&nbsp;&nbsp;本系學生: {sem2[0]}人
              &nbsp;&nbsp; / &nbsp;&nbsp; 外系學生: {sem2[1]}人</span>
              <span>專題(二)：已收&nbsp;&nbsp;本系學生: {sem2[2]}人
              &nbsp;&nbsp; / &nbsp;&nbsp; 外系學生: {sem2[3]}人</span>
            </div>
          </div>
          <div className='groups'>
            <Loading
              size={50}
              left={40}
              top={20}
              isLoading={this.props.loadReacherList2} />
              {!this.props.loadReacherList2 && groups2.length !== undefined
                ? groups2.map((item, i) => {
                  if(item.year[4] === '2')
                    return (
                      <GroupButton
                        key={i}
                        keyId={i}
                        item={item}
                        idCard={this.props.idCard}
                        groupClick={this.props.handleGroupClick}
                        parentFunction={this.triggerUpdate}
                        chipOpen={this.state.chipOpen}
                        handleChip={this.handleChip}
                        sem={2}
                        year={this.state.yearVal}
                        handleRequestClose={this.handleRequestClose}
                      />
                    )
                  else return null
                })
                : ''
              }
          </div>
        </div>
      )
    }
}

const StudentStatusHint = (props) => (
  <MuiThemeProvider>
    <Chip style={{margin: 5, color: '#fffeee'}}
      backgroundColor={ props.status === 1 ?  '#b6d7a8' : '#f9cb9c'}>
      <Avatar src={defaultPic}/> { props.status === 1 ? '本系生' : '外系生' }
    </Chip>
  </MuiThemeProvider>
)

const GroupButton = (props) => (
    <div className={props.sem === 1 ? 'groupBtn' : 'groupBtn-orange' } key={props.keyId}>
      <div>
        <div className='groupYear'>年度 : {props.item.year}</div>
        <div className='block'>
          <div className='groupModify'>
            <ChangeTitleDialog
                title={props.item.research_title}
                firstSecond={props.item.first_second}
                year={props.item.year}
                idCard={props.idCard}
                parentFunction={props.parentFunction}
            />
          </div>
          <div className='groupModify'>
            <ScoreDialog
                title={props.item.research_title}
                participants={props.item.participants}
                firstSecond={props.item.first_second}
                idCard={props.idCard}
                year={props.item.year}
                parentFunction={props.parentFunction}
            />
          </div>
        </div>
        <div>
          <div className='groupTitle'>{"專題題目: "+props.item.research_title}</div>
        </div>
        <div>
          <MuiThemeProvider>
            <div className='chipWrapper'>
                {props.item.participants.map((p, i) => (
                    <div key={i}>

                      <Chip className='group-chip'
                            style={{color: '#fffeee'}}
                            key={i}
                            onClick={() => props.handleChip(props.key + p.student_id)}
                            backgroundColor={(p.student_status===1 || p.student_status==='1') ? '#b6d7a8' : '#f9cb9c'}>
                        <Avatar src={defaultPic}/> {p.student_id} {p.sname}
                        <span style={{color: 'red'}}>  {p.score}</span>
                      </Chip>

                      <MuiThemeProvider>
                      {/*style={{maxWidth: 'none', width: '70%', position: 'absolute', top: 0, left: '15%'}}*/}
                        <Dialog
                          key={i}
                          modal={false}
                          open={props.chipOpen.size === 0 ? false : props.chipOpen.get(props.key + p.student_id)}
                          onClose={() => props.handleRequestClose()}
                          autoScrollBodyContent
                          maxWidth={'md'}
                          fullWidth={true}
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
      </div>
    </div>
)

const getYear = () => {
    const Today = new Date()
    return ((Today.getFullYear() - 1912) + Number(((Today.getMonth() + 1) >= 8 ? 1 : 0)))
}

const getSemester = () => {
    const Today = new Date()
    return ((Today.getFullYear() - 1912) + Number(((Today.getMonth() + 1) >= 8 ? 1 : 0))) + '-' + ((Today.getMonth() + 1) >= 8 ? '1' : '2')
}

const mapStateToProps = (state) => ({
    idCard: state.Teacher.User.idCard,
    research1: state.Teacher.Research.research1,
    research2: state.Teacher.Research.research2,
    loadReacherList1: state.Teacher.Research.loadReacherList1, // To control not to show
    loadReacherList2: state.Teacher.Research.loadReacherList2  // initial state in redux.
})
const mapDispatchToProps = (dispatch) => ({
    FetchResearchList1: (tid, year) => dispatch(fetchResearchList1(tid, year)),
    FetchResearchList2: (tid, year) => dispatch(fetchResearchList2(tid, year))
})

export default connect(mapStateToProps, mapDispatchToProps)(GroupList)