import React from 'react'
import { connect } from 'react-redux'
import { Grid } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import ProjectTile from './Tile'
import Professor from '../Professor'
import { ResponsiveContainer } from '../../../Components/Responsive'
import { getProjects, newProjectReset, deleteProjectReset } from '../../../Redux/Students/Actions/Project'
import { FETCHING_STATUS } from '../../../Utils/constant'

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginBottom: '50px',
    textAlign: 'center'
  },
  divider: {
    width: '100%',
    textAlign: 'center',
    fontSize: 'large',
    color: '#6C6C6C',
    borderBottom: '1px solid #d2d2d2',
    lineHeight: '0.1em',
    margin: '40px 0 25px'
  },
  gridList: {
    width: 1000,
    opacity: 1,
    overflowY: 'auto'
  },
  title: {
    fontSize: '20px'
  }
}

class Index extends React.Component {
  componentDidMount () {
    this.props.getProjects()
    // window.alert('請注意，本學期專題改由紙本申請')
  }

  componentDidUpdate (prevProps) {
    const { newResponse, newStatus, deleteStatus } = this.props
    
    if (newStatus !== prevProps.newStatus) {
      if (newStatus === FETCHING_STATUS.DONE) {
        this.props.getProjects()
        this.props.newProjectReset()
        window.alert('申請成功!')
      }
      else if (newStatus === FETCHING_STATUS.ERROR) {
        let messages = '申請失敗!'
        newResponse.forEach((response) => {
          switch (response.status) {
            case 3:
              messages += `\n${response.student_id} 未修過專題一`
              break
            case 4:
              messages += `\n${response.student_id} 本學期重複提交申請`
              break
            case 5:
              messages += `\n${response.student_id} 專題一和專題二皆只能修一次`
              break
            case 6:
              messages += `\n${response.student_id} 未修過專題一`
              break
            case 7:
              messages += `\n${response.student_id} 本學期重複提交申請`
              break
            default:
              break
          }
        })

        window.alert(messages)
      }
    }
    if (deleteStatus !== prevProps.deleteStatus) {
      if (deleteStatus === FETCHING_STATUS.DONE) {
        this.props.getProjects()
        this.props.deleteProjectReset()
      }
      else if (deleteStatus === FETCHING_STATUS.ERROR) {
        window.alert('刪除失敗!')
      }
    }
  }

  render () {
    const { classes, projects } = this.props

    return (
      <ResponsiveContainer justify='center'>
        <div className={classes.divider}>
          <p className={classes.title}>專題列表</p>
        </div>
        <Grid item xs={12} md={10} lg={8}>
          {
            projects.map((project, index) => (
              <ProjectTile project={project} key={index} />
            ))
          }
        </Grid>
        <div className={classes.divider}>
          <p className={classes.title}>教授列表</p>
        </div>
        <Grid item xs={12} md={10} lg={10} style={{ marginBottom: '50px' }}>
          <Professor />
        </Grid>
      </ResponsiveContainer>
    )
  }
}

const mapStateToProps = (state) => ({
  projects: state.Student.Project.list.data,
  newResponse: state.Student.Project.new.data,
  newStatus: state.Student.Project.new.status,
  deleteStatus: state.Student.Project.delete.status
})
const mapDispatchToProps = (dispatch) => ({
  getProjects: () => dispatch(getProjects()),
  newProjectReset: () => dispatch(newProjectReset()),
  deleteProjectReset: () => dispatch(deleteProjectReset())
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Index))
