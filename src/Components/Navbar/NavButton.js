
import React from 'react'
import { NavItem } from 'react-bootstrap'
import { withStyles } from '@material-ui/core/styles'
import styles from './styles'

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
