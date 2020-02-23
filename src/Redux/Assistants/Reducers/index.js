import {combineReducers} from 'redux'
import User from './User'
import Project from './Project/index'
import Graduation from './Graduation/index'
import Verify from './Verify/index'
import Setting from './Setting/index'

export default combineReducers({
  User,
  Project,
  Graduation,
  Verify,
  Setting
})
