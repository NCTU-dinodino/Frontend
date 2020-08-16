import React from 'react'
import { connect } from 'react-redux'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Input,
  Snackbar,
  InputAdornment,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  AppBar,
  Toolbar,
  Typography,
  TextField,
  withMobileDialog,
  Grid,
  Hidden
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import GroupIcon from '@material-ui/icons/Group'
import AutoRenewIcon from '@material-ui/icons/Autorenew'
import AddIcon from '@material-ui/icons/Add'
import PermIcon from '@material-ui/icons/PermIdentity'
import Remove from '@material-ui/icons/Remove'
import PhoneIcon from '@material-ui/icons/LocalPhone'
import MemberIcon from '@material-ui/icons/Accessibility'
import EmailIcon from '@material-ui/icons/Email'
import TocIcon from '@material-ui/icons/Toc'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { newProject } from '../../../../../Redux/Students/Actions/Project'
import { getSemester } from '../../../../../Utils'
import { departmentList } from '../../../../../Utils/constant'

const limitcount = 7

const styles = theme => ({
  flex: {
    flex: 1
  },
  appBar: {
    backgroundColor: '#01579B',
    color: '#FFF'
  },
  titleInput: {
    width: '98%',
    fontSize: '16px',
    marginBottom: '10px',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      marginBottom: '25px'
    }
  },
  memberInput: {
    width: '95%',
    marginTop: '20px',
    fontSize: '16px'
  },
  memberInputSmall: {
    width: '100%',
    marginBottom: '15px',
    fontSize: '14px',
  }
})

const Transition = (props) => (
  <Slide direction='up' {...props} />
)

