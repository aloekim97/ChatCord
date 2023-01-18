const LOAD_CHMSG = '/channelMsg/LOAD_CHMSG'
const CREATE_CHMSG = '/channelMsg/CREATE_CHMSG'
const EDIT_CHMSG = '/channelMsg/EDIT_CHMSG'
const DELETE_CHMSG = '/channelMsg/DELETE_CHMSG'

//ACTIONS
export const loadMsg = (msg) => ({
    type: LOAD_CHMSG,
    msg
})
export const createMsg = (newMsg) => ({
    type: CREATE_CHMSG,
    newMsg
})
export const editMsg = (msgId) => ({
    type: EDIT_CHMSG,
    msgId
})
export const deleteMsg = (msgId) => ({
    type: DELETE_CHMSG,
    msgId
})

//Thunks
export const loadMsgThunk = (channelId) => async (dispatch) => {
    const res = await fetch(`/api/chmsg/${channelId}/msg`)

    if (res.ok) {
        const data = await res.json()
        dispatch(loadMsg(data))
    }
}

export const createMsgThunk = (channelId, message) => async (dispatch) => {
    const res = await fetch(`/api/chmsg/${channelId}/msg`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            message
        })
    })
    if (res.ok) {
        const data = await res.json()
        dispatch(createMsg(data))
        return data
    }
}

export const editMsgThunk = (channelId, messageId, message) => async (dispatch) => {
    const res = await fetch(`/api/chmsg/${channelId}/msg/${messageId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            message
        })
    })
    if (res.ok) {
        const data = await res.json()
        dispatch(editMsg(data))
        return data
    }
}

export const deleteMsgThunk = (channelId, messageId) => async (dispatch) => {
    const res = await fetch(`/api/chmsg/${channelId}/msg/${messageId}`, {
        method: "DELETE"
    })
    const data = await res.json()
    dispatch(deleteMsg(messageId))
    return data
}

//REDUCER
const chmsgReducer = (state = {}, action) => {
    let newState = {}
    switch(action.type) {
        case LOAD_CHMSG: {
            action.msg.forEach(message => {
                newState[message.id] = message
            })
            return newState
        }
        case CREATE_CHMSG: {
            newState = {...state}
            newState[action.newMsg.id] = action.newMsg
            return newState
        }
        case EDIT_CHMSG: {
            newState = {...state}
            newState[action.msgId] = action.msgId
            return newState
        }
        case DELETE_CHMSG: {
            newState = {...state}
            delete newState[action.msgId]
            return newState
        }
        default:
            return state
    }
}

export default chmsgReducer