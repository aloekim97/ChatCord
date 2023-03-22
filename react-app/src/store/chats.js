const LOAD_CHATS = '/chats/LOAD_CHATS'
const CREATE_CHATS = '/chats/CREATE_CHATS'
const DELETE_CHATS = '/chats/DELETE_CHATS'


//ACTIONS
export const loadChats = (chats) => ({
    type: LOAD_CHATS,
    chats
})

export const createChat = (newChat) => ({
    type: CREATE_CHATS,
    newChat
})

export const deleteChat = (chatId) => ({
    type: DELETE_CHATS,
    chatId
})


//THUNKS
export const getChats = () => async (dispatch) => {
    const res = await fetch('/api/dm/')

    if (res.ok) {
        const chats = await res.json()
        dispatch(loadChats(chats))
    }
}

export const newChat = (info) => async (dispatch) => {
    const res = await fetch('/api/dm/', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(info)
    })
    if (res.ok) {
        const chat = await res.json()
        dispatch(createChat(chat))
        return chat
    }
}

export const deleteChatThunk = (chatId) => async (dispatch) => {
    const res = await fetch(`/api/dm/${chatId}`, {
        method: "DELETE"
    })
    if (res.ok) {
        const chat = await res.json()
        dispatch(deleteChat(chatId))
        return chat
    }
}


//REDUCER
const chatReducer = (state = {}, action) => {
    let newState = {};
    switch(action.type) {
        case LOAD_CHATS: {
            action.chats.chats.forEach((chat)=> {
                newState[chat.id] = chat
            })
            return newState
        }
        case CREATE_CHATS: {
            newState[action.newChat.id] = action.newChat
            return newState
        }
        case DELETE_CHATS: {
            newState = {...state}
            delete newState[action.chatId]
            return newState
        }
        default:
            return state
    }
}

export default chatReducer