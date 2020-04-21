import {
    SET_COVID_COUNTRIES,
    REMOVE_COVID_COUNTRIES,
    SET_COVID_DATA,
    REMOVE_COVID_DATA
} from '../../actions/covid';

const initState = {
    countries: [],
    data: []
}

const setCovidCountries = function(state, payload) {
    return {
        ...state,
        countries: payload
    }
}

const removeCovidCountries = function(state) {
    return {
        ...state,
        countries: []
    };
}

const setCovidData = function(state, payload) {
    return {
        ...state,
        data: payload
    }
}

const removeCovidData = function(state) {
    return {
        ...state,
        data: []
    };
}

export default  function(state = initState, action) {
    let {type, payload} = action
    switch(type) {
        case SET_COVID_COUNTRIES:
            return setCovidCountries(state, payload)
        case REMOVE_COVID_COUNTRIES:
            return removeCovidCountries(state)
        case SET_COVID_DATA:
            return setCovidData(state, payload)
        case REMOVE_COVID_DATA:
            return removeCovidData(state)
        default:
            return state;
    }
}