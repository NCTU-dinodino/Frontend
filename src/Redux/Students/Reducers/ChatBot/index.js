import { handleActions } from 'redux-actions'

const initialState = {
    messages: [{
        message: '你好，我是資工系小助手 dino ，有任何問題歡迎問我!',
        isSender: false,
    }]
}

export default handleActions({
    ADD_CHATBOT_MESSAGE: (state, action) => {
        let messages = state.messages
        return { ...state, messages: messages.concat([action.payload]) }
    }
    // Todo
}, initialState)