class SendProject extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      openDialog: false,
      expandedList: [false],
      openSnackbar: false,
      snackbarMsg: '',
      title: '',
      members: [
        {
          student_id: this.props.studentIdcard.student_id,
          name: '',
          phone: '',
          email: '',
          department: '資訊工程學系',
          first_second: this.props.firstSecond,
        }
      ]
    }
    this.handleDialogOpen = this.handleDialogOpen.bind(this)
    this.handleDialogClose = this.handleDialogClose.bind(this)
    this.handdlePanelChange = this.handdlePanelChange.bind(this)
    this.handleSnackbarOpen = this.handleSnackbarOpen.bind(this)
    this.handleSnackbarClose = this.handleSnackbarClose.bind(this)
    this.handleTitleChange = this.handleTitleChange.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleAddMember = this.handleAddMember.bind(this)
    this.handleRemoveMember = this.handleRemoveMember.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleDialogOpen () {
    this.setState({ openDialog: true })
  }

  handleDialogClose () {
    this.setState({ openDialog: false })
    this.props.closeMenu()
  }

  handdlePanelChange (expanded, index) {
    const newExpandedList = [ ...this.state.expandedList ]
    newExpandedList[index] = expanded
    this.setState({ expandedList: newExpandedList })
  }

  handleSnackbarOpen (snackbarMsg) {
    this.setState({ openSnackbar: true, snackbarMsg: snackbarMsg })
  }

  handleSnackbarClose () {
    this.setState({ openSnackbar: false })
  }

  handleTitleChange (event) {
    this.setState({ title: event.target.value })
  }

  handleInputChange (value, property, index) {
    const newMembers = [ ...this.state.members ]
    newMembers[index][property] = value
    this.setState({ members: newMembers })
  }

  handleAddMember () {
    let newNumber = this.state.expandedList.length + 1
    if (newNumber > limitcount - this.props.professor.scount) {
      this.handleSnackbarOpen('專題成員已超過該教授上限！如有外系成員則不算在教授上限內。')
    }
    if (newNumber > 3) {
      this.handleSnackbarOpen('專題成員若要超過3位請至系辦申請！')
      return
    }
    this.setState({
      expandedList: [
        ...this.state.expandedList,
        false
      ],
      members: [
        ...this.state.members,
        {
          student_id: '',
          name: '',
          phone: '',
          email: '',
          department: '資訊工程學系',
          first_second: this.props.firstSecond,
        }
      ]
    })
  }

  handleRemoveMember () {
    let newExpandedList = [ ...this.state.expandedList ]
    let newMembers = [ ...this.state.members ]
    newExpandedList.splice(newExpandedList.length - 1, 1)
    newMembers.splice(newMembers.length - 1, 1)
    if (newExpandedList.length < 1) {
      this.handleSnackbarOpen('專題成員不能少於一人！')
      return
    }
    this.setState({
      expandedList: newExpandedList,
      members: newMembers
    })
  }

  handleSubmit () {
    let number_tmp = 0
    const { title, members } = this.state

    if (!title) {
      window.alert('請填寫專題題目！')
      return
    }

    let id = {}
    for (let i = 0; i < members.length; i++) {
      if ( id[members[i].student_id] == 1 ) {
        window.alert('成員資料不齊全！')
        return
      }
      else {
        id[members[i].student_id] = 1
      }

      if (members[i].student_id === '' || members[i].phone === '' ||
          members[i].email === '' || members[i].first_second === 0) {
        window.alert('成員資料不齊全！')
        return
      }

      if (members[i].department === '資訊工程學系') {
        number_tmp = (members[i].first_second === 1 ? number_tmp + 1 : number_tmp);
      }
      else { // 非本系生要填姓名
        if (members[i].name === '') {
          window.alert('成員資料不齊全！')
          return
        }
      }
    }
    
    const { projects } = this.props
    if ( members[0].first_second === 2 && projects.length > 0) {
      if ( projects[0].tname === this.props.professor.tname ) {
        window.alert('無法更換為與專題一同位教授！')
        return
      }
    }
    if (number_tmp > limitcount - this.props.professor.scount) {
      window.alert('專題成員已超過該教授上限！')
      return
    }

    const payload = {
      tname: this.props.professor.tname,
      teacher_email: this.props.professor.email,
      title: title,
      semester: getSemester(),
      members: members
    }
    this.props.newProject(payload)
  }

  render () {
    const { members } = this.state
    const { classes, fullScreen, firstSecond } = this.props

    return (
      <div>
        <MenuItem disabled={this.props.professor.scount >= limitcount} onClick={this.handleDialogOpen}>
          <ListItemIcon>
            {
              firstSecond === 1
                ? <GroupIcon />
                : <AutoRenewIcon />
            }
          </ListItemIcon>
          <ListItemText inset primary={firstSecond === 1 ? '申請專題一' : '更換為專題二指導教授'} />
        </MenuItem>

        <Dialog
          open={this.state.openDialog}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleDialogClose}
          fullWidth
          maxWidth='md'
          fullScreen={fullScreen}
        >
          <DialogTitle disableTypography>
            <AppBar className={classes.appBar} >
              <Toolbar >
                <Typography
                  variant='title'
                  color='inherit'
                  className={classes.flex}
                  style={{ fontSize: '15px' }}
                >
                  寄送專題申請
                </Typography>
                <Button
                  style={{ fontSize: '12px' }}
                  color='inherit'
                  onClick={this.handleDialogClose}
                >
                  取消
                </Button>
              </Toolbar>
            </AppBar>
          </DialogTitle>

          <DialogContent style={{ marginTop: '50px' }}>
            <Input
              placeholder='題目(可填寫尚未決定)'
              startAdornment={
                <InputAdornment position='start'>
                  <TocIcon />
                </InputAdornment>
              }
              fullWidth
              className={classes.titleInput}
              value={this.state.title}
              onChange={this.handleTitleChange}
            />

            {/* for large screen */}
            <Hidden smDown>
              <Grid container>
                {
                  this.state.expandedList.map((_, index) => (
                    <Grid item md={12} container key={index}>
                      <Grid item md={4}>
                        <Input
                          placeholder='學號'
                          startAdornment={
                            <InputAdornment position='start'>
                              <MemberIcon />
                            </InputAdornment>
                          }
                          className={classes.memberInput}
                          disabled={index === 0}
                          value={members[index].student_id}
                          onChange={(e) => this.handleInputChange(e.target.value, 'student_id', index)}
                        />
                      </Grid>
                      <Grid item md={4}>
                        <Input
                          placeholder='電話'
                          startAdornment={
                            <InputAdornment position='start'>
                              <PhoneIcon />
                            </InputAdornment>
                          }
                          className={classes.memberInput}
                          value={members[index].phone}
                          onChange={(e) => this.handleInputChange(e.target.value, 'phone', index)}
                        />
                      </Grid>
                      <Grid item md={4}>
                        <Input
                          placeholder='Email'
                          startAdornment={
                            <InputAdornment position='start'>
                              <EmailIcon />
                            </InputAdornment>
                          }
                          className={classes.memberInput}
                          value={members[index].email}
                          onChange={(e) => this.handleInputChange(e.target.value, 'email', index)}
                        />
                      </Grid>
                      <Grid item md={4}>
                        <TextField
                          select
                          InputProps={{
                            startAdornment: <InputAdornment position='start'>
                              <PermIcon />
                            </InputAdornment>
                          }}
                          SelectProps={{
                            style: { fontSize: '16px' }
                          }}
                          className={classes.memberInput}
                          disabled
                          value={members[index].first_second}
                          // onChange={(e) => this.handleInputChange(e.target.value, 'first_second', index)}
                        >
                          <MenuItem value={0}>請選擇專題(ㄧ)或(二)</MenuItem>
                          <MenuItem value={1}>專題（ㄧ）</MenuItem>
                          <MenuItem value={2}>專題（二）</MenuItem>
                        </TextField>
                      </Grid>
                      <Grid item md={4}>
                        <TextField
                          select
                          InputProps={{
                            startAdornment: <InputAdornment position='start'>
                              <PermIcon />
                            </InputAdornment>
                          }}
                          SelectProps={{
                            style: { fontSize: '16px' }
                          }}
                          className={classes.memberInput}
                          value={members[index].department}
                          onChange={(e) => this.handleInputChange(e.target.value, 'department', index)}
                        >
                          {
                            departmentList.map((department, index) => (
                              <MenuItem key={index} value={department}>{department}</MenuItem>
                            ))
                          }
                        </TextField>
                      </Grid>
                      <Grid item md={4} style={{ display: members[index].department === '資訊工程學系' ? 'none' : '' }}>
                        <Input
                          placeholder='姓名（外系需填）'
                          startAdornment={
                            <InputAdornment position='start'>
                              <MemberIcon />
                            </InputAdornment>
                          }
                          className={classes.memberInput}
                          value={members[index].name}
                          onChange={(e) => this.handleInputChange(e.target.value, 'name', index)}
                        />
                      </Grid>
                    </Grid>
                  ))
                }
              </Grid>
            </Hidden>

            {/* for small screen */}
            <Hidden mdUp>
              {
                this.state.expandedList.map((_, index) => (
                  <ExpansionPanel
                    expanded={this.state.expandedList[index]}
                    onChange={(event, expanded) => this.handdlePanelChange(expanded, index)}
                    key={index}
                  >
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                      成員 {index + 1}: {this.state.members[index].student_id}
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                      <div>
                        <Input
                          placeholder='學號'
                          disabled={index === 0}
                          startAdornment={
                            <InputAdornment position='start'>
                              <MemberIcon />
                            </InputAdornment>
                          }
                          className={classes.memberInputSmall}
                          value={members[index].student_id}
                          onChange={(e) => this.handleInputChange(e.target.value, 'student_id', index)}
                        />
                        <Input
                          placeholder='電話'
                          startAdornment={
                            <InputAdornment position='start'>
                              <PhoneIcon />
                            </InputAdornment>
                          }
                          className={classes.memberInputSmall}
                          value={members[index].phone}
                          onChange={(e) => this.handleInputChange(e.target.value, 'phone', index)}
                        />
                        <Input
                          placeholder='Email'
                          startAdornment={
                            <InputAdornment position='start'>
                              <EmailIcon />
                            </InputAdornment>
                          }
                          className={classes.memberInputSmall}
                          value={members[index].email}
                          onChange={(e) => this.handleInputChange(e.target.value, 'email', index)}
                        />
                        <TextField
                          select
                          InputProps={{
                            startAdornment: <InputAdornment position='start'>
                              <PermIcon />
                            </InputAdornment>
                          }}
                          SelectProps={{
                            style: { fontSize: '14px' }
                          }}
                          className={classes.memberInputSmall}
                          value={members[index].first_second}
                          onChange={(e) => this.handleInputChange(e.target.value, 'first_second', index)}
                        >
                          <MenuItem value={0}>請選擇專題(ㄧ)或(二)</MenuItem>
                          <MenuItem value={1}>專題（ㄧ）</MenuItem>
                          <MenuItem value={2}>專題（二）</MenuItem>
                        </TextField>
                        <TextField
                          select
                          InputProps={{
                            startAdornment: <InputAdornment position='start'>
                              <PermIcon />
                            </InputAdornment>
                          }}
                          SelectProps={{
                            style: { fontSize: '14px' }
                          }}
                          className={classes.memberInputSmall}
                          value={members[index].department}
                          onChange={(e) => this.handleInputChange(e.target.value, 'department', index)}
                        >
                          {
                            departmentList.map((department, index) => (
                              <MenuItem key={index} value={department}>{department}</MenuItem>
                            ))
                          }
                        </TextField>
                        <Input
                          placeholder='姓名（外系須填）'
                          startAdornment={
                            <InputAdornment position='start'>
                              <MemberIcon />
                            </InputAdornment>
                          }
                          className={classes.memberInputSmall}
                          style={{display: members[index].department === '資訊工程學系' ? 'none' : ''}}
                          value={members[index].name}
                          onChange={(e) => this.handleInputChange(e.target.value, 'name', index)}
                        />
                      </div>
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                ))
              }
            </Hidden>

            <div style={{ marginTop: '20px', float: 'right' }}>
              <Button variant='fab' mini color='primary' style={{ margin: '5px' }} onClick={this.handleRemoveMember}>
                <Remove />
              </Button>
              <Button variant='fab' mini color='primary' style={{ margin: '5px' }} onClick={this.handleAddMember}>
                <AddIcon />
              </Button>
            </div>

            <Snackbar
              open={this.state.openSnackbar}
              onClose={this.handleSnackbarClose}
              TransitionComponent={Transition}
              message={<span>{this.state.snackbarMsg}</span>}
            />
          </DialogContent>

          <DialogActions>
            <Button variant='contained' color='primary' onClick={this.handleSubmit}>
              送出
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  studentIdcard: state.Student.User.studentIdcard,
  projects: state.Student.Project.list.data
})

const mapDispatchToProps = (dispatch) => ({
  newProject: (payload) => dispatch(newProject(payload)),
  getScounts: (payload) => dispatch(getScounts(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withMobileDialog()(SendProject)))
