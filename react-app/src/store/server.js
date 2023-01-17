// constants
const GET_ALL_SERVERS = "servers/GET_ALL_SERVERS";
const GET_ONE_SERVER = "servers/GET_ONE_SERVER"
const CREATE_SERVER = "servers/CREATE_SERVER";
const EDIT_SERVER = "servers/EDIT_SERVER";
const DELETE_SERVER = "servers/DELETE_SERVER";


// Actions
const getAllServers = (servers) => {
    return {
        type: GET_ALL_SERVERS,
        servers
    }
}


const getOneServer = (server) => {
    return {
        type: GET_ONE_SERVER,
        server
    }
}

const createServer = (newServer) => {
    return {
        type: CREATE_SERVER,
        newServer
    }
}

const editServer = (server) => {
    return {
        type: EDIT_SERVER,
        server
    }
}

const deleteServer = (serverId) => {
    return {
        type: DELETE_SERVER,
        serverId
    }
}


// Action Thunks
export const getAllServersThunk = () => async (dispatch) => {
    const response = await fetch("/api/servers");

    if (response.ok) {
        const servers = await response.json();
        dispatch(getAllServers(servers));
        return servers;
    }
}


export const getOneServerThunk = (serverId) => async (dispatch) => {
    const response = await fetch(`/api/servers/${serverId}`);

    if (response.ok) {
        const server = await response.json();
        dispatch(getOneServer(server));
        return server;
    }
}


export const addServer = (newServer) => async (dispatch) => {
    const { name, server_img } = newServer;
    const response = await fetch("/api/servers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name,
            server_img
        })
    })
    if (response.ok) {
        const server = await response.json();
        dispatch(createServer(server));
        return server;
    }
}


export const updateServer = (server) => async (dispatch) => {
    const { id, name, server_img } = server;
    const response = await fetch(`/api/servers/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name,
            server_img
        })
    })
    if (response.ok) {
        const server = await response.json();
        dispatch(editServer(server));
        return server;
    }
}


export const deleteServerThunk = (serverId) => async (dispatch) => {
    const response = await fetch(`/api/servers/${serverId}`, {
        method: 'DELETE'
    });
    if (response.ok) {
        const server = await response.json();
        dispatch(deleteServer(serverId));
        return server;
    }
}

const initialState = { allServers: {}, singleServer: {} };
const serverReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_ALL_SERVERS: {
            newState = {
                allServers: {},
                singleServer: {},
            };
            action.servers.forEach(server => {
                newState.allServers[server.id] = server
            });
            return newState;
        }
        case GET_ONE_SERVER: {
            newState = { allServers: { allServers: { ...state.allServers }, singleServer: { ...state.singleServer } } }
            newState.singleServer = { ...action.server };
            return newState;
        }
        case CREATE_SERVER: {
            newState = { ...state };
            newState[action.newServer.id] = action.newServer
            return newState
        }
        case EDIT_SERVER: {
            newState = { ...state };
            newState[action.server.id] = action.server;
            return newState
        }
        case DELETE_SERVER: {
            newState = { ...state };
            delete newState[action.serverId]
            return newState
        }
        default:
            return state;
    }
}

export default serverReducer