import {combineReducers} from 'redux'

import Index from './Index/Reducers'
import Assistant from './Assistants/Reducers'
import Student from './Students/Reducers'
import Teacher from './Teachers/Reducers'
import Bulletins from './Bulletins/Reducers'

export default combineReducers({
  Index,
  Assistant,
  Student,
  Teacher,
  Bulletins
})
