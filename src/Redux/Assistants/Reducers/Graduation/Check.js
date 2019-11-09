import { handleActions } from 'redux-actions'

const initialState = {
  input: '',
  checks: [{
  }]
}

export default handleActions({
  GRADUATION_CHECK_HANDLE_CHANGE: (state, action) => ({ 
    ...state,
    ...action.payload
  }),
  UPDATE_GRADUATE_STATUS: (state, action) => ({ ...state,
    checks: state.checks.filter( check => check.student_id !== action.payload.student_id )
  })
}, initialState)
