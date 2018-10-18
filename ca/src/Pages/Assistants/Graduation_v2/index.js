import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'

import GraduationList from './GraduationList'
import GraduationListPanel from './GraduationListPanel'
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Chip from '@material-ui/core/Chip';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FilterList from '@material-ui/icons/FilterList';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Done from '@material-ui/icons/Done';
import Clear from '@material-ui/icons/Clear';
import QueryBuilder from '@material-ui/icons/QueryBuilder';
import FormControl from '@material-ui/core/FormControl';
import grey from '@material-ui/core/colors/grey';
import green from '@material-ui/core/colors/green';
import blue from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/red';
import FirstPage from '@material-ui/icons/FirstPage';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import LastPage from '@material-ui/icons/LastPage';
import { fetchGraduateList } from '../../../Redux/Assistants/Actions/Graduation_v2/index'

const styles = theme => ({
  container: {
    width: '80%',
    margin: '0 auto',
    marginBottom: '30px'
  },
  cssLabel: {
    fontSize: 20,
    '&$cssFocused': {
      color: 'rgb(0, 188, 212)'
    },
  },
  cssFocused: {},
  cssUnderline: {
    '&:after': {
      borderBottomColor: 'rgb(0, 188, 212)'
    },
  },
  chip: {
    margin: '10px',
    marginTop: '20px',
    marginBottom: '20px',
    fontSize: '20px',
    padding: '20px'
  },
  icon: {
    fontSize: '40px',
    display: 'inline-flex',
    verticalAlign: 'middle',
    color: grey[600],
    '&:hover': {
      color: grey[900],
      transition: 'color 0.5s'
    },
    transition: 'color 0.3s',
    marginRight: '10px',
    marginLeft: '10px'
  },
})

const mapStateToProps = (state) => ({
  students: state.Assistant.Graduation.students
})

const mapDispatchToProps = (dispatch) => ({
  fetch_graduate_list: (post_item) => dispatch(fetchGraduateList(post_item))
})

