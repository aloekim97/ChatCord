const GET_ALL_CHANNELS = "channels/getChannels"

const LOAD_CHANNELS = "channels/loadChannels"

const LOAD_CHANNEL = "channels/loadChannel"

const ADD_CHANNEL = "channels/addChannel"

const EDIT_CHANNEL = "channels/editChannel"

const DELETE_CHANNEL = "channels/deleteSpot"


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
        // console.log(' this is the bodt ......', body.channel)
        await dispatch(loadChannels(body.channel))
    }
}


const initialState = {}

const channelReducer = (state = initialState, action) => {
    let newState;
    switch(action.type){
        case LOAD_CHANNELS:
            newState = Object.assign({}, state);
            newState.server = {...newState.server}
            const channels = action.channels
            channels.forEach(channel => {
                newState.server[channel.id] = channel
            })
            return newState;
        case LOAD_CHANNEL:
            return
        case ADD_CHANNEL:
            return
        case EDIT_CHANNEL:
            return
        case DELETE_CHANNEL:
            return
        default:
            return state;
    }
}
export default channelReducer;
