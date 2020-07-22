
import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import {
  Collapse,
  IconButton,
  Avatar,
  Divider,
  Grid,
  Hidden
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { withStyles } from '@material-ui/core/styles'
import RwdIconButton from './RwdIconButton'
import defaultPhoto from '../../../../Resources/default_profile.jpg'

const styles = theme => ({
  cardWrapper: {
    marginTop: '30px',
    padding: '20px 25px',
    background: '#fbfbfb',
    borderRadius: '6px',
    border: '1px #dfdfdf solid',
    position: 'relative',
    boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.2),' + 
               '0px 1px 1px 0px rgba(0, 0, 0, 0.14),' + 
               '0px 2px 1px -1px rgba(0, 0, 0, 0)',
    [theme.breakpoints.down('sm')]: {
      marginTop: '15px'
    }
  },
  cardTitle: {
    fontSize: '1.6em',
    color: '#575757',
    [theme.breakpoints.down('md')]: {
      fontSize: '1.4em',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.2em',
    }
  },
  cardText: {
    fontSize: '1.2em',
    color: '#575757',
    [theme.breakpoints.down('md')]: {
      fontSize: '1em',
    }
  },
  badge: {
    marginLeft: '5px',
    padding: '1px 5px',
    borderRadius: '10px',
    backgroundColor: '#1976d2',
    color: 'white',
    [theme.breakpoints.down('md')]: {
      fontSize: '0.9em',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.8em',
    }
  },
  photo: {
    width: '80%',
    minWidth: '110px',
    overflow: 'hidden',
    height: '140px'
  },
  buttonGroup: {
    position: 'absolute',
    top: '5%',
    right: '1%'
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    }),
    marginLeft: 'auto'
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  }
})

class Index extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      expanded: false
    }
    this.handleExpandClick = this.handleExpandClick.bind(this)
  }

  handleExpandClick () {
    this.setState(state => ({ expanded: !state.expanded }))
  }

  render () {
    const { classes, professor, isMentor } = this.props
    const photo = professor.photo ? 'data:image/png;base64,' + professor.photo : defaultPhoto

    return (
      <div className={classes.cardWrapper}>
        <Grid container>
          <Hidden mdDown>
            <Grid item md={2}>
              <img className={classes.photo} src={photo} alt='' />
            </Grid>
          </Hidden>
          <Hidden lgUp>
            <Grid item xs={2} md={1}>
              <Avatar alt='picture' src={photo} />
            </Grid>
          </Hidden>
          <Grid item xs={8}>
            {
              isMentor
                ? (
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div className={classes.cardTitle}>{ professor.tname }</div>
                    <div className={classes.badge}>導師</div>
                  </div>
                )
                : (
                  <div className={classes.cardTitle}>{ professor.tname }</div>
                )
            }
            <div className={classes.cardText}>
              <div>
                已收專題人數：
                { professor.scount }
                { professor.scount >= 7 && <font color='#a52a2a'>（名額已滿）</font> }
              </div>
              <div>研究領域：{ professor.expertise }</div>
              <div>Email：{ professor.email }</div>
            </div>
          </Grid>
          <Grid item xs={2}>
            <div className={classes.buttonGroup}>
              <RwdIconButton professor={professor} />
              <IconButton
                className={
                  classnames(
                    classes.expand,
                    { [classes.expandOpen]: this.state.expanded }
                  )
                }
                onClick={this.handleExpandClick}
                aria-expanded={this.state.expanded}
                aria-label='Show more'
              >
                <ExpandMoreIcon />
              </IconButton>
            </div>
          </Grid>
          
          <Grid item xs={12}>
            <Collapse in={this.state.expanded} timeout='auto' unmountOnExit>
              <Divider />
              <div className={classes.cardText} style={{ marginTop: '10px', marginBottom: '20px' }}>
                經歷：<br />
                { professor.info === '' ? '尚無資料' : professor.info }
              </div>
            </Collapse>
          </Grid>
        </Grid>
      </div>
    )
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Index)
