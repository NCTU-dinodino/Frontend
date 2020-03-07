
import React from 'react'
import { NavItem } from 'react-bootstrap'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  navButton: {
    [theme.breakpoints.up('md')]: {
      fontSize: 12,
      padding: '8px 12px 10px',
      textAlign: 'center',
      width: 80,
      '&>a': {
        padding: '0 !important'
      }
    },
  },
  icon: {
    width: '100%',
    fontSize: 19,
    height: 24,
    transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms'
  },
  iconSelected: {
    color: '#68BB66'
  },
  label: {
    lineHeight: '15px',
    transition: 'color 0.3s, font-size 0.3s'
  },
  labelSelected: {
    fontSize: 14,
    color: '#68BB66'
  }
})

const NavButton = ({ label, icon, selected, onClick, classes }) => (
  <NavItem className={classes.navButton} onClick={onClick}>
    <i
      className={`${icon} ${classes.icon} ${selected && classes.iconSelected}`}
      aria-hidden='true'
    />
    <div className={`${classes.label} ${selected && classes.labelSelected}`}>
      {label}
    </div>
  </NavItem>
)

export default withStyles(styles)(NavButton)
