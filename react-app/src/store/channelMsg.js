const LOAD_CHMSG = '/channelMsg/LOAD_CHMSG'
const CREATE_CHMSG = '/channelMsg/CREATE_CHMSG'
const EDIT_CHMSG = '/channelMsg/EDIT_CHMSG'
const DELETE_CHMSG = '/channelMsg/DELETE_CHMSG'

//ACTIONS
export const loadMsg = (msg) => ({
    type: LOAD_CHMSG,
    msg
})
export const createMsg = (message) => ({
    type: CREATE_CHMSG,
    message
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
    const res = await fetch(`/api/channels/${channelId}/msg`)

    if (res.ok) {
        const data = await res.json()
        dispatch(loadMsg(data))
    }
}

export const createMsgThunk = (channelId, message) => async (dispatch) => {
    const res = await fetch(`/api/channels/${channelId}/msg`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(message)
    })
    if (res.ok) {
        const data = await res.json()
        dispatch(createMsg(data))
        return data
    }
}

export const editMsgThunk = (channelId, messageId, message) => async (dispatch) => {
    const res = await fetch(`/api/channels/${channelId}/msg/${messageId}`, {
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

const normalizeData = (data) => {
    const obj = {};
    data.forEach(place => obj[place.id] = place)
    return obj
}


const initalState = {
    channelChat: {}
}
//REDUCER
const chmsgReducer = (state = {}, action) => {
    let newState = {...state}
    switch(action.type) {
        case LOAD_CHMSG: {
            const messageArr = action.msg.messages
            const messageObj = normalizeData(messageArr)
            newState = {...state, channelChat:messageObj}
            return newState
        }
        case CREATE_CHMSG: {
            newState[action.message] = action.message
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