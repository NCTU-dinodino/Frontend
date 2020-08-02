
import { handleActions } from 'redux-actions'
import { FETCHING_STATUS } from '../../../../Utils/constant'

const initialState = {
  list: {
    data: []
  },
  new: {
    data: [],
    status: FETCHING_STATUS.IDLE
  },
  delete: {
    status: FETCHING_STATUS.IDLE
  },
  times: {
    status: FETCHING_STATUS.IDLE
  }
}

export default handleActions({
  PROJECT: {
    LIST: {
      STORE: (state, action) => ({ ...state, list: {
        ...state.list,
        data: action.payload
      }})
    },
    NEW: {
      STORE: (state, action) => ({ ...state, new: {
        ...state.new,
        data: action.payload
      }}),
      SET_STATUS: (state, action) => ({ ...state, new: {
        ...state.new,
        status: action.payload
      }})
    },
    DELETE: {
      SET_STATUS: (state, action) => ({ ...state, delete: {
        ...state.delete,
        status: action.payload
      }})
    },
    TIMES: {
      SET_STATUS: (state, action) => ({ ...state, times: {
        ...state.times,
        status: action.payload
      }})
    },
  }
}, initialState)
