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
export const loadDms = (chatId) => ({
    type: LOAD_DM,
    chatId
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
        const data = res.json()
        dispatch(loadDms(data))
        return data
    }
}



//REDCUER
const dmReducer = (state = {}, action) => {
    let newState = {}
    switch(action.type) {
        case LOAD_DM: {
            newState = {...state}
            newState["chatDetails"] = action.chatId
            return newState
        }
        default:
            return state
    }
}

export default dmReducer