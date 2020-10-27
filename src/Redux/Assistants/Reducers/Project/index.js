import { handleActions } from 'redux-actions'

const initalState = {
	year: '109',
	semester: '1',
  first_second: '1',
  input: "",
	rawdata: [],
	index: 1,
	curdata: [],
	select: [],
	selectAll: false,
	fetching: false
}

export default handleActions({
	PROJECT_HANDLE_CHANGE: (state, action) => ({
    ...state,
    ...action.payload
  })
}, initalState)
