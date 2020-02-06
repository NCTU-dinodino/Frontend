import {combineReducers} from 'redux'

import Assistant from './Assistants/Reducers'
import Student from './Students/Reducers'
import Teacher from './Teachers/Reducers'
import Bulletins from './Bulletins/Reducers'

export default combineReducers({
  Assistant,
  Student,
  Teacher,
  Bulletins
})
