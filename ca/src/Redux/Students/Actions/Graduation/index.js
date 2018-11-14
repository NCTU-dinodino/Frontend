import { createAction } from 'redux-actions'
import axios from 'axios'
import FakeData from '../../../../Resources/FakeData'

export const storeGraduationCourse = createAction('STORE_GRADUATION_COURSE')
export const filterinput = createAction('FILTER_INPUT')
export const storeGradPrint = createAction('STORE_GRAD_PRINT')
export const storeGradCheck = createAction('STORE_GRAD_CHECK')
export const storeGradEnglishTestCheck = createAction('STORE_GRAD_ENGLISH_TEST_CHECK')
export const updateCourse = createAction('UPDATE_COURSE')
export const fetchStart = createAction('FETCH_START')
export const storeStudentInfo = createAction('STORE_STUDENT_INFO')

export const fetchGraduationCourse = (payload = { professional_field: 0 }) => dispatch => { 
  axios.post('/students/graduate/revised', payload).then(res => {
    dispatch(storeGraduationCourse(res.data))
  }).catch(err => {
    dispatch(storeGraduationCourse(FakeData.GraduationItems_Revised))
    console.log(err)
  })

  axios.get('/students/graduate/check').then(res => {
    dispatch(storeGradCheck(res.data.check.state))
  }).catch(err => {
    console.log(err)
  })

  axios.get('/students/graduate/english').then(res => {
    dispatch(storeGradEnglishTestCheck(res.data.check.state))
  }).catch(err => {
    console.log(err)
  })
}

export const fetchGraduationCourseAssistantVersion = (id, sname, program, feild) => dispatch => {
  dispatch(fetchStart())
  console.log(sname)
  axios.get('/assistants/graduate/revised', {
    params: {
      student_id: id,
      professional_field: feild
    }
  }).then(res => {
    dispatch(storeGraduationCourse(res.data))
  }).catch(err => {
    dispatch(storeGraduationCourse(FakeData.GraduationItems_Revised))
    console.log('NOOOOOOOOOOOO')
    console.log(id)
    console.log(err)
  })

  axios.get('/assistants/graduate/check', {
    params: {
      student_id: id
    }
  }).then(res => {
    dispatch(storeGradCheck(res.data.check.state))
  }).catch(err => {
    console.log(err)
  })

  axios.get('/assistants/graduate/english', {
    params: {
      student_id: id
    }
  }).then(res => {
    dispatch(storeGradEnglishTestCheck(res.data.check.state))
  }).catch(err => {
    console.log(err)
  })
  console.log({id, sname, program})
  dispatch(storeStudentInfo({id, sname, program}))
}

export const reviewSubmit = (payload) => dispatch => {
  axios.post('/students/graduate/check', payload).then(res => {
    dispatch(storeGradCheck(res.data.check.state))
  }).catch(err => {
    console.log(err)
  })
}

export const changeCourse = (from, end, course) => dispatch => {
  let object = { from, end, course }
  dispatch(updateCourse(object))
}

export const filterInput = value => dispatch => {
  dispatch(filterinput(value))
}
