
import React from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import {
  withStyles,
  MuiThemeProvider,
  createMuiTheme
} from '@material-ui/core/styles'
import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Tooltip,
  Paper,
  IconButton
} from '@material-ui/core'
import InfoIcon from '@material-ui/icons/Info'
import {
  fetchRecommendCourses,
  setStarRating
} from '../../../Redux/Students/Actions/Recommend'

const styles = () => ({
  root: {
    width: '90%',
    margin: '0 auto',
    marginTop: 20,
    marginBottom: 20,
    overflowX: 'auto'
  },
  head: {
    background: 'rgb(104, 187, 102)',
    color: '#fff'
  },
  row: {
    '&:nth-of-type(even)': {
      backgroundColor: '#efefef'
    }
  },
  font1: {
    color: '#fff',
    fontSize: 15,
    textAlign: 'center'
  },
  font2: {
    fontSize: 14,
    fontWeight: 400,
    textAlign: 'center'
  },
  rating: {
    display: 'flex',
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  star: {
    fontSize: '1.4em',
    color: '#ccc',
    '&:hover ~ &,&:hover': {
      color: '#ffc831'
    }
  },
  descript: {
    position: 'fixed',
    bottom: 40,
    left: 0,
    zIndex: 1080
  }
})

class Recommend extends React.Component {
  constructor(props) {
    super(props)
    this.rating = this.rating.bind(this)
  }

  componentDidMount() {
    this.props.fetchRecommendCourses()
  }

  rating(e, i) {
    let rating = e.target.getAttribute('value')
    if (rating !== null) {
      this.props.setStarRating({
        student_id: this.props.id,
        unique_id: this.props.recommendCourses[i]['unique_id'],
        star_level: rating
      }, i)
    }
  }

  render() {
    const { classes, theme } = this.props
    return (
      <MuiThemeProvider theme={createMuiTheme({
        palette: {
          primary: {
            main: 'rgb(104, 187, 102)'
          }
        }
      })}>
        <Tooltip title='根據你的修課紀錄推薦這學期的課程' placement='right'>
          <IconButton className={classes.descript}>
            <InfoIcon />
          </IconButton>
        </Tooltip>

        <div dir={theme.direction}>
          <Paper className={classes.root}>
            <Table>
              <TableHead>
                <TableRow className={classes.head}>
                  <Tooltip title='按推薦優先順序排列課程' placement='top'>
                    <TableCell className={classes.font1}>順序</TableCell>
                  </Tooltip>
                  <Tooltip title='課程名稱' placement='top'>
                    <TableCell className={classes.font1}>課程</TableCell>
                  </Tooltip>
                  <Tooltip title='開課老師' placement='top'>
                    <TableCell className={classes.font1}>開課老師</TableCell>
                  </Tooltip>
                  <Tooltip title='同一門課不同老師授課時段可能不一樣' placement='top'>
                    <TableCell className={classes.font1}>時段</TableCell>
                  </Tooltip>
                  <Tooltip title='便於您查詢課程' placement='top'>
                    <TableCell className={classes.font1}>課號</TableCell>
                  </Tooltip>
                  <Tooltip title='此推薦是否對你有幫助' placement='top'>
                    <TableCell className={classes.font1}>此推薦是否對你有幫助</TableCell>
                  </Tooltip>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.props.recommendCourses.map((row, index) => (
                  <TableRow key={index} className={classes.row}>
                    <TableCell className={classes.font2}>{index + 1}</TableCell>
                    <TableCell className={classes.font2}><a href={row.url}>{row.cos_cname}</a></TableCell>
                    <TableCell className={classes.font2}>{row.teacher}</TableCell>
                    <TableCell className={classes.font2}>{row.cos_time}</TableCell>
                    <TableCell className={classes.font2}>{row.cos_code}</TableCell>
                    <TableCell className={classes.font2} onClick={e => this.rating(e, index)}>
                      {!row.rating
                        ? (
                          <span className={classNames(classes.rating)} >
                            <i className={classNames('fa fa-star', classes.star)} value={5} />
                            <i className={classNames('fa fa-star', classes.star)} value={4} />
                            <i className={classNames('fa fa-star', classes.star)} value={3} />
                            <i className={classNames('fa fa-star', classes.star)} value={2} />
                            <i className={classNames('fa fa-star', classes.star)} value={1} />
                          </span>
                        )
                        : <span className={classes.font2} >感謝您的回饋 &gt; &lt;</span>
                      }
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </div>
      </MuiThemeProvider>
    )
  }
}

const mapStateToProps = (state) => ({
  id: state.Student.User.studentIdcard.student_id,
  recommendCourses: state.Student.Recommend.recommendCourses,
})

const mapDispatchToProps = (dispatch) => ({
  fetchRecommendCourses: () => dispatch(fetchRecommendCourses()),
  setStarRating: (payload, index) => dispatch(setStarRating(payload, index))
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(Recommend))
