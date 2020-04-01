import { createAction } from 'redux-actions'
import axios from 'axios/index'

export const UpdateUserInfo = createAction('UPDATE_USER_INFO')

export const fetchUser = (page = 1) => dispatch => {
  axios.get('/_api/students/profile').then(studentData => {
    let data = { ...studentData.data[0], grade: '大' + studentData.data[0].grade }
    dispatch(UpdateUserInfo(data))
  }).catch(err => {
    console.log(err)
  })
}

export const studentUpdateIdCard = createAction('STUDENT_UPDATE_IDCARD');
