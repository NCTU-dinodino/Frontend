import { createAction } from 'redux-actions'
import axios from 'axios'

export const check_handle_change = createAction('GRADUATION_CHECK_HANDLE_CHANGE');
export const update_graduate_status = createAction('UPDATE_GRADUATE_STATUS')

export const checkHandleChange = (payload) => dispatch => {
  dispatch(check_handle_change(payload));
}

export const fetchCheck = (payload) => dispatch => {
	axios.all([
		axios.post('/assistants/graduate/studentList', {
			grade: '二'
		}),
		axios.post('/assistants/graduate/studentList', {
			grade: '三'
		}),
		axios.post('/assistants/graduate/studentList', {
			grade: '四'
		})
	]).then(axios.spread((second_res, third_res, fourth_res) => {
		dispatch(check_handle_change({
			checks: [
				...second_res.data
					.filter( _ => _.submit_status === 1 )
					.map( check => ({...check, grade: '二'})),
				...third_res.data
					.filter( _ => _.submit_status === 1 )
					.map( check => ({ ...check, grade: '三'})),
				...fourth_res.data
					.filter( _ => _.submit_status === 1 )
					.map( check => ({ ...check, grade: '四'}))
			]
		}))
	})).catch( err => console.log(err) )
}

export const updateGraduateStatus = payload => dispatch => {
	axios.post('/assistants/graduate/check', payload).then( res => {
		dispatch(update_graduate_status(payload))
	}).catch( err => console.log(err) )
}