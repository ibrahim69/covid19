import axios from '../axios';

export default {
    async getCountries() {
        try {
            let data = await axios.$get('/countries')
            return data
        } catch(e) {
            return Promise.reject(e)
        }
    },

    async getData(slug) {
        try {
            let data = await axios.$get(`/live/country/${slug}`)
            // console.log('[data country]  ===== >', data) // undefined
            return data
        } catch(e) {
            return Promise.reject(e)
        }
    }
}

