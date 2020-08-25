
import React from 'react'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import RaisedButton from 'material-ui/RaisedButton'
import { Navbar, Nav, NavItem } from 'react-bootstrap'
import { withStyles } from '@material-ui/core/styles'
import {
  FormControl,
  Input,
  InputLabel,
  Select,
  MenuItem
} from '@material-ui/core'
import NavButton from './NavButton'
import { OnSuperMode } from '../../Redux/Assistants/Actions/User'
import { studentUpdateIdCard } from '../../Redux/Students/Actions/User'
import { teacherUpdateIdCard } from '../../Redux/Teachers/Actions/User'
import default_profile from '../../Resources/default_profile.jpg'
import dinoIcon from '../../Resources/dinoIcon_graduate.png'
import styles from './styles'

const headUrl = {
  'student': '/students/head',
  'assistant': '/assistants/head',
  'teacher': '/teachers/head',
}

const navItems = {
  'student': [
    {
      label: '畢業預審',
      icon: 'fa fa-graduation-cap',
      url: '/students/grad'
    },
    {
      label: '推薦課程',
      icon: 'glyphicon glyphicon-file',
      url: '/students/recommend'
    },
    {
      label: '專題',
      icon: 'fa fa-users',
      url: '/students/project'
    }
    // {
    //   label: '課程抵免',
    //   icon: 'fa fa-list-alt',
    //   url: '/students/credit'
    // }
  ],
  'assistant': [
    {
      label: '畢業預審',
      icon: 'fa fa-graduation-cap',
      url: '/assistants/grad'
    },
    {
      label: '修課狀況',
      icon: 'fa fa-university',
      url: '/assistants/course'
    },
    {
      label: '學生專題',
      icon: 'fa fa-users',
      url: '/assistants/project'
    },
    {
      label: '導生',
      icon: 'fa fa-coffee',
      url: '/assistants/family'
    },
    {
      label: '抵免審核',
      icon: 'fa fa-list-alt',
      url: '/assistants/verify'
    },
    {
      label: '系統設定',
      icon: 'fa fa-cogs',
      url: '/assistants/setting'
    }
  ],
  'teacher': [
    {
      label: '專題',
      icon: 'fa fa-users',
      url: '/teachers/group'
    },
    {
      label: '課程',
      icon: 'glyphicon glyphicon-file',
      url: '/teachers/course'
    },
    {
      label: '導生',
      icon: 'fa fa-coffee',
      url: '/teachers/family'
    },
    // {
    //   label: '抵免審核',
    //   icon: 'fa fa-list-alt',
    //   url: '/teachers/verify'
    // }
  ]
}

class _Navbar extends React.Component {
  constructor (props) {
    super(props)
    this.state = { expanded: false }
    this.onToggleCollapse = this.onToggleCollapse.bind(this)
  }

  componentDidMount () {
    if (this.props.type === 'assistant') this.props.OnSuperMode()
    if (this.props.superMode) {
      if (this.props.type === 'student') this.props.studentUpdateIdCard()
      if (this.props.type === 'teacher') this.props.teacherUpdateIdCard()
    }
  }

  onToggleCollapse (expanded) {
    this.setState({ expanded: expanded })
  }

  render () {
    const { expanded } = this.state
    const { classes, type, name, subname, superMode, sid } = this.props

    const is108Student = (type === 'student' && sid.substr(0, 2) >= '08')

    return (
      <Navbar className={classes.navbar} staticTop fixedTop fluid expanded={expanded} onToggle={this.onToggleCollapse}>
        <Navbar.Header>
          <div className={classes.navBrand}>
            <img
              alt=''
              src={dinoIcon}
              style={{ height: 35, cursor: 'pointer' }}
              onClick={() => this.props.history.push(headUrl[type])}
            />
          </div>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            {
              navItems[type].filter((value,index)=>(!is108Student || index!=0)).map((item, index) => (
                <NavButton
                  key={item.url}
                  label={item.label}
                  icon={item.icon}
                  link={item.url}
                  onClick={() => {

                    this.setState({ expanded: false })
                    this.props.history.push(item.url)
                  }}
                  selected={this.props.location.pathname === item.url}
                />
              ))
            }
          </Nav>
          <Nav pullRight>
            <NavItem className={classes.logoutBox}>
              <div className={classes.idCard}>
                <img className={classes.idCardPhoto} src={default_profile} alt='' />
                <div className={classes.idCardText}>
                  <div>{name}</div>
                  <div>{subname}</div>
                </div>
              </div>
              <MuiThemeProvider>
                <RaisedButton
                  backgroundColor='#DDDDDD'
                  style={{ marginLeft: '12px' }}
                  labelStyle={styles.logoutButtonLabel}
                  label='登出'
                  onClick={() => { window.location = '/' }}
                />
              </MuiThemeProvider>
            </NavItem>
          </Nav>
          <Nav pullRight>
            {
              (process.env.REACT_APP_ASSISTANT_SUPER_mode === "on" && superMode) &&
              <FormControl style={{ width: '150px', marginRight: '20px' }}>
                <InputLabel
                  FormLabelClasses={{
                    root: classes.cssLabel,
                    focused: classes.cssFocused,
                  }}
                >
                  切換角色
                </InputLabel>
                <Select
                  input={
                    <Input
                      classes={{
                        underline: classes.cssUnderline,
                      }}
                    />
                  }
                  value={type}
                  style={{ fontSize: '15px' }}
                >
                  <MenuItem 
                    value='assistant'
                    style={{ fontSize: '20px' }}
                    component={Link}
                    to='/assistants/head'
                  >
                    助理端
                  </MenuItem>
                  <MenuItem 
                    value='teacher'
                    style={{ fontSize: '20px' }} 
                    component={Link}
                    to='/teachers/head'
                  >
                    教授端
                  </MenuItem>
                  <MenuItem
                    value='student'
                    style={{ fontSize: '20px' }}
                    component={Link}
                    to='/students/head'
                  >
                    學生端
                  </MenuItem>
                </Select>
              </FormControl>
            }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

const mapStateToProps = (state) => ({
  superMode: state.Assistant.User.superMode,
  sid: state.Student.User.studentIdcard.student_id
})

const mapDispatchToProps = (dispatch) => ({
  OnSuperMode: () => dispatch(OnSuperMode()),
  studentUpdateIdCard: () => dispatch(studentUpdateIdCard()),
  teacherUpdateIdCard: () => dispatch(teacherUpdateIdCard())
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withRouter(_Navbar)))
