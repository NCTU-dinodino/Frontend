import {combineReducers} from 'redux'
import User from './User'
import Research from './Research'
import InfoCard from './InfoCard'

// COMBINE ALL REDUCERS FOR TEACHERS
export default combineReducers({
  User,
  Research,
  InfoCard
})
