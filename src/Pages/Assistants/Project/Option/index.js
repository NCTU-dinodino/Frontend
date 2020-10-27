import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'

import { Tooltip, IconButton } from '@material-ui/core'
import { 
  projectHandleChange,
  fetchData
} from '../../../../Redux/Assistants/Actions/Project'

import Check from '@material-ui/icons/CheckBox'
import CheckNone from '@material-ui/icons/CheckBoxOutlineBlank'

import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'

const styles = theme => ({
  cssLabel: {
    fontSize: 15,
    '&$cssFocused': {
      color: '#68BB66'
    },
    fontWeight: 'normal'
  },
  cssFocused: {},
  cssUnderline: {
    '&:after': {
      borderBottomColor: '#68BB66'
    },
  },
  sideIcon2: {
    position: 'absolute',
    top: 60,
    left: 'calc(100vw - 450px)'
  },
  options: {
    background: '#f5f5f5',
    width: '100%',
    zIndex: 20,
    top: 0,
    marginLeft: 58,
    paddingTop: 60,
    paddingBottom: 5,
    left: 0,
    position: 'fixed'
    // borderBottom: '1px solid rgba(0, 0, 0, 0.34)'
  },
});

const rightMenuItem = (classes, value, label, onChange, menuItems) => {
  return (
    <FormControl style={{ width: '100px', margin: '0px 5px' }}>
      <InputLabel
        FormLabelClasses={{ root: classes.cssLabel, focused: classes.cssFocused }}
      >
        {label}
      </InputLabel>
      <Select
        input={ <Input classes={{ underline: classes.cssUnderline }} /> }
        value={ value }
        style={{ fontSize: '15px' }}
        onChange={ onChange }
      > {
        menuItems.map( (menuItem, key) => 
          <MenuItem key={key} value={menuItem.value} style={{ fontSize: '20px' }} >{menuItem.label}</MenuItem>
        )
      }
      </Select>
    </FormControl>
  )
}

class index extends React.Component {
  selectAll = () => {
    const { Project } = this.props;
    if (Project.selectAll) {
      this.props.projectHandleChange({select: [], selectAll: false})
    } else {
      this.props.projectHandleChange({select: Project.curdata, selectAll: true})
    }
  }
  render() {
    const { classes, Project } = this.props;
    return (
      <div className={ classes.options }>
        <Tooltip 
          title={Project.selectAll ? '取消全選' : '全選'} 
          placement='top'
          classes={{
            tooltip: classes.tooltip
          }}
        >
          <IconButton 
            className={classes.sideIcon}
            onClick={this.selectAll}
          >
            {Project.selectAll ? <Check /> : <CheckNone /> }
          </IconButton>
        </Tooltip>
        <div className={classes.sideIcon2}>
          {rightMenuItem(classes, Project.year, '學年', 
            (event) => {
              this.props.projectHandleChange({ 
                year: event.target.value 
              })
              this.props.fetchData({
                year: event.target.value,
                semester: Project.semester,
                first_second: Project.first_second
              })
            },
            [{value: "107", label: "107"},
             {value: "108", label: "108"},
             {value: "109", label: "109"}]
          )}
          {rightMenuItem(classes, Project.semester, '學期', 
            (event) => {
              this.props.projectHandleChange({ 
                semester: event.target.value 
              })
              this.props.fetchData({
                year: Project.year,
                semester: event.target.value,
                first_second: Project.first_second
              })
            },
            [{value: "1", label: "上學期"},
             {value: "2", label: "下學期"}],
          )}
          {rightMenuItem(classes, Project.first_second, '課程名稱', 
            (event) => {
              this.props.projectHandleChange({ 
                first_second: event.target.value 
              })
              this.props.fetchData({
                year: Project.year,
                semester: Project.semester,
                first_second: event.target.value
              })
            },
            [{value: "1", label: "專題一"},
             {value: "2", label: "專題二"}],
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  Project: state.Assistant.Project
})

const mapDispatchToProps = (dispatch) => ({
  projectHandleChange: (payload) => dispatch(projectHandleChange(payload)),
  fetchData: (payload) => dispatch(fetchData(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(index))