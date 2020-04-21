import { SET_AUTHENTICATION_USERNAME,
    REMOVE_AUTHENTICATION_USERNAME } from "../../actions/authentication";

const initState = {
    username: ''
}

const setAuthenticationUsername = function(state, payload) {
    return {
        ...state,
        username: payload
    }
}

const removeAuthenticationUsername = function (state) {
    return {
        ...state,
        username: ''
    }
}

export default function(state = initState, action) {
    let {type, payload} = action
    switch (type) {
        case SET_AUTHENTICATION_USERNAME:
            return setAuthenticationUsername(state, payload)
        case REMOVE_AUTHENTICATION_USERNAME:
            return removeAuthenticationUsername(state)
        default:
            return state;
    }        
}