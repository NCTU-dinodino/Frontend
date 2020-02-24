import axios from 'axios/index'
import { createAction } from 'redux-actions'

const chatbot_api_url = 'http://140.113.17.22:1112/ask'
// const chatbot_api_url = 'http://127.0.0.1:5000/ask'
const error_message = '抱歉，我不太明白你的意思。你要不要試試看換個方法問?'

export const addMessage = createAction('ADD_CHATBOT_MESSAGE')

export const sendMessage = (message) => dispatch => {
    dispatch(addMessage({
        message: message,
        isSender: true,
    }))
    var fd = new FormData()
    fd.append('inputSTR', message)
    axios.post(chatbot_api_url, fd, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
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