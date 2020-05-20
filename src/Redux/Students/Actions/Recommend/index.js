
import { createAction } from 'redux-actions'
import axios from 'axios'
// import FakeData from '../../../../Resources/FakeData'

export const storeRecommendCourses = createAction('STORE_RECOMMEND_COURSES')
export const updateRating = createAction('UPDATE_RATING')

export const fetchRecommendCourses = () => dispatch => {
  axios.get('/_api/students/recommend/courseList')
    .then(res => {
      dispatch(storeRecommendCourses(res.data.map(e => ({ ...e, rating: false }))))
    })
    .catch(err => {
      // dispatch(storeRecommendCourses(FakeData.RecommendCos.map( e => ({ ...e, rating: false }) )))
      console.log(err)
    })
}

export const setStarRating = (payload, index) => dispatch => {
  axios.post('/_api/students/recommend/rating', payload)
    .then(() => {
      dispatch(updateRating(index))
    })
    .catch(err => {
      console.log(err)
    })
}
