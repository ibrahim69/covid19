import React, {Component} from "react"
import {Switch} from 'react-router-dom'
import _ from 'lodash'

import routers from './routers'
import IsAuth from '../hoc/IsAuth'
import IsntAuth from '../hoc/IsntAuth'

class Router extends Component {
    get routerMap() {
        return routers.map((router, i) => {
            let authentication = _.has(router, 'authentication') && router.authentication
            if (authentication) return (
                <IsAuth {...router} key={i}/>
            )
            else return (
                <IsntAuth  {...router} key={i}/>
            )
        })
    }
    render() {
        return (
            <Switch>
                {this.routerMap}
            </Switch>  
        )
    }
}

export default Router;