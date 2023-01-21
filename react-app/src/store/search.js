export const LOAD_SEARCH = 'search/loadSearch'

export const ADD_SEARCH = 'search/addSearch'

export const LOAD_DMSEARCH = 'search/loadDmSearch'

export const loadSearch = (search) => {
    return {
        type: LOAD_SEARCH,
        search
    }
}

// export const addSearch = (search) => {
//     return {
//         type: ADD_SEARCH,
//         search
//     }
// }


export const loadDmSearch = (search) => {
    return {
        type: LOAD_DMSEARCH,
        search
    }
}

// export const addDmSearch = (search) => {
//     return {
//         type: ADD_SEARCH,
//         search
//     }
// }

export const getDmSearch = (chatId, search) => async dispatch => {
    const res = await fetch(`/api/search/dms/${chatId}`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            search
        })
    })

    if (res.ok){
        const body = await res.json()
        console.log(body, 'yoooooooooooooooooooooo')
        console.log(body[0].id)
        dispatch(loadDmSearch(body))
        return body
    }
    else{
        console.log('oooooooooooopsie')
    }
}


export const getMessagesSearch = (channelId, search) => async dispatch => {
    const res = await fetch(`/api/search/messages/${channelId}`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            search
        })
    })

    if (res.ok){
        const body = await res.json()
        dispatch(loadSearch(body))
        return body
    }
}


const initialState = {};

const searchReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_SEARCH:
            newState = Object.assign({}, state);
            newState.search = {}
            newState.dmSearch = {...state.dmSearch}
            const search = action.search
            search.forEach((item) => {
                newState.search[item.id] = item
            })
            return newState;
        case ADD_SEARCH:
            newState = Object.assign({}, state)
            newState.search = {...action.search}
            return newState
        case LOAD_DMSEARCH:
            newState = Object.assign({}, state)
            newState.dmSearch = {}
            newState.search = {...state.search}
            const searchDm = action.search
            searchDm.forEach(item => {
                newState.dmSearch[item.id] = item
            })
            return newState
      default:
        return state;
    }
  };

  export default searchReducer;
