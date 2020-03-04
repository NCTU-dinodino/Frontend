
import { handleActions } from 'redux-actions'
import { FETCHING_STATUS } from '../../../../Utilities/constant'

const initialState = {
  detail: {
    data: {}
  },
  english: {
    status: 0
  },
  getReview: {
    status: 0,
    rejectReason: '',
    generalCourseType: 0,
    professionalField: 0
  },
  sendReview: {
  },
  getMoveTarget: {
    targets: []
  },
  moveCourse: {
    success: false,
    reason: '',
    status: FETCHING_STATUS.IDLE
  },
  resetCourse: {
    success: false
  },
  assistant: {
    idCard: {},
    using: false // 代表是否使用助理端查看
  }
}

export default handleActions({
  GRADUATION: {
    DETAIL: {
      STORE: (state, action) => ({ ...state, detail: {
        ...state.detail,
        data: action.payload
      }})
    },
    ENGLISH: {
      STORE: (state, action) => ({ ...state, english: {
        ...state.english,
        status: action.payload
      }})
    },
    GET_REVIEW: {
      STORE: (state, action) => ({ ...state, getReview: {
        ...state.getReview,
        status: action.payload.status,
        rejectReason: action.payload.reject_reason,
        generalCourseType: action.payload.general_course_type,
        professionalField: action.payload.professional_field
      }})
    },
    SEND_REVIEW: {
      STORE: (state, action) => ({ ...state, getReview: {
        ...state.getReview,
        status: action.payload.status,
        generalCourseType: action.payload.general_course_type
      }})
    },
    GET_MOVE_TARGET: {
      STORE: (state, action) => ({ ...state, getMoveTarget: {
        ...state.getMoveTarget,
        targets: action.payload
      }})
    },
    MOVE_COURSE: {
      STORE: (state, action) => ({ ...state, moveCourse: {
        ...state.moveCourse,
        success: action.payload.success,
        reason: action.payload.reason
      }}),
      SET_STATUS: (state, action) => ({ ...state, moveCourse: {
        ...state.moveCourse,
        status: action.payload
      }})
    },
    RESET_COURSE: {
      STORE: (state, action) => ({ ...state, resetCourse: {
        ...state.resetCourse,
        success: action.payload
      }})
    },
    ASSISTANT: {
      STORE: (state, action) => ({ ...state, assistant: {
        ...state.assistant,
        idCard: action.payload,
        using: true
      }})
    }
  }
}, initialState)
