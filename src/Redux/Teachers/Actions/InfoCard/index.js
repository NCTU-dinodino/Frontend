import axios from 'axios'
import { createAction } from 'redux-actions'

export const GetStudentInfo = createAction('GET_STUDENT_INFO')
export const GetStudentScore = createAction('GET_STUDENT_SCORE')

export const updateSudentInfo = (sid) => dispatch => {
	axios.post('/professors/advisee/personalInfo', {
    student_id: sid
  }).then(res => {
    console.log('student Info', res.data)
    dispatch(GetStudentInfo(res.data))
  }).catch(err => {
    console.log(err)
  })
}

export const upadteStudentScore = (sid) => dispatch => {
	axios.post('/professors/advisee/semesterGradeList', {
		student_id: sid
	}).then(res => {
		console.log('student score', res.data)
		dispatch(GetStudentScore(res.data))
	}).catch(err => {
		console.log(err)
	})
}