const GET_DM = '/directMsg/GET_DM'
const LOAD_DM = '/directMsg/LOAD_DM'
const CREATE_DM = '/directMsg/CREATE_DM'
const EDIT_DM = '/directMsg/EDIT_DM'
const DELETE_DM = '/directMsg/DELETE_DM'

//ACTIONS
export const getDms = (chatId) => ({
    type: GET_DM,
    chatId
})
export const loadDms = (messages) => ({
    type: LOAD_DM,
    messages
})
export const createDms = (newDm) => ({
    type: CREATE_DM,
    newDm
})
export const editDms = (dmId) => ({
    type: EDIT_DM,
    dmId
})
export const deleteDms = (dmId) => ({
    type: DELETE_DM,
    dmId 
})


//THungks
export const getDirectChatThunk = (chatId) => async (dispatch) => {
    const res = await fetch(`/api/dm/${chatId}`)

    if (res.ok) {
        const data = res.json()
        dispatch(getDms(data))
        return data
    }
}

export const loadTheDmsThunk = (chatId) => async (dispatch) => {
    const res = await fetch(`/api/dm/${chatId}/msg`)

    if (res.ok) {
        const messages = await res.json()
        dispatch(loadDms(messages))
        return messages
    }
}
const normalizeData = (data) => {
    const obj = {};
    data.forEach(place => obj[place.id] = place)
    return obj
}


const initalState = {
    chatDetails: {}
}

//REDCUER
const dmReducer = (state = initalState, action) => {
    let newState = {...state}
    switch(action.type) {
        case LOAD_DM: {
            const messagesArr = action.messages.messages
            const messageObj = normalizeData(messagesArr)
            newState = {...state, chatDetails:messageObj}
            return newState
        }
        default:
            return state
    }
}

export default dmReducer