import {combineReducers} from 'redux'
import {connectRouter} from 'connected-react-router'

import reducers from './reducers'

export default function createRootReducers(history) {
    return combineReducers({
      router: connectRouter(history),
      ...reducers
    })
  }