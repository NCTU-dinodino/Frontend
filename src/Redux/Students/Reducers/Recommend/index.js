import { handleActions } from 'redux-actions'

const initialState = {
  recommendCourses: [],
}

export default handleActions({
  STORE_RECOMMEND_COURSES: (state, action) => ({ ...state, recommendCourses: action.payload }),
  UPDATE_RATING: (state, action) => {
    let index = action.payload
    let updated = [...state.recommendCourses]
    updated[index].rating = true
    return { ...state, recommendCourses: updated }
  }
}, initialState)
