import {handleActions } from 'redux-actions'

const initalState = {
  verify: {
    begin: null,
    end: null
  },
  project: {
    begin: null,
    end: null
  },
  graduation: {
    begin: null,
    end: null
  }
}

export default handleActions({
	TIME_HANDLE_CHANGE: (state, action) => ({
		...state,
		...action.payload
	})
}, initalState)
