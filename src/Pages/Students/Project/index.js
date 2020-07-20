import React from 'react'
import { connect } from 'react-redux'
import { Grid } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import ProjectTile from './Tile'
import Professor from '../Professor'
import { ResponsiveContainer } from '../../../Components/Responsive'
import { fetchProjects } from '../../../Redux/Students/Actions/Project'

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
    this.props.fetchProjects()
    // window.alert('請注意，本學期專題改由紙本申請')
  }

  render () {
    const { classes } = this.props

    return (
      <ResponsiveContainer justify='center'>
        <div className={classes.divider}>
          <p className={classes.title}>專題列表</p>
        </div>
        <Grid item xs={12} md={10} lg={8}>
          {
            this.props.data.map((tile, index) => (
              <ProjectTile data={tile} key={index} />
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
  data: state.Student.Project.data
})
const mapDispatchToProps = (dispatch) => ({
  fetchProjects: () => dispatch(fetchProjects())
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Index))
