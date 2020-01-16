import axios from 'axios/index'
import { createAction } from 'redux-actions'

export const storeCourse = createAction('ENTER_CHATBOT_MESSAGE')

export const sendMessage = (message) => dispatch => {
    dispatch(storeCourse({
        message: message,
        isSender: true,
    }))
    
    dispatch(storeCourse({
        message: message,
        isSender: false,
    }))
}