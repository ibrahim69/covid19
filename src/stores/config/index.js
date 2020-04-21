import {createStore, applyMiddleware, compose} from 'redux'
import {createBrowserHistory} from 'history'
import {routerMiddleware} from 'connected-react-router'
import thunk from 'redux-thunk'
import {createLogger} from 'redux-logger'
import {persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import createRootReducers from '../modules'

const history = createBrowserHistory()
const rootReducers = createRootReducers(history)
const config = {
  key: 'auth',
  storage,
  whitelist: ['authentication'],
  blacklist: ['*']
}
const configureStore  = function (initState) {
    let middleware = [], enhancers = []
    middleware.push(thunk)
    let logger = createLogger({
      level: 'info',
      collapsed: true
    })
    middleware.push(logger)
    let router = routerMiddleware(history)
    middleware.push(router)
    let composeEnhancers = compose
    enhancers.push(applyMiddleware(...middleware))
    let enhancer = composeEnhancers(...enhancers)
    let reducers = persistReducer(config, rootReducers)
    return createStore(reducers, initState, enhancer)
}

const configurePeristor = function (store) {
    return persistStore(store)
}

const stores = configureStore()
stores._persist = configurePeristor(stores)
stores._history = history

export default stores