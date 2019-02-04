
import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
// import Postfile from './Postfile'

const styles = theme => ({
  container: {
    width: '100%',
    margin: '0 auto'
  },
  label: {
    fontSize: '20px'
  },
  input: {
    fontSize: '16px'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 150
  },
  textFieldLong: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 300
  }
})

class EnglishCourseFormConfirm extends React.Component {
  render () {
    const { classes } = this.props
    return (
      <div className={classes.container}>
        <h2>基本資料</h2>
        <hr style = {{ margin: '5px' }}/>
        <div style={{ margin: '5px' }}>
          <TextField
            label='申請人'            
            margin='normal'
            className={classes.textField}
            InputLabelProps={{
              classes: {
                root: classes.label
              },
              shrink: true
            }}
            InputProps={{ readOnly: true }}
            defaultValue={this.props.studentIdcard.sname}
          />
          <TextField
            label='班別'         
            margin='normal'
            className={classes.textField}
            InputLabelProps={{
              classes: {
                root: classes.label
              },
              shrink: true
            }}
            InputProps={{ readOnly: true }}
            defaultValue={this.props.studentIdcard.program}
          />
          <TextField
            label='學號'           
            margin='normal'
            className={classes.textField}
            InputLabelProps={{
              classes: {
                root: classes.label
              },
              shrink: true
            }}
            InputProps={{ readOnly: true }}
            defaultValue={this.props.studentIdcard.student_id}
          />
          <TextField
            label='手機'
            margin='normal'
            className={classes.textField}
            InputLabelProps={{
              classes: {
                root: classes.label
              },
              shrink: true
            }}
            InputProps={{ readOnly: true }}
            defaultValue={this.props.phone}
          />
        </div>
        <div style={{ height: '30px' }} />
        <h2>課程資訊</h2>
        <hr style = {{ margin: '5px' }}/>
        <div style = {{ margin: '5px' }}>
          <TextField
            label='課程名稱'
            margin='normal'
            className={classes.textField}
            InputLabelProps={{
              classes: {
                root: classes.label
              },
              shrink: true
            }}
            InputProps={{ readOnly: true }}
            defaultValue={this.props.course_name}
          />
          <TextField
            label='永久課號'
            margin='normal'
            className={classes.textField}
            InputLabelProps={{
              classes: {
                root: classes.label
              },
              shrink: true
            }}
            InputProps={{ readOnly: true }}
            defaultValue={this.props.course_code}
          />
          <TextField
            label='開課系所'
            margin='normal'
            className={classes.textField}
            InputLabelProps={{
              classes: {
                root: classes.label
              },
              shrink: true
            }}
            InputProps={{ readOnly: true }}
            defaultValue={this.props.department}
          />
          <TextField
            label='授課老師'
            margin='normal'
            className={classes.textField}
            InputLabelProps={{
              classes: {
                root: classes.label
              },
              shrink: true
            }}
            InputProps={{ readOnly: true }}
            defaultValue={this.props.teacher}
          />    
        </div>
        <div style={{ height: '30px' }} />
        <h2>其他</h2>
        <hr style = {{ margin: '5px' }}/>
        <div style = {{ margin: '5px' }}>
          <TextField
            label='申請原因'
            helperText='請詳填'
            margin='normal'
            className={classes.textFieldLong}
            InputLabelProps={{
              classes: {
                root: classes.label
              },
              shrink: true
            }}
            InputProps={{
              classes: {
                root: classes.input
              },
              readOnly: true
            }}           
            defaultValue={this.props.reason}
            multiline
            rowsMax='4'
          />
        </div>
        <br />
        註：<br />
        1. 須檢附用書書名及課程綱要。<br />
        <br />
        檔案：{this.props.file.name}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  studentIdcard: state.Student.User.studentIdcard,
  year: state.Student.Credit.englishCourse.year,
  semester: state.Student.Credit.englishCourse.semester,
  department: state.Student.Credit.englishCourse.department, // 原課程的depart
  teacher: state.Student.Credit.englishCourse.teacher, // 原課程teacher
  course_name: state.Student.Credit.englishCourse.course_name,
  course_code: state.Student.Credit.englishCourse.course_code,
  reason: state.Student.Credit.englishCourse.reason,
  phone: state.Student.Credit.englishCourse.phone,
  file: state.Student.Credit.englishCourse.file,
})

const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(EnglishCourseFormConfirm))