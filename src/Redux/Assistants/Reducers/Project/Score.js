import { handleActions } from 'redux-actions'

const initialState = {
  scores: [],
  csvArr: [],
  input: "",
  csvDone: true,
  year: "",
  semester: "",
  first_second: ""
}

export default handleActions({
  SCORE_HANDLE_CHANGE: (state, action) => ({ 
    ...state,
    ...action.payload
  }),
  SET_SCORES: (state, action) => ({ ...state,
    scores: state.scores.map(score => ({ ...score,
      student: { ...score.student,
        score: score.student.id === action.payload.student_id ? action.payload.new_score : score.student.score,
        comment: score.student.id === action.payload.student_id ? action.payload.new_comment : score.student.comment
      }
    }))
  }),
}, initialState)
