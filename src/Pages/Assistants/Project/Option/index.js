import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'

import { IconButton } from '@material-ui/core'
import MailIcon from '@material-ui/icons/Mail';
import CloudUploadIcon from '@material-ui/icons/CloudUpload'; 

import { 
  projectHandleChange,
  fetchData
} from '../../../../Redux/Assistants/Actions/Project'


import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import Tooltip from '@material-ui/core/Tooltip'

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
    top: 20,
    left: 'calc(100vw - 450px)'
  },
  options: {
    background: '#f5f5f5',
    width: '100%',
    zIndex: 20,
    top: 55,
    marginLeft: 58,
    paddingTop: 85,
    left: 0,
    position: 'fixed'
    // borderBottom: '1px solid rgba(0, 0, 0, 0.34)'
  },
  tooltip: {
    fontSize: 15
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

  showLeftOptions() {
    const { Project, classes } = this.props;
    switch (Project.index) {
      case 1:
        return ;
      case 2:
        return (
        <div>
          <Tooltip 
            title={"寄信提醒"} 
            placement="top" 
            classes={{ tooltip: classes.tooltip }}
          >
            <IconButton>
              <MailIcon />
            </IconButton>
          </Tooltip>
        </div>
        );
      case 3:

        return (
          <div>
            <Tooltip 
              title={"寄信提醒"} 
              placement="top" 
              classes={{ tooltip: classes.tooltip }}
            >
              <IconButton>
                <MailIcon />
              </IconButton>
            </Tooltip>

            <Tooltip 
              title={"上傳選課資料"} 
              placement="top" 
              classes={{ tooltip: classes.tooltip }}
            >
              <IconButton>
                <CloudUploadIcon />
              </IconButton>
            </Tooltip>
          </div>
        )
        break;
    }
  }

  showRightOptions() {
    const { classes, Project } = this.props;
    return (
      <div className={classes.sideIcon2}>
      {
        rightMenuItem(classes, Project.year, '學年', 
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
        )
      }
      {
        rightMenuItem(classes, Project.semester, '學期', 
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
        )
      }
      {
        rightMenuItem(classes, Project.first_second, '課程名稱', 
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
        )
      }
    </div>
    )
  }


  render() {
    const { classes } = this.props;
    return (
      <div className={ classes.options }>
        {this.showLeftOptions()}
        {this.showRightOptions()}
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