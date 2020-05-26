import { createAction } from 'redux-actions'
import axios from 'axios'

export const store_students = createAction('STORE_STUDENTS')

export const fetchStudents = (post_item) => dispatch => {
  axios.post('/_api/assistants/project/studentList', post_item).then(res => {
    dispatch(store_students(res.data))
  }).catch(err => {
    console.log(err)
  })
}
