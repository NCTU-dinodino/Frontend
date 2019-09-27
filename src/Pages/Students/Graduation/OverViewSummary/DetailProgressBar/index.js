
import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { Grid, Hidden } from '@material-ui/core'
import AnimatedProgress from '../../../../../Components/AnimatedProgress'

const styles = theme => ({
  overview: {
    clear: 'both'
  },
  overviewCourse: {
    fontSize: '0.8em',
    color: '#7c7c7c'
  },
  showCourseOverview: {
    margin: '3px 0',
    fontWeight: 300,
    color: '#7c7c7c'
  },
  progressBar: {
    display: 'inline-block',
    marginRight: 5
  },
  progressBar2: {
    display: 'inline-block',
    marginRight: 25
  }
})

const ProgressBar = withStyles(styles)(({ classes, title, complete, require, unit}) => (
  <Grid item sm={3} className={classes.overviewCourse}>
    <div className={classes.showCourseOverview}>
      <div className={classes.progressBar}>{ title }</div>
      <font size={5} color='#338d68'>{ complete }</font>/
      <div className={classes.progressBar}>{ require }</div>
      { unit }
      <AnimatedProgress value={complete / require * 100} />
    </div>
  </Grid>
))

const NoProgressBar = withStyles(styles)(({ classes, title, complete, unit}) => (
  <Grid item sm={3} className={classes.overviewCourse}>
    <div className={classes.showCourseOverview}>
      <div className={classes.progressBar}>{ title }</div>
      <font size={5} color='#338d68'>{ complete }</font>
      <div className={classes.progressBar} />
      { unit }
    </div>
  </Grid>
))

const Index = withStyles(styles)(({ classes, overview }) => ( 
  <Hidden only='xs'>
    <Grid container spacing={8}>
      <ProgressBar
        title='共同必修'
        unit='學分'
        complete={overview.compulsory}
        require={overview.compulse_require}
      />
      <ProgressBar
        title='專業選修'
        unit='學分'
        complete={overview.pro}
        require={overview.pro_require}
      />
      <ProgressBar
        title='其他選修'
        unit='學分'
        complete={overview.other}
        require={overview.other_require}
      />
      <ProgressBar
        title={
          <div>
            <div className={classes.progressBar2}>外</div>語
          </div>
        }
        unit='學分'
        complete={overview.language}
        require={overview.language_require}
      />
      <ProgressBar
        title='通識(舊制)'
        unit='學分'
        complete={overview.general}
        require={overview.general_require}
      />
      <ProgressBar
        title='通識(新制)'
        unit='學分'
        complete={overview.general_new}
        require={overview.general_new_require}
      />
      <ProgressBar
        title={
          <div>
            <div className={classes.progressBar2}>體</div>育
          </div>
        }
        unit='門'
        complete={overview.pe}
        require={overview.pe_require}
      />
      <ProgressBar
        title='藝文賞析'
        unit='門'
        complete={overview.art}
        require={overview.art_require}
      />
      <ProgressBar
        title='服務學習'
        unit='門'
        complete={overview.service}
        require={overview.service_require}
      />
      <ProgressBar
        title='英文授課'
        unit='門'
        complete={overview.english}
        require={overview.english_require}
      />
      <NoProgressBar
        title='抵免研究所課程'
        unit='學分'
        complete={overview.graduate}
      />
      <NoProgressBar
        title='雙主修、輔系、學分學程'
        unit='學分'
        complete={overview.dmajor_minor_program}
      />
    </Grid>
  </Hidden>
))

const mapStateToProps = (state) => ({
  overview: state.Student.Graduation.detail.overview
})
const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(Index)
