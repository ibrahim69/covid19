import React, {Component} from 'react'
import {Provider} from 'react-redux'
import {ConnectedRouter} from 'connected-react-router'
import {PersistGate} from 'redux-persist/integration/react'
import Routers from './router' 

class App extends Component {
  render() {
    let {store} = this.props
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={store._persist}>
          <ConnectedRouter history={store._history}>
            <Routers />
          </ConnectedRouter>
        </PersistGate>
      </Provider>
    )
  }
}

export default App;
