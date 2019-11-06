
import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { Grid, Tabs, Tab, Button, Icon } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import { ResponsiveContainer } from '../../Components/Responsive'
import Form from './Form'
import {
  getBulletins,
  newBulletin,
  editBulletin,
  deleteBulletin,
  newBulletinReset,
  editBulletinReset,
  deleteBulletinReset
} from '../../Redux/Bulletins/Actions'
import { FETCHING_STATUS } from '../../Utilities/constant'

const styles = theme => ({
  root: {
    width: '75%',
    marginTop: '10vh',
    [theme.breakpoints.down('md')]: {
      width: '80%'
    },
    [theme.breakpoints.down('xs')]: {
      width: '100%'
    }
  },
  shadowWrapper: {
    marginTop: '20px',
    boxShadow: '0px 1px 5px 0px rgba(0, 0, 0, 0.2),' +
               '0px 2px 2px 0px rgba(0, 0, 0, 0.14),' +
               '0px 3px 1px -2px rgba(0, 0, 0, 0.12)'
  },
  tabsRoot: {
    backgroundColor: '#69bb68',
    borderBottom: '1px solid #e8e8e8'
  },
  tabsIndicator: {
    backgroundColor: 'transparent'
  },
  tabLabel: {
    width: '50%',
    color: '#fcfcfc',
    fontSize: '18px',
    [theme.breakpoints.down('xs')]: {
      fontSize: '14px'
    }
  },
  contentRoot: {
    fontSize: '18px',
    paddingTop: '15px',
    paddingLeft: '15px',
    [theme.breakpoints.down('xs')]: {
      fontSize: '14px'
    },
    '& li': {
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      listStyle: 'none',
      padding: '0 15px 10px 30px',
      color: '#444444',
      transition: '.12s',
      '&::before': {
        content: '""', // empty content in jss syntax
        position: 'absolute',
        top: '.27em',
        left: '5px',
        width: '10px',
        height: '10px',
        backgroundColor: '#444',
        fontSize: '2em',
        opacity: .5,
        transition: '.5s'
      },
      '&:hover': {
        color: '#bebebe',
        '&::before': {
          opacity: 1,
          transition: '.1s',
          width: '25px',
          left: '-10px',
          backgroundColor: '#ba5353',
          borderRadius: '5px'
        }
      }
    }
  },
  content: {
    flexGrow: 1
  },
  contentDate: {
    whiteSpace: 'nowrap',
    marginLeft: '10px',
    display: 'flex',
    alignItems: 'center',
    fontSize: '15px',
    [theme.breakpoints.down('xs')]: {
      fontSize: '12px'
    }
  }
})

class Bulletin extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      type: 0,
      formOpen: false,
      formType: '',
      payload: {
        type: -1,
        content: ''
      }
    }
    this.handleTabChange = this.handleTabChange.bind(this)
    this.handleFormOpen = this.handleFormOpen.bind(this)
    this.handleFormClose = this.handleFormClose.bind(this)
    this.updatePayload = this.updatePayload.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount () {
    this.props.getBulletins()
  }

  componentDidUpdate () {
    const { newStatus, editStatus, deleteStatus } = this.props

    // 新增編輯刪除後，重新抓公告，Reset status
    if (newStatus === FETCHING_STATUS.DONE) {
      this.props.getBulletins()
      this.props.newBulletinReset()
    }
    if (editStatus === FETCHING_STATUS.DONE) {
      this.props.getBulletins()
      this.props.editBulletinReset()
    }
    if (deleteStatus === FETCHING_STATUS.DONE) {
      this.props.getBulletins()
      this.props.deleteBulletinReset()
    }
  }

  handleTabChange (event, type) {
    this.setState({ type: type })
  }

  handleFormOpen (formType, defaultValue = { type: -1, content: '' }) {
    this.setState({
      formOpen: true,
      formType: formType,
      payload: defaultValue
    })
  }

  handleFormClose () {
    this.setState({
      formOpen: false,
      payload: {
        type: -1,
        content: ''
      }
    })
  }

  updatePayload (value) {
    this.setState((state) => ({
      payload: {
        ...state.payload,
        ...value
      }
    }))
  }

  handleSubmit () {
    this.state.formType === 'new'
      ? this.props.newBulletin(this.state.payload)
      : this.props.editBulletin(this.state.payload)
    this.handleFormClose()
  }

  handleDelete (id) {
    if (window.confirm('確定刪除此公告？')) {
      this.props.deleteBulletin({
        id: id
      })
    }
  }

  render () {
    const { classes, bulletins, admin } = this.props
    const { type, formOpen, formType, payload } = this.state

    return (
      <ResponsiveContainer justify='center'>
        <Grid item xs={10} container justify='center'>
          <div className={classes.root}>
            { // 是助理才能新增
              admin &&
              <Button
                variant='contained'
                size='large'
                color='primary'
                onClick={(e) => this.handleFormOpen('new')}
              >
                新增公告
              </Button>
            }

            <div className={classes.shadowWrapper}>
              <Tabs
                value={type}
                onChange={this.handleTabChange}
                classes={{ root: classes.tabsRoot, indicator: classes.tabsIndicator }}
                fullWidth
                centered
              >
                <Tab label='公告訊息' value={0} classes={{ label: classes.tabLabel }} />
                <Tab label='網站更新' value={1} classes={{ label: classes.tabLabel }} />
              </Tabs>
              <ul className={classes.contentRoot}>
                {
                  bulletins.filter(bulletin => bulletin.type === type)
                    .map((bulletin) => (
                      <li key={bulletin.id}>
                        <div className={classes.content}>{bulletin.content}</div>
                        <div className={classes.contentDate}>
                          <div>{bulletin.timestamp.slice(0, 10)}</div>
                          { // 是助理才能編輯刪除
                            admin &&
                            <React.Fragment>
                              <Icon
                                color='primary'
                                style={{ cursor: 'pointer' }}
                                onClick={(e) => this.handleFormOpen('edit', bulletin)}
                              >
                                edit_icon
                              </Icon>
                              <DeleteIcon
                                color='secondary'
                                style={{ cursor: 'pointer' }}
                                onClick={() => this.handleDelete(bulletin.id)}
                              />
                            </React.Fragment>
                          }
                        </div>
                      </li>
                    ))
                }
              </ul>
            </div>
          </div>
        </Grid>

        {/* dialog form */}
        <Form
          open={formOpen}
          title={formType === 'new' ? '新增公告' : '編輯公告'}
          payload={payload}
          updatePayload={this.updatePayload}
          onSubmit={this.handleSubmit}
          onClose={this.handleFormClose}
        />
      </ResponsiveContainer>
    )
  }
}

const mapStateToProps = (state) => ({
  bulletins: state.Bulletins.index.data,
  newStatus: state.Bulletins.new.status,
  editStatus: state.Bulletins.edit.status,
  deleteStatus: state.Bulletins.delete.status
})

const mapDispatchToProps = (dispatch) => ({
  getBulletins: () => dispatch(getBulletins()),
  newBulletin: (payload) => dispatch(newBulletin(payload)),
  editBulletin: (payload) => dispatch(editBulletin(payload)),
  deleteBulletin: (payload) => dispatch(deleteBulletin(payload)),
  newBulletinReset: () => dispatch(newBulletinReset()),
  editBulletinReset: () => dispatch(editBulletinReset()),
  deleteBulletinReset: () => dispatch(deleteBulletinReset())
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Bulletin))
