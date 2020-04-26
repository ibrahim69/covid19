import axios from '../axios'

export default {
    async getCountries() {
        try {
            return await axios.$get('/countries')
        } catch(e) {
            return Promise.reject(e)
        }
    },

    async getData(slug) {
        try {
            return await axios.$get(`live/country/${slug}`)
        } catch(e) {
            return Promise.reject(e)
        }
    }
}

