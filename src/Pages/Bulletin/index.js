
import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Grid, Tabs, Tab, Button, Icon } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import { ResponsiveContainer } from '../../Components/Responsive'
import Form from './Form'

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

  handleTabChange (event, type) {
    this.setState({ type: type })
  }

  handleFormOpen (formType, originValue = { type: -1, content: '' }) {
    this.setState({
      formOpen: true,
      formType: formType,
      payload: {
        type: originValue.type,
        content: originValue.content
      }
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

  }

  render () {
    const { classes } = this.props
    const { type, formOpen, formType, payload } = this.state
    const data = [
      {
        type: 0,
        content: '抵免申請於下學期開學第一週開放',
        timestamp: '2019-11-04 12:16:51'
      },
      {
        type: 0,
        content: '專題修課必須於系統提出申請',
        timestamp: '2019-11-04 12:16:51'
      },
      {
        type: 1,
        content: '增加放置抵免研究所課程功能增加放置抵免研究所課程功能增加放置抵免研究所課程功能',
        timestamp: '2019-11-04 12:16:51'
      },
      {
        type: 1,
        content: '已匯入107下課程',
        timestamp: '2019-11-04 12:16:51'
      },
    ]

    return (
      <ResponsiveContainer justify='center'>
        <Grid item xs={10} container justify='center'>
          <div className={classes.root}>
            <Button
              variant='contained'
              size='large'
              color='primary'
              onClick={(e) => this.handleFormOpen('new')}
            >
              新增公告
            </Button>

            <div className={classes.shadowWrapper}>
              <Tabs
                value={type}
                onChange={this.handleTabChange}
                classes={{ root: classes.tabsRoot, indicator: classes.tabsIndicator }}
                fullWidth
                centered
              >
                <Tab
                  label='公告訊息'
                  value={0}
                  classes={{ label: classes.tabLabel }}
                />
                <Tab
                  label='網站更新'
                  value={1}
                  classes={{ label: classes.tabLabel }}
                />
              </Tabs>
              <ul className={classes.contentRoot}>
                {
                  data.filter(d => d.type === type).map((d, index) => (
                    <li key={index}>
                      <div className={classes.content}>{d.content}</div>
                      <div className={classes.contentDate}>
                        {d.timestamp.slice(0, 10)}
                        <Icon
                          color='primary'
                          style={{ cursor: 'pointer' }}
                          onClick={(e) => this.handleFormOpen('edit', d)}
                        >
                          edit_icon
                        </Icon>
                        <DeleteIcon
                          color='secondary'
                          style={{ cursor: 'pointer' }}
                        />
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

export default withStyles(styles)(Bulletin)
