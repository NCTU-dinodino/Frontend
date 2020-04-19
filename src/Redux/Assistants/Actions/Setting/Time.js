import { createAction } from 'redux-actions'
import axios from 'axios'

export const time_handle_change = createAction('TIME_HANDLE_CHANGE');

export const timeHandleChange = (payload) => dispatch => {
  dispatch(time_handle_change(payload));
}