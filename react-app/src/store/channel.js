const GET_ALL_CHANNELS = "channels/getChannels"

const LOAD_CHANNELS = "channels/loadChannels"

const LOAD_CHANNEL = "channels/loadChannel"

const ADD_CHANNEL = "channels/addChannel"

const EDIT_CHANNEL = "channels/editChannel"

const DELETE_CHANNEL = "channels/deleteSpot"

const OFFLOAD_CHANNEL = "channels/offloadChannel"

//Actions

export const loadChannels = (channels) => {
    return {
        type: LOAD_CHANNELS,
        channels
    }
}

export const loadChannel = (channel) => {
    return {
        type: LOAD_CHANNEL,
        channel
    }
}

export const addChannel = (channel) => {
    return {
        type: ADD_CHANNEL,
        channel
    }
}

export const editChannel = (channel) => {
    return {
        type: EDIT_CHANNEL,
        channel
    }
}

export const offLoadChannels = (channels) => {
    return {
        type: OFFLOAD_CHANNEL,
    }
}

export const deleteChanel = (channel) => {
    return {
        type: DELETE_CHANNEL,
        channel
    }
}

export const fetchChannels = (serverId) => async dispatch => {
    const res = await fetch(`/api/servers/${serverId}`)
    if (res.ok){
        const body = await res.json();
        await dispatch(loadChannels(body.channel))
    }
}

export const fetchOneChannel = (channelId) => async dispatch => {
    const res = await fetch(`/api/channels/${channelId}`)
    if (res.ok){
        const body = await res.json();
        console.log('hi this is the body2', body)
        await dispatch(loadChannel(body))
    }
}

export const createChannel = (name, serverId) => async dispatch => {
    const res = await fetch(`/api/servers/${serverId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name
        })
    } )

    if (res.ok){
        const body = await res.json()
        dispatch(addChannel(body))
    }
}

export const updateChannel = (channelId, name) => async dispatch => {
    const res = await fetch(`/api/channels/${channelId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name
        })
    })
    if (res.ok){
        const body = await res.json()
        dispatch(editChannel(body))
    }
}

export const removeChannel = (channel) => async dispatch => {
    const res = await fetch(`/api/channels/${channel.id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
    })
    if (res.ok){
        const body = await res.json()
        dispatch(deleteChanel(channel))
    }
}


const initialState = {}

const channelReducer = (state = initialState, action) => {
    let newState;
    switch(action.type){
        case LOAD_CHANNELS:
            newState = Object.assign({}, state);
            newState.server = {}
            const channels = action.channels
            channels.forEach(channel => {
                newState.server[channel.id] = channel
            })
            return newState;
        case LOAD_CHANNEL:
            newState = Object.assign({}, state);
            newState.server = {...newState.server}
            const channel = action.channel
            newState.singleChannel = {...channel}
            return newState
        case ADD_CHANNEL:
            newState = Object.assign({}, state);
            newState.server = {...newState.server}
            const channel2 = action.channel
            newState.server[channel2.id] = channel2
            return newState
        case EDIT_CHANNEL:
            newState = Object.assign({}, state);
            newState.server = {...newState.server}
            const channel3 = action.channel
            newState.server[channel3.id] = channel3
            return newState
        case DELETE_CHANNEL:
            newState = Object.assign({}, state);
            newState.server = {...newState.server}
            const oldChannel = action.channel
            delete newState.server[oldChannel.id]
            return newState
        default:
            return state;
    }
}
export default channelReducer;
