
import { handleActions } from 'redux-actions'

const initialState = {
  timer_signal: false
}

export default handleActions({
  UPDATE_TIMER_SIGNAL: (state, action) => ({ 
    ...state,
    timer_signal: action.payload
  })
}, initialState)
