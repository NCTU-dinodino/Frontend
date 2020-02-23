import axios from 'axios/index'
import { createAction } from 'redux-actions'

const chatbot_api_url = 'http://140.113.17.22:1112/ask'
const error_message = '抱歉，我不太明白你的意思。你要不要試試看換個方法問?'

export const addMessage = createAction('ADD_CHATBOT_MESSAGE')

export const sendMessage = (message) => dispatch => {
    dispatch(addMessage({
        message: message,
        isSender: true,
    }))
    axios.post(chatbot_api_url, {
        inputSTR: message
    }).then(res => {
        dispatch(addMessage({
            message: res.data,
            isSender: false,
        }))
    }).catch(err => {
        dispatch(addMessage({
            message: error_message,
            isSender: false,
        }))
    })
    
}