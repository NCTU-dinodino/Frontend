import { createAction } from 'redux-actions'
import axios from 'axios'

export const upload_handle_change = createAction('UPLOAD_HANDLE_CHANGE');

export const uploadHandleChange = (payload) => dispatch => {
  dispatch(upload_handle_change(payload));
}

export const fetchXLSX = (payload) => dispatch => {
  dispatch(upload_handle_change({done: false}))
  axios.post('/_api/dataFormDownload', payload).then ( res => {
    dispatch(upload_handle_change({file: res.data, done: true}))
  })
}

export const fetchLogs = () => dispatch => {
  axios.get('/_api/dataLog').then( res => {
    dispatch(upload_handle_change({logs: res.data}))
  })
}

export const uploadXLSX = (payload) => dispatch => {
  const id = setInterval(dispatch(fetchLogs()), 2000)
  axios.post('/_api/dataUpload', payload).then( res => {
    window.alert("檔案上傳至伺服器成功, 正在處理資料...")
    dispatch(fetchLogs())
  }).catch( err => {
    window.alert("檔案上傳至伺服器失敗, 請檢查連線是否有問題, 或是通知dinodino開發團隊!");
    console.log(err)
  })
  clearInterval(id)
}

export const deleteLog = (payload) => dispatch => {
  axios.post('/_api/dataLog/delete', payload).then( res => {
    dispatch(fetchLogs())
  }).catch( err => {
    window.alert("操作失敗")
    console.log(err)
  })
}

export const deleteAllLogs = () => dispatch => {
  axios.get('/_api/dataLog/deleteAll').then( res => {
    dispatch(fetchLogs())
  }).catch( err => {
    window.alert("操作失敗")
    console.log(err)
  })
}