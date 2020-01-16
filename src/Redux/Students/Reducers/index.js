import { combineReducers } from 'redux'
import User from './User'
import Professor from './Professor'
import Project from './Project'
import Map from './Map'
import Graduation from './Graduation'
import Credit from './Credit'
import Recommend from './Recommend'
import ChatBot from './ChatBot'

export default combineReducers({
  User,
  Professor,
  Map,
  Graduation,
  Project,
  Credit,
  Recommend,
  ChatBot
})
