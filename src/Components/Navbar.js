
import React from 'react'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import RaisedButton from 'material-ui/RaisedButton'
import { Navbar, Nav, NavItem, ButtonToolbar } from 'react-bootstrap'
import defalt from '../Resources/defalt.jpg'
import dinoIcon from '../Resources/dinoIcon_graduate.png'
import NavButton from './NavButton'
import { withStyles } from '@material-ui/core/styles'
import {
  FormControl,
  Input,
  InputLabel,
  Select,
  MenuItem as MUIMenuItem
} from '@material-ui/core'
import { OnSuperMode } from '../Redux/Assistants/Actions/User'
import { studentUpdateIdCard } from '../Redux/Students/Actions/User'
import { teacherUpdateIdCard } from '../Redux/Teachers/Actions/User'
import './Navbar.css'

const style = {
  BrandBox: {
    height: 28,
    display: 'inline-block',
    marginTop: 12,
    marginLeft: 7,
    marginRight: 25,
    verticalAlign: 'top',
    transition: 'background-color 0.5s ease'
  },
  BrandName: {
    fontFamily: 'Noto Sans CJK TC',
    fontWeight: 400,
    fontSize: 20,
    marginLeft: 9
  },
  BrandSubName: {
    fontFamily: 'Noto Sans CJK TC',
    fontWeight: 'lighter',
    fontSize: 14,
    marginLeft: 10
  },
  LogoutButtonLabel: {
    fontFamily: 'Noto Sans CJK TC',
    fontSize: 14,
    color: '#7B7B7B'
  },
  cssLabel: {
    fontSize: 15,
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
}

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
    },
    {
      label: '課程抵免',
      icon: 'fa fa-list-alt',
      url: '/students/credit'
    }
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
    {
      label: '抵免審核',
      icon: 'fa fa-list-alt',
      url: '/teachers/verify'
    }
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
    const { classes, type, name, subname, superMode } = this.props

    return (
      <Navbar staticTop fixedTop fluid expanded={expanded} onToggle={this.onToggleCollapse}>
        <Navbar.Header>
          <div className={classes.BrandBox}>
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
              navItems[type].map((item, index) => (
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
            <NavItem className='logout-box'>
              <ButtonToolbar>
                <div className='idcard' /* onClick={onClicks[4]} */>
                  {/* <MuiThemeProvider> */}
                  {/* <Notifications color = {'#c40000'} className='red-spot animated swing' style={{animationDuration:'2s', animationIterationCount:10000,}}/> */}
                  {/* </MuiThemeProvider> */}
                  <img id='idcard-photo' src={defalt} alt='' />
                  <div style={{
                    display: 'inline-block',
                    verticalAlign: 'middle',
                    marginLeft: 9
                  }}>
                    <div id='idcard-top'>{name}</div>
                    <div id='idcard-buttom'>{subname}</div>
                  </div>
                </div>
                <MuiThemeProvider>
                  <RaisedButton
                    backgroundColor='#DDDDDD'
                    style={{ marginLeft: '12px' }}
                    labelStyle={style.LogoutButtonLabel}
                    label='登出'
                    onClick={() => { window.location = '/logout' }}
                  />
                </MuiThemeProvider>
              </ButtonToolbar>
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
                  <MUIMenuItem 
                    value='assistant'
                    style={{ fontSize: '20px' }}
                    component={Link}
                    to='/assistants/head'
                  >
                    助理端
                  </MUIMenuItem>
                  <MUIMenuItem 
                    value='teacher'
                    style={{ fontSize: '20px' }} 
                    component={Link}
                    to='/teachers/head'
                  >
                    教授端
                  </MUIMenuItem>
                  <MUIMenuItem
                    value='student'
                    style={{ fontSize: '20px' }}
                    component={Link}
                    to='/students/head'
                  >
                    學生端
                  </MUIMenuItem>
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
  superMode: state.Assistant.User.superMode
})

const mapDispatchToProps = (dispatch) => ({
  OnSuperMode: () => dispatch(OnSuperMode()),
  studentUpdateIdCard: () => dispatch(studentUpdateIdCard()),
  teacherUpdateIdCard: () => dispatch(teacherUpdateIdCard())
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(withRouter(_Navbar)))
