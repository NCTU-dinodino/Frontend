
import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Popover } from '@material-ui/core'
import { FlatButton } from 'material-ui'
import { MuiThemeProvider } from 'material-ui/styles'
import '../../../../../../../node_modules/animate.css/animate.css'

const styles = theme => ({
  button: {
    margin: '0 1px 6px 1px',
    height: 32
  },
  popoverContent: {
    margin: theme.spacing.unit * 2,
    width: 250
  }
})

class Index extends React.Component {
  constructor (props) {
    super(props)
    this.state = { anchorEl: null }
  }

  render () {
    const { label, flash, backgroundColor, mobile, children, classes } = this.props
    const { anchorEl } = this.state

    return (
      <div>
        <div className={`${classes.button} ${flash && 'animated flash'}`}>
          <MuiThemeProvider>
            <FlatButton
              hoverColor='#80b0d9'
              backgroundColor={backgroundColor}
              labelStyle={{
                padding: 5,
                color: '#fcfcfc',
                fontSize: '1em',
                fontWeight: 300,
                letterSpacing: 1
              }}
              style={{
                transition: 'background .2s linear',
                overflow: 'hidden',
                borderRadius: 2,
                width: mobile ? '100px' : '140px'
              }}
              label={label}
              onClick={(e) => this.setState({ anchorEl: e.currentTarget })}
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
          onClose={(e) => this.setState({ anchorEl: null })}
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
