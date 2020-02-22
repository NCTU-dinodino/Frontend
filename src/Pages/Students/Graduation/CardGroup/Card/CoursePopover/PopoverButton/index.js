
import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Popover } from '@material-ui/core'
import { FlatButton } from 'material-ui'
import { MuiThemeProvider } from 'material-ui/styles'

const styles = theme => ({
  buttonWrapper: {
    margin: '0 1px 6px 1px',
    height: 32
  },
  popoverContent: {
    margin: theme.spacing.unit * 2,
    width: 250
  },
  flatButton: {
    transition: 'background .2s linear',
    overflow: 'hidden',
    borderRadius: 2,
    width: 140,
    [theme.breakpoints.down('sm')]: {
      width: 100
    }
  }
})

class Index extends React.Component {
  render () {
    const { label, backgroundColor, children, classes } = this.props
    const { anchorEl } = this.props

    return (
      <div>
        <div className={classes.buttonWrapper}>
          <MuiThemeProvider>
            <FlatButton
              className={classes.flatButton}
              hoverColor='#80b0d9'
              backgroundColor={backgroundColor}
              labelStyle={{
                padding: 5,
                color: '#fcfcfc',
                fontSize: '1em',
                fontWeight: 300,
                letterSpacing: 1
              }}
              label={label}
              onClick={this.props.onOpen}
            />
          </MuiThemeProvider>
        </div>

        <Popover
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          onClose={this.props.onClose}
        >
          <div className={classes.popoverContent}>
            {children}
          </div>
        </Popover>
      </div>
    )
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Index)
