
import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Grid, Hidden } from '@material-ui/core'
import AnimatedProgress from '../../../../../Components/AnimatedProgress'

const styles = theme => ({
  courseGroup: {
    margin: '3px 0',
    fontSize: '0.8em',
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

// 一般類別
const ProgressBar = withStyles(styles)(({ classes, title, acquire, require, unit }) => (
  <Grid item md={4} lg={3}>
    <div className={classes.courseGroup}>
      <div className={classes.progressBar}>{ title }</div>
      <font size={5} color='#338d68'>{ acquire }</font>/
      <div className={classes.progressBar}>{ require }</div>
      { unit }
      <AnimatedProgress value={acquire / require * 100} />
    </div>
  </Grid>
))

// 抵免研究所、雙主修...
const NoProgressBar = withStyles(styles)(({ classes, title, acquire, unit }) => (
  <Grid item md={4} lg={3}>
    <div className={classes.courseGroup}>
      <div className={classes.progressBar}>{ title }</div>
      <font size={5} color='#338d68'>{ acquire }</font>
      <div className={classes.progressBar} />
      { unit }
    </div>
  </Grid>
))

const Index = withStyles(styles)(({ classes, courseDetail }) => ( 
  <Hidden only='xs'>
    <Grid container spacing={8}>
      <ProgressBar
        title='共同必修'
        unit='學分'
        acquire={courseDetail.compulsory && courseDetail.compulsory.acquire}
        require={courseDetail.compulsory && courseDetail.compulsory.require}
      />
      <ProgressBar
        title='專業選修'
        unit='學分'
        acquire={courseDetail.professional && courseDetail.professional.acquire}
        require={courseDetail.professional && courseDetail.professional.require}
      />
      <ProgressBar
        title='其他選修'
        unit='學分'
        acquire={courseDetail.other && courseDetail.other.acquire}
        require={courseDetail.other && courseDetail.other.require}
      />
      <ProgressBar
        title='英文授課'
        unit='門'
        acquire={courseDetail.english && courseDetail.english.acquire}
        require={courseDetail.english && courseDetail.english.require}
      />
      <ProgressBar
        title='通識(舊制)'
        unit='學分'
        acquire={courseDetail.general && courseDetail.general.acquire}
        require={courseDetail.general && courseDetail.general.require}
      />
      <ProgressBar
        title='通識(新制)'
        unit='學分'
        acquire={courseDetail.general_new && courseDetail.general_new.acquire.total}
        require={courseDetail.general_new && courseDetail.general_new.require.total}
      />
      <ProgressBar
        title={
          <div>
            <div className={classes.progressBar2}>外</div>語
          </div>
        }
        unit='學分'
        acquire={courseDetail.language && courseDetail.language.acquire}
        require={courseDetail.language && courseDetail.language.require}
      />
      <ProgressBar
        title={
          <div>
            <div className={classes.progressBar2}>體</div>育
          </div>
        }
        unit='門'
        acquire={courseDetail.pe && courseDetail.pe.acquire}
        require={courseDetail.pe && courseDetail.pe.require}
      />
      <ProgressBar
        title='服務學習'
        unit='門'
        acquire={courseDetail.service && courseDetail.service.acquire}
        require={courseDetail.service && courseDetail.service.require}
      />
      <ProgressBar
        title='藝文賞析'
        unit='門'
        acquire={courseDetail.art && courseDetail.art.acquire}
        require={courseDetail.art && courseDetail.art.require}
      />
      <NoProgressBar
        title='抵免研究所課程'
        unit='學分'
        acquire={courseDetail.graduate && courseDetail.graduate.acquire}
      />
      <NoProgressBar
        title='雙主修、輔系、學分學程'
        unit='學分'
        acquire={courseDetail.dmajor_minor_program && courseDetail.dmajor_minor_program.acquire}
      />
    </Grid>
  </Hidden>
))

export default Index
