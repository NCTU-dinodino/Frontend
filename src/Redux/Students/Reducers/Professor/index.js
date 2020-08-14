
import { handleActions } from 'redux-actions'

const initialState = {
  list: {
    data: []
  },
  mentor: {
    data: ''
  },
  pastProject: {
    data: []
  }
}

export default handleActions({
  PROFESSOR: {
    LIST: {
      STORE: (state, action) => ({ ...state, list: {
        ...state.list,
        data: action.payload
      }})
    },
    MENTOR: {
      STORE: (state, action) => ({ ...state, mentor: {
        ...state.mentor,
        data: action.payload
      }})
    },
    PAST_PROJECT: {
      STORE: (state, action) => ({ ...state, pastProject: {
        ...state.pastProject,
        data: action.payload
      }})
    },
    SCOUNT: {
      STORE: (state, action) => ({ ...state, 
        list:  {
          ...state.list,
          data: state.list.data.map((professor) => professor.teacher_id === action.payload.teacher_id 
          ? { ...professor, scount: action.payload.scount } 
          : professor )
      }})
    }
  }
}, initialState)
