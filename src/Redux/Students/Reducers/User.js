import { handleActions } from 'redux-actions'

const initialState = {
  type: 'student', // for Navbar
  studentIdcard: {
    sname: '測試',
    student_id: '0516000',
    program: '資工A',
    grade: '大一',
    email: 'hihi@gmail.com',
    status: 'w'
  },
  times: {
    "verify": {
      "begin": "2017-05-24T10:30",
      "end": "2017-05-24T10:30"
    },
    "project": {
      "begin": "2017-05-24T10:30",
      "end": "2017-05-24T10:30"
    },
    "graduation": {
      "begin": "2017-05-24T10:30",
      "end": "2017-05-24T10:30"
    }
  }
}

export default handleActions({
  UPDATE_USER_INFO: (state, action) => ({ ...state, studentIdcard: { ...action.payload } }),
  STUDENT_UPDATE_IDCARD: (state, action) => {
    return ({ ...state, 
      studentIdCard: {
        ...state.studentIdCard,
        sname: '助理端測試學生帳號',
        student_id: '0416000'
      }
    })
  },
  UPDATE_TIME_INFO: (state, action) => ({ ...state, times: { ...action.payload } })
}, initialState)
