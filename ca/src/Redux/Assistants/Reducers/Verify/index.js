import {handleActions } from 'redux-actions'
import FakeData from '../../../../Resources/FakeData'

const initalState = {
	formList: FakeData.FormList.map((e, i) => ({...e, id: i})),
  teacherList: FakeData.TeacherList.sort((a, b) => b.status - a.status),
  formListOld:FakeData.FormList.map((e, i) => ({...e, id: i})),
/******start for test*****
	formList:[],
	teacherList: [],
	formListOld:[],
*********end for test***************/
	isOld: false,
	open: false,
	message: 0,
	index: 0,
	select: [],
	selectAll: false,
	type: [0, 1, 2, 3],
	transferTo: '',
	return: '',
	anchorEl: null,
	fetching: false
}

export default handleActions({
	VERIFY_HANDLE_CHANGE: (state, action) => ({
		...state,
		...action.payload
	})
}, initalState)
