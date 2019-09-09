
import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import {
  getGraduationInfo,
  getGraduationInfoAssistantVersion
} from '../../../../../Redux/Students/Actions/Graduation'

const styles = theme => ({
  root: {
    fontFamily: 'Noto Sans CJK TC',
    letterSpacing: 1
  }
})

class Index extends React.Component {
  constructor (props) {
    super(props)
    this.professionalMenuOpen = this.professionalMenuOpen.bind(this)
    this.professionalMenuClose = this.professionalMenuClose.bind(this)
    this.professionalMenuSelect = this.professionalMenuSelect.bind(this)
    this.state = {
      open: false,
      expanded: true,
      anchorEl: null
    }
  }

  professionalMenuOpen (event) {
    event.stopPropagation()
    this.setState({
      anchorEl: event.currentTarget
    })
  }

  professionalMenuClose (event) {
    event.stopPropagation()
    this.setState({
      anchorEl: null
    })
  }

  professionalMenuSelect (field, event) {
    event.stopPropagation()
    let idCard = this.props.idCard
    if (this.props.assis) {
      this.props.getGraduationInfoAssistantVersion(idCard.id, idCard.sname, idCard.program, field)
    }
    else {
      this.props.getGraduationInfo({ professional_field: field })
    }
  }

  render () {
    const { classes } = this.props
    const professionalGroup = ['網多組(網)', '網多組(多)', '資工組', '資電組']

    return (
      <Fragment>
        <Button
          variant='outlined'
          aria-owns={this.state.anchorEl ? 'simple-menu' : undefined}
          aria-haspopup='true'
          onClick={this.professionalMenuOpen}
          disabled={this.props.reviewCheck !== 0}
        >
          {
            !isNaN(this.props.professionalField)
              ? professionalGroup[this.props.professionalField]
              : '畢業組別選擇'
          }
        </Button>
        <Menu
          id='simple-menu'
          anchorEl={this.state.anchorEl}
          open={Boolean(this.state.anchorEl)}
          onClose={this.professionalMenuClose}
          className={classes.root}
        >
          <MenuItem onClick={(e) => this.professionalMenuSelect(0, e)}>
            網多組(網)
          </MenuItem>
          <MenuItem onClick={(e) => this.professionalMenuSelect(1, e)}>
            網多組(多)
          </MenuItem>
          <MenuItem onClick={(e) => this.professionalMenuSelect(2, e)}>
            資工組
          </MenuItem>
          <MenuItem onClick={(e) => this.professionalMenuSelect(3, e)}>
            資電組
          </MenuItem>
        </Menu>
      </Fragment>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  studentIdcard: state.Student.User.studentIdcard,
  idCard: state.Student.Graduation.assistant.idCard,
  professionalField: state.Student.Graduation.getReview.professionalField,
  reviewCheck: state.Student.Graduation.getReview.check
})

const mapDispatchToProps = (dispatch) => ({
  getGraduationInfo: (payload) => dispatch(getGraduationInfo(payload)),
  getGraduationInfoAssistantVersion: (id, sname, program, field) => dispatch(getGraduationInfoAssistantVersion(id, sname, program, field))
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Index))
