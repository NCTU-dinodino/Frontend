import { combineReducers } from 'redux'
import User from './User'
import Professor from './Professor'
import Project from './Project'
import Graduation from './Graduation'
import Credit from './Credit'
import Recommend from './Recommend'

export default combineReducers({
  User,
  Professor,
  Graduation,
  Project,
  Credit,
  Recommend
})
