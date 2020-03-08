import { createAction } from 'redux-actions'
import axios from 'axios'

export const upload_handle_change = createAction('UPLOAD_HANDLE_CHANGE');

export const uploadHandleChange = (payload) => dispatch => {
  dispatch(upload_handle_change(payload));
}

export const fetchXLSX = (payload) => dispatch => {
  dispatch(upload_handle_change({done: false}))
  axios.post('/dataFormDownload', payload).then ( res => {
    console.log("return")
    console.log(res.data)
    dispatch(upload_handle_change({file: res.data, done: true}))
  })
}

export const fetchLogs = () => dispatch => {
  axios.get('/dataLog').then( res => {
    dispatch(upload_handle_change({logs: res.data}))
  })
}

export const uploadXLSX = (payload) => dispatch => {
  axios.post('/dataUpload', payload).then( res => {
    dispatch(fetchLogs);
  }).catch( err => {
    window.alert("上傳錯誤!!");
    console.log(err)
  })
}