class index extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      filter_status: [false, false, false],
      input: '',
      open_filter: false,
      page: 0,
      studentsPerPage: 8,
      grade: '二'
    }
    props.fetch_graduate_list( {grade: this.state.grade} )
    console.log("PROPS_STUDENTS")
    console.log(props.students)
  }

  filter = (students) => {
    const { input, filter_status } = this.state
    return (
      students.filter( (student) =>
        (    input === ''
          || student.name.toLowerCase().search(input.toLowerCase()) !== -1
          || student.id.search(input) !== -1
        )
        &&
        (
             !filter_status.reduce( (haveTrue, value) => haveTrue || value, false)
          || filter_status[parseInt(student.detail.status)]
        )
      )
    )
  }

  toggleFilter = target => {
    this.setState({ filter_status: this.state.filter_status.map((value, index) => target === index ? !value : value ), page: 0 })
  }

  render() {

    const { classes, students, fetch_graduate_list } = this.props
    const { filter_status, open_filter, input, page, studentsPerPage, grade } = this.state



    return (
      <div className = { classes.container } >
        <div className = 'row' style = {{ marginTop: '30px', marginBottom: '20px' }}>
          <div className = 'col-md-2 col-lg-2'>
          </div>
          <div className = 'col-md-5 col-lg-5 col-xs-12' style = {{ display: 'flex' }} >
            <FilterList className = { classes.icon } onClick = { () => this.setState({ open_filter: true }) } />
            <Dialog onClose = { () => this.setState({ open_filter: false })} open = { open_filter } >
              <DialogTitle><div style = {{ fontSize: '30px' }} >畢業預審狀況</div></DialogTitle>
              <div style = {{ display: 'flex' }}>
                <Chip
                  label = {
                    <span>
                      <Clear style = {{ fontSize: '30px', verticalAlign: 'middle', marginRight: '5px' }} />
                      <div style = {{ display: 'inline', verticalAlign: 'middle' }} >未達標</div>
                    </span>
                  }
                  className = { classes.chip }
                  onClick = { () => this.toggleFilter(0) }
                  style = {{ background: filter_status[0] ? red[300] : null }}
                />
                <Chip
                  label = {
                    <span>
                      <QueryBuilder style = {{ fontSize: '30px', verticalAlign: 'middle', marginRight: '5px' }} />
                      <div style = {{ display: 'inline', verticalAlign: 'middle' }} >將達標</div>
                    </span>
                  }
                  className = { classes.chip }
                  onClick = { () => this.toggleFilter(1) }
                  style = {{ background: filter_status[1] ? blue[300] : null }}
                />
                <Chip
                  label = {
                    <span>
                      <Done style = {{ fontSize: '30px', verticalAlign: 'middle', marginRight: '5px' }} />
                      <div style = {{ display: 'inline', verticalAlign: 'middle' }} >已達標</div>
                    </span>
                  }
                  className = { classes.chip }
                  onClick = { () => this.toggleFilter(2) }
                  style = {{ background: filter_status[2] ? green[300] : null }}
                />
              </div>
            </Dialog>
            <FormControl style = {{ width: '100%', flex: 1 }} >
              <InputLabel
                FormLabelClasses={{
                  root: classes.cssLabel,
                  focused: classes.cssFocused,
                }}
              >
                搜尋學生 姓名 / 學號
              </InputLabel>
              <Input
                classes={{
                  underline: classes.cssUnderline,
                }}
                onChange = { (event) => { this.setState({ input: event.target.value, page: 0 }), console.log(students) }  }
                value = { input }
              />
            </FormControl>
          </div>
          <div className = 'col-md-3 col-lg-3 col-xs-12' style = {{ display: 'flex' }} >
            <FormControl style = {{ width: '100%' }}>
              <InputLabel
                FormLabelClasses={{
                  root: classes.cssLabel,
                  focused: classes.cssFocused,
                }}
              >
                學期
              </InputLabel>
              <Select
                input = {
                  <Input
                    classes={{
                      underline: classes.cssUnderline,
                    }}
                  />
                }
                value = { grade }
                style = {{ fontSize: '15px' }}
                onChange={
                  (event) => {
                    fetch_graduate_list( {grade: event.target.value} )
                    this.setState({ grade: event.target.value, page: 0 })
                  }
                }
              >
                <MenuItem value = { '一' } style = {{ fontSize: '20px' }} >一年級</MenuItem>
                <MenuItem value = { '二' } style = {{ fontSize: '20px' }} >二年級</MenuItem>
                <MenuItem value = { '三' } style = {{ fontSize: '20px' }} >三年級</MenuItem>
                <MenuItem value = { '四' } style = {{ fontSize: '20px' }} >四年級</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
        {/*
        <GraduationList students = {
          this.filter(students)
              .slice(page * studentsPerPage, page * studentsPerPage + studentsPerPage)
         }
         page
        />
        */}
        {
          <GraduationListPanel students = {
            this.filter(students)
                .slice(page * studentsPerPage, page * studentsPerPage + studentsPerPage)
              }
           />
        }
        <div style = {{ textAlign: 'center', marginTop: '10px', marginBottom: '50px' }} >
          <FirstPage className = { classes.icon } onClick = { () => this.setState({ page: 0 }) } />
          <ChevronLeft className = { classes.icon } onClick = { () => this.setState({ page: Math.max(0, page - 1) }) } />
          <span style = {{
            display: 'inline-flex',
            verticalAlign: 'middle',
            fontSize: '20px',
            marginRight: '20px',
            marginLeft: '20px'
          }}>{page + 1} / { Math.max(1, Math.ceil(this.filter(students).length / studentsPerPage)) }</span>
          <ChevronRight className = { classes.icon } onClick = { () => this.setState({ page: Math.max(0, Math.min(Math.ceil(this.filter(students).length / studentsPerPage) - 1, page + 1)) }) } />
          <LastPage className = { classes.icon } onClick = { () => this.setState({ page: Math.max(0, Math.ceil(this.filter(students).length / studentsPerPage) - 1) }) } />
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(index))
