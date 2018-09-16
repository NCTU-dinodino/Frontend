import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Chip from '@material-ui/core/Chip';
import FirstPage from '@material-ui/icons/FirstPage';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import LastPage from '@material-ui/icons/LastPage';
import grey from '@material-ui/core/colors/grey';
import blue from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/red';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FilterList from '@material-ui/icons/FilterList';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import LinearProgress from '@material-ui/core/LinearProgress';
import Badge from '@material-ui/core/Badge';
import Tooltip from '@material-ui/core/Tooltip';
import yellow from '@material-ui/core/colors/yellow';
import green from '@material-ui/core/colors/green';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

import { fetchTeachers } from '../../../../Redux/Assistants/Actions/Project_v3/Teacher'

const STATE_COLOR = [ red['A100'], blue[300] ]
const FILTER_STATUS_COLOR = [red['A100'], green[300], yellow[300]]

const styles = theme => ({
  chip: {
    margin: '10px',
    fontSize: '15px',
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
  iconWithColor: {
    fontSize: '40px',
    display: 'inline-flex',
    verticalAlign: 'middle',
    color: 'rgb(0, 188, 212)',
    '&:hover': {
      color: 'rgb(0, 168, 192)',
      transition: 'color 0.5s'
    },
    transition: 'color 0.3s',
    marginRight: '10px',
    marginLeft: '10px'
  },
  cssLabel: {
    fontSize: 15,
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
  tooltip: {
    fontSize: 15
  },
  expansionPanelSummaryRootPending: {
    background: yellow[100]
  }
})

class index extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      expanded: null,
      page: 0,
      number_per_page: 10,
      input: '',
      grade: "04",
      semester: "106-2",
      filter_status: [false, false, false],
      open_filter: false
    }
    const { semester, grade } = this.state
    this.props.fetch_teachers({semester, grade})
  }

  filter = (teachers) => {
    const { input, filter_status } = this.state
    return (
      teachers.filter( (teacher) =>
        (   input === ''
         || teacher.professor_name.toLowerCase().search(input.toLowerCase()) !== -1
        )
        &&
        (
            !filter_status.reduce( (haveTrue, value) => haveTrue || value, false)
         || filter_status[parseInt(teacher.professor_status)]
        )
      )
    )
  }

  toggleFilter = target => {
    this.setState({ filter_status: this.state.filter_status.map((value, index) => target === index ? !value : value ), page: 0 })
  }

  render() {

    const { classes, teachers, professor_name, fetch_teachers } = this.props
    const { expanded, page, number_per_page, input, grade, semester, open_filter, filter_status } = this.state

    return (
      <div style = {{ marginBottom: '60px', width: '60%', margin: '0 auto', marginTop: '20px' }} >
        <div className = 'row' >
          <div className = 'col-md-4 col-lg-4 col-xs-12' style = {{ display: 'flex' }} >
            <FilterList className = { classes.icon } onClick = { () => this.setState({ open_filter: true }) } />
            <Dialog onClose = { () => this.setState({ open_filter: false })} open = { open_filter } >
              <DialogTitle><div style = {{ fontSize: '25px' }} >專題申請狀況</div></DialogTitle>
              <div style = {{ display: 'flex' }}>
              {
                ['沒有新專題', '有新增專題', '有審核中專題'].map( (title, index) => (
                  <Chip label = { title } className = { classes.chip } onClick = { () => this.toggleFilter(index) } style = {{ background: filter_status[index] ? FILTER_STATUS_COLOR[index] : null }} />
                ))
              }
              </div>
            </Dialog>
            <FormControl style = {{ width: '100%', marginBottom: '10px', flex: 1 }}>
              <InputLabel
                FormLabelClasses={{
                  root: classes.cssLabel,
                  focused: classes.cssFocused,
                }}
              >
                搜尋教授 姓名
              </InputLabel>
              <Input
                classes={{
                  underline: classes.cssUnderline,
                }}
                onChange = { (event) => this.setState({ input: event.target.value, page: 0 }) }
                value = { input }
              />
            </FormControl>
          </div>
          <div className = 'col-md-4 col-lg-4 col-xs-12' >
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
                value = { this.state.semester }
                style = {{ fontSize: '15px' }}
                onChange={
                  (event) => {
                    fetch_teachers({ semester: event.target.value, grade })
                    this.setState({ semester: event.target.value, page: 0 })
                  }
                }
              >
                <MenuItem value = { "all" } style = {{ fontSize: '20px' }} >全部學期</MenuItem>
                <MenuItem value = { "106-1" } style = {{ fontSize: '20px' }} >106上學期</MenuItem>
                <MenuItem value = { "106-2" } style = {{ fontSize: '20px' }} >106下學期</MenuItem>
                <MenuItem value = { "107-1" } style = {{ fontSize: '20px' }} >107上學期</MenuItem>
                <MenuItem value = { "107-2" } style = {{ fontSize: '20px' }} >107下學期</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className = 'col-md-4 col-lg-4 col-xs-12' >
            <FormControl style = {{ width: '100%' }}>
              <InputLabel
                FormLabelClasses={{
                  root: classes.cssLabel,
                  focused: classes.cssFocused,
                }}
              >
                系級
              </InputLabel>
              <Select
                input = {
                  <Input
                    classes={{
                      underline: classes.cssUnderline,
                    }}
                  />
                }
                value = { this.state.grade }
                style = {{ fontSize: '15px' }}
                onChange={
                  (event) => {
                    fetch_teachers({ grade: event.target.value, semester })
                    this.setState({ grade: event.target.value, page: 0 })
                  }
                }
              >
                {[...Array(9)].map((x, i) => <MenuItem value = { "0" + (i + 1) } style = {{ fontSize: '20px' }} >{"0" + (i + 1)}</MenuItem>)}
              </Select>
            </FormControl>
          </div>
        </div>
        <div style = {{ minHeight: '570px' }} >
          {this.filter(teachers).slice(page * number_per_page, (page + 1) * number_per_page)
          .map( ( teacher, index ) => {
            return (
              <div style = {{ margin: '5px auto', width: '100%' }}>
                <ExpansionPanel expanded = { expanded === index } onChange = { () => this.setState({ expanded: expanded === index ? null : index }) } >
                  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} classes = {{ root: teacher.professor_status === "1" ? classes.expansionPanelSummaryRootPending : classes.expansionPanelSummaryRoot }} >
                    <div style = {{ width: '100%', display: 'flex' }} >
                      <div style = {{ fontSize: 20, flex: 0.2, textAlign: 'center', color: 'black' }} >{ teacher.professor_name }</div>
                      <LinearProgress variant="determinate"
                        value = { teacher.gradeCnt / 7 * 100 }
                        style = {{ flex: 0.6, margin: '10px auto' }}
                      />
                      <div style = {{ fontSize: 20, flex: 0.2, textAlign: 'center', color: 'black'  }} >{ teacher.gradeCnt } 人</div>
                    </div>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                  <div style = {{ width: '100%' }}>
                    <div style = {{ fontWeight: 'bold', fontSize: '30px' }}>接受列表</div>
                    {
                      teacher.accepted.projects.length !== 0 ?
                        <div style = {{ display: 'block' }}>
                        {
                          teacher.accepted.projects.map( project => {
                            return (
                              <div style = {{ marginBottom: '40px' }} >
                                <hr />
                                <div style = {{ fontSize: 20, color: 'black', fontWeight: 'bold' }} >{ project.title }</div>
                                <br />
                                {
                                  project.students.map( student => (
                                    <Tooltip title = { (student.first_second === "1" ? "專題一" : "專題二") + " " +  project.students[0].semester.substr(0, 3) + (project.students[0].semester[4] === "1" ? "上" : "下")  } placement="top" classes = {{ tooltip: classes.tooltip }} >
                                      <Chip label = { student.id + " " + student.name } className = { classes.chip } style = {{ background: STATE_COLOR[(student.status === "0" ? 0 : 1)] }} />
                                    </Tooltip>
                                  ))
                                }
                              </div>
                            )
                          })
                        }
                        </div>
                        :
                        <div style = {{ width: '100%', display: 'flex', justifyContent: "center" }}>
                          <div style = {{ fontSize: 18, color: grey[500] }} >尚無接受專題</div>
                        </div>
                    }
                    <div style = {{ fontWeight: 'bold', fontSize: '30px' }}>審核列表</div>
                    {
                      teacher.pending.projects.length !== 0 ?
                      <div style = {{ display: 'block' }}>
                      {
                        teacher.pending.projects.map( project => {
                          return (
                            <div style = {{ marginBottom: '40px' }} >
                            <hr />
                            <div style = {{ fontSize: 20, color: 'black', fontWeight: 'bold' }} >{ project.title }</div>
                            <br />
                            {
                              project.students.map( student => (
                                <Chip label = { student.id + " " + student.name } className = { classes.chip } style = {{ background: STATE_COLOR[(student.state === "0" ? 0 : 1)] }} />
                              ))
                            }
                            </div>
                          )
                        })
                      }
                      </div>
                      :
                      <div style = {{ width: '100%', display: 'flex', justifyContent: "center"}}>
                      <div style = {{ fontSize: 18, color: grey[500] }} >尚未有申請的專題</div>
                      </div>
                    }
                    </div>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              </div>
            )
          })}
        </div>
        <div style = {{ textAlign: 'center', marginTop: '10px' }} >
          <FirstPage className = { classes.icon } onClick = { () => this.setState({ page: 0 }) } />
          <ChevronLeft className = { classes.icon } onClick = { () => this.setState({ page: Math.max(0, page - 1) }) } />
          <span style = {{
            display: 'inline-flex',
            verticalAlign: 'middle',
            fontSize: '20px',
            marginRight: '20px',
            marginLeft: '20px'
          }}>{page + 1} / { Math.max(1, Math.ceil(this.filter(teachers).length / number_per_page)) }</span>
          <ChevronRight className = { classes.icon } onClick = { () => this.setState({ page: Math.max(0, Math.min(Math.ceil(this.filter(teachers).length / number_per_page) - 1, page + 1)) }) } />
          <LastPage className = { classes.icon } onClick = { () => this.setState({ page: Math.max(0, Math.ceil(this.filter(teachers).length / number_per_page) - 1 )} )} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  teachers: state.Assistant.Project.Teacher.teachers
})

const mapDispatchToProps = (dispatch) => ({
  fetch_teachers: (post_item) => dispatch(fetchTeachers(post_item))
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(index))
