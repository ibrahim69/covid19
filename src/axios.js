import Axios from 'axios'
import _ from 'lodash'

const axiosExtra = {
  onRequest(fn) {
    this.interceptors.request.use(config => fn(config) || config)
  },
  onResponse(fn) {
    this.interceptors.response.use(response => fn(response) || response)
  },
  onRequestError(fn) {
    this.interceptors.request.use(undefined, error => fn(error) || Promise.reject(error))
  },
  onResponseError(fn) {
    this.interceptors.response.use(undefined, error => fn(error) || Promise.reject(error))
  },
  onError(fn) {
    this.onRequestError(fn)
    this.onResponseError(fn)
  },
  create(options) {
    return createAxiosInstance(_.extend(options, this.defaults))
  }
}

for (let method of ['request', 'delete', 'get', 'head', 'options', 'post', 'put', 'patch']) {
  axiosExtra['$' + method] = function () { return this[method].apply(this, arguments).then(res => res && res.data) }
}

const extendAxiosInstance = axios => {
  for (let key in axiosExtra) {
    axios[key] = axiosExtra[key].bind(axios)
  }
}

const createAxiosInstance = function (axiosOptions) {
  let axios = Axios.create(axiosOptions)
  axios.isCancel = Axios.isCancel
  extendAxiosInstance(axios)
  axios.onError(function (err) {
    if (err.response) {
      let {data} = err.response
      let error = new Error(data.message)
      return Promise.reject(error)
    }
    return Promise.reject(err)
  })
  return axios
}

export default createAxiosInstance({
  baseURL: 'https://api.covid19api.com'
})