
import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Grid, Hidden } from '@material-ui/core'
import { CoursePopover, GeneralCoursePopover } from '../CoursePopover'

const styles = theme => ({
  container: {
    marginLeft: 10,
    borderLeft: '15px solid #eaeaea'
  },
  dimension: {
    backgroundColor: '#eaeaea',
    fontSize: 18,
    whiteSpace: 'nowrap',
    width: 150,
    margin: 0,
    paddingLeft: 10,
  },
  leftArrow: {
    display: 'inline-block',
    borderColor: 'transparent transparent transparent #eaeaea',
    borderStyle: 'dashed solid dashed dashed',
    borderWidth: '17px 0px 17px 20px'
  },
  buttonRow: {
    margin: '20px 0 20px 10px'
  },
  cardTitle: {
    display: 'inline-block',
    marginRight: 5
  }
})

const Title = withStyles(styles)(({ title, complete, require, unit, classes }) => (
  <div>
    <div className={classes.cardTitle}>{ title }</div>
    <font size={5} color='#338d68'>{ complete }</font>/
    <div className={classes.cardTitle}>{ require }</div>
    { unit }
  </div>
))

const GeneralNewCourseList = (props) => {
  const generalCourseTypes = [
    {
      name: '人文',
      dimension: '核心-人文',
      courses: []
    },
    {
      name: '社會',
      dimension: '核心-社會',
      courses: []
    },
    {
      name: '自然',
      dimension: '核心-自然',
      courses: []
    },
    {
      name: '校基本',
      dimension: '校基本素養',
      courses: []
    },
    {
      name: '跨院',
      dimension: '跨院基本素養',
      courses: []
    }
  ]

  // 把每個通識丟到正確的分類，然後加上會在 GeneralCoursePopover 用到的欄位
  props.courses.forEach(course => {
    const type = generalCourseTypes.find(type => course.dimension === type.dimension)
    if (type) {
      if (course.reason === 'now') {
        type.courses.push({
          ...course,
          color: '#9e48d9',
          score: '(當期課程)'
        })
      } else if (course.reason === 'free1' || course.reason === 'free2') {
        type.courses.push({
          ...course,
          color: '#6A94A2',
          cn: `${course.cn} (抵免課程)`
        })
      } else {
        type.courses.push({
          ...course,
          color: 'green'
        })
      }
    }
  })

  const { classes, mobile, overview } = props

  return (
    <Grid item xs={12} container className={mobile ? '' : classes.container}>
      <Hidden smDown>
        <div className={classes.dimension}>
          <Title
            title='核心'
            complete={overview.credit === null ? 0 : overview.credit.core}
            require={overview.require.core}
            unit='學分'
          />
        </div>
        <div className={classes.leftArrow} />
      </Hidden>
      <Grid item xs={12} container className={mobile ? '' : classes.buttonRow}>
        {
          // 核心-自然非資工必修
          generalCourseTypes
            .filter(type => type.dimension.slice(0, 2) === '核心' && !(type.dimension === '核心-自然' && type.courses.length === 0))
            .map((type, index) => (
              <GeneralCoursePopover
                key={index}
                type={type}
                title={`${props.title}-${type.dimension}`}
                assis={props.assis}
                mobile={props.mobile}
              />
            ))
        }
      </Grid>

      <Hidden smDown>
        <div className={classes.dimension}>
          <Title
            title='校基本'
            complete={overview.credit === null ? 0 : overview.credit.basic}
            require={overview.require.basic}
            unit='學分'
          />
        </div>
        <div className={classes.leftArrow} />
      </Hidden>
      <Grid item xs={12} container className={mobile ? '' : classes.buttonRow}>
        {
          generalCourseTypes
            .find(type => type.dimension === '校基本素養').courses
            .map((course, index) => (
              <CoursePopover
                key={index}
                label={course.cn}
                course={course}
                title={`${props.title}-校基本`}
                assis={props.assis}
                mobile={props.mobile}
              />
            ))
        }
      </Grid>

      <Hidden smDown>
        <div className={classes.dimension}>
          <Title
            title='跨院'
            complete={overview.credit === null ? 0 : overview.credit.cross}
            require={overview.require.cross}
            unit='學分'
          />
        </div>
        <div className={classes.leftArrow} />
      </Hidden>
      <Grid item xs={12} container className={mobile ? '' : classes.buttonRow}>
        {
          generalCourseTypes
            .find(type => type.dimension === '跨院基本素養').courses
            .map((course, index) => (
              <CoursePopover
                key={index}
                label={course.cn}
                course={course}
                title={`${props.title}-跨院`}
                assis={props.assis}
                mobile={props.mobile}
              />
            ))
        }
      </Grid>
    </Grid>
  )
}

GeneralNewCourseList.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(GeneralNewCourseList)
