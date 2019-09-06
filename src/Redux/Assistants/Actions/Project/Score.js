import { createAction } from 'redux-actions'
import axios from 'axios'

// export const store_teachers = createAction('STORE_TEACHERS')
// export const update_add_status = createAction('UPDATE_ADD_STATUS')
// export const update_first_second = createAction('UPDATE_FIRST_SECOND')
// export const delete_research = createAction('DELETE_RESEARCH')
// export const storeScoreCsvData = createAction('STORE_SCORE_CSV_DATA')
// export const storeScoreCsvDataStart = createAction('STORE_SCORE_CSV_DATA_START')


// export const fetchTeachers = (post_item) => dispatch => {
//   axios.post('/assistants/research/professorList', post_item).then(res => {
//     dispatch(store_teachers(res.data))
//   }).catch(err => {
//     console.log(err)
//   })
// }

export const score_handle_change = createAction('SCORE_HANDLE_CHANGE');

export const scoreHandleChange = (payload) => dispatch => {
    dispatch(score_handle_change(payload));
}
