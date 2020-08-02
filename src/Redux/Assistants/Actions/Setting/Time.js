import { createAction } from 'redux-actions'
import axios from 'axios'

export const time_handle_change = createAction('TIME_HANDLE_CHANGE');

export const fetchTime = () => dispatch => {
  axios.get('/getTimes').then( res =>
    dispatch(time_handle_change(res.data))
  ).catch( err => {
    window.alert("獲取時間失敗")
    console.log(err)
  })
}

export const timeHandleChange = (payload) => dispatch => {
  axios.post('/setTimes', payload).then( res => {
    dispatch(time_handle_change(payload))
    window.alert("修改成功!")
  }).catch( err => {
    window.alert("修改失敗!")
    console.log(err)
  })
}