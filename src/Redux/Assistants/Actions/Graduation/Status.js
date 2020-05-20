import { createAction } from 'redux-actions'
import axios from 'axios'

export const status_handle_change = createAction('GRADUATION_STATUS_HANDLE_CHANGE');

export const statusHandleChange = (payload) => dispatch => {
  dispatch(status_handle_change(payload));
}

export const fetchStatus = (payload) => dispatch => {
  axios.post('/_api/assistants/graduation/studentList', payload).then(res => {
    dispatch(status_handle_change({
      students: res.data
    })) 
  })
}

export const triggerUpdateData = () => dispatch => {
  ['二', '三', '四'].forEach(title => {
    axios.post('/_api/assistants/graduation/gradeStudentId', { grade: title }).then(res => {
      res.data.forEach(student => {
        axios.get('/_api/assistants/graduation/studentList/edit', {
          params: {
            student_id: student.student_id
          }
        })
      })
    })
  })
}

