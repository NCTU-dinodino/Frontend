import {combineReducers} from 'redux'
import Status from './Status'
import Check from './Check'
import Score from './Score'


export default combineReducers({
    Status,
    Check,
    Score
})