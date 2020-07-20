
import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import {
  Collapse,
  IconButton,
  Avatar,
  Divider,
  Badge,
  Grid,
  Hidden
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { withStyles } from '@material-ui/core/styles'
import RwdIconButton from './RwdIconButton'
import pic from '../../../../Resources/default_profile.jpg'

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
  pic: {
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
    const { classes } = this.props
    const photo = this.props.data.photo ? this.props.data.photo : pic

    return (
      <div className={classes.cardWrapper}>
        <Grid container>
          <Hidden mdDown>
            <Grid item md={2}>
              <img className={classes.pic} src={photo} alt='' />
            </Grid>
          </Hidden>
          <Hidden lgUp>
            <Grid item xs={2} md={1}>
              <Avatar alt='picture' src={photo} />
            </Grid>
          </Hidden>
          <Grid item xs={8}>
            {
              this.props.isMentor
                ? (
                  <Badge color='primary' badgeContent={'導師'}>
                    <div className={classes.cardTitle}>{ this.props.data.tname }</div>
                  </Badge>
                )
                : (
                  <div className={classes.cardTitle}>{ this.props.data.tname }</div>
                )
            }
            <div className={classes.cardText}>
              <div>
                已收專題人數：
                { this.props.data.scount }
                { this.props.data.scount >= 7 && <font color='#a52a2a'>（名額已滿）</font> }
              </div>
              <div>研究領域：{ this.props.data.expertise }</div>
              <div>Email：{ this.props.data.email }</div>
            </div>
          </Grid>
          <Grid item xs={2}>
            <div className={classes.buttonGroup}>
              <RwdIconButton profile={this.props.data} />
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
                { this.props.data.info === '' ? '尚無資料' : this.props.data.info }
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

const mapStateToProps = (state, ownProps) => ({
  isMentor: state.Student.Professor.mentor === ownProps.data.tname
})
const mapDispatchToProps = (dispatch, ownProps) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Index))
