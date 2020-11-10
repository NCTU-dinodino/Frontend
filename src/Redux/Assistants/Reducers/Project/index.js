import { handleActions } from 'redux-actions'

const initalState = {
	year: '109',
	semester: '1',
  first_second: '1',
  input: "",
	rawData: [

	],
	index: 1,
	curdata: [],
  select: [],
	fetching: false,
	csvArr: [],
	csvDone: true,
	templateDone: false,
	templateFile: '',
}

export default handleActions({
	PROJECT_HANDLE_CHANGE: (state, action) => ({
    ...state,
    ...action.payload
  })
}, initalState)
