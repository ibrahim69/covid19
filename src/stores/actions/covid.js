import covid from '../../api/covid'

export const SET_COVID_COUNTRIES = 'SET_COVID_COUNTRIES';
export const REMOVE_COVID_COUNTRIES = 'REMOVE_COVID_COUNTRIES';
export const SET_COVID_DATA = 'SET_COVID_DATA';
export const REMOVE_COVID_DATA = 'REMOVE_COVID_DATA';

export const setCovidCountries = function (payload) {
    return {
        type: SET_COVID_COUNTRIES,
        payload
    }
}

export const removeCovidCountries = function () {
    return {
        type: REMOVE_COVID_COUNTRIES
    }
}

export const setCovidData = function (payload) {
    return {
        type: SET_COVID_DATA,
        payload
    }
}

export const removeCovidData = function () {
    return {
        type: REMOVE_COVID_DATA
    }
}

export const getCountries = () => async dispatch => {
    try {
        let countries = await covid.getCountries()
        dispatch(setCovidCountries(countries))
        return Promise.resolve()
    } catch (err) {
        return Promise.reject(err)
    }
}

export const getData = function(value) {
    return async dispatch => {
        try {
            let data = await covid.getData(value)
            dispatch(setCovidData(data))
            return Promise.resolve()
        } catch(err) {
            return Promise.reject(err)
        }
    }
}