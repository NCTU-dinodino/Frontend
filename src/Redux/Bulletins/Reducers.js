
import { handleActions } from 'redux-actions'
import { FETCHING_STATUS } from '../../Utilities/constant'

const initialState = {
  index: {
    data: [],
    status: FETCHING_STATUS.IDLE
  },
  new: {
    status: FETCHING_STATUS.IDLE
  },
  edit: {
    status: FETCHING_STATUS.IDLE
  },
  delete: {
    status: FETCHING_STATUS.IDLE
  }
}

export default handleActions({
  BULLETINS: {
    INDEX: {
      STORE: (state, action) => ({ ...state, index: { ...state.index, data: action.payload } }),
      SET_STATUS: (state, action) => ({ ...state, index: { ...state.index, status: action.payload } })
    },
    NEW: {
      SET_STATUS: (state, action) => ({ ...state, new: { ...state.new, status: action.payload } })
    },
    EDIT: {
      SET_STATUS: (state, action) => ({ ...state, edit: { ...state.edit, status: action.payload } })
    },
    DELETE: {
      SET_STATUS: (state, action) => ({ ...state, delete: { ...state.delete, status: action.payload } })
    }
  }
}, initialState)
