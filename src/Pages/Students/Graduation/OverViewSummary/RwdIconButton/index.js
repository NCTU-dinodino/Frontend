
import React from 'react'
import { IconButton, Menu } from '@material-ui/core'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import SendReview from './SendReview'
import Print from './Print'
import ResetCourse from './ResetCourse'

class Index extends React.Component {
  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.state = {
      anchorEl: null
    }
  }

  handleClick (event) {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleClose () {
    this.setState({ anchorEl: null })
  }

  render () {
    const { anchorEl } = this.state

    return (
      <div>
        <IconButton
          aria-label='More'
          aria-owns={anchorEl ? 'long-menu' : null}
          aria-haspopup='true'
          onClick={this.handleClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id='long-menu'
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
          PaperProps={{
            style: {
              maxHeight: 200,
              width: 180
            }
          }}
        >
          <SendReview />
          <Print />
          <ResetCourse />
        </Menu>
      </div>
    )
  }
}

export default Index
