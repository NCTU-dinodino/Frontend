import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import SendProject from '../SendProject'
import ReviewProject from '../ReviewProject/'

const ITEM_HEIGHT = 48

class LongMenu extends React.Component {
  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.state = { anchorEl: null }
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
          aria-owns={anchorEl && 'long-menu'}
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
              maxHeight: ITEM_HEIGHT * 4.5,
              width: 200
            }
          }}
        >
          <SendProject professor={this.props.professor} firstSecond={1} />
          <SendProject professor={this.props.professor} firstSecond={2} />
          <ReviewProject professor={this.props.professor} />
        </Menu>
      </div>
    )
  }
}

export default LongMenu
