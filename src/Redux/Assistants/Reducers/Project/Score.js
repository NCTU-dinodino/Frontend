import { handleActions } from 'redux-actions'

const initialState = {
  scores: [],
  csvArr: [],
  input: "",
  csvDone: true,
  year: "",
  semester: "",
  first_second: ""
}

export default handleActions({
  SCORE_HANDLE_CHANGE: (state, action) => ({ 
    ...state,
    ...action.payload
  }),
}, initialState)
