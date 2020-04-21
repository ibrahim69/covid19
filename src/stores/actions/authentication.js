export const SET_AUTHENTICATION_USERNAME = 'SET_AUTHENTICATION_USERNAME'
export const REMOVE_AUTHENTICATION_USERNAME ='REMOVE_AUTHENTICATION_USERNAME'

export const setAuthenticationUsername = function (payload) {
    return {
        type: SET_AUTHENTICATION_USERNAME,
        payload
    };
}

export const removeAuthenticationUsername = function () {
    return {
        type: REMOVE_AUTHENTICATION_USERNAME
    };
}