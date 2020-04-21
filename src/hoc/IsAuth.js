import React, { Component } from "react";
import {compose} from 'redux'
import {connect} from 'react-redux'
import {Route, withRouter} from 'react-router-dom'
import _ from 'lodash'

class IsAuth extends Component {
    state = {
        loading: true
    }
    async componentDidMount() {
        let {history} = this.props
        try {
            await this.checkUsername()
            this.setState({loading: false})
        } catch(_err) {
            return history.push('/login')
        }
    }
    async checkUsername() {
        let {authentication: {username}} = this.props
        if (_.isEmpty(username)) return Promise.reject()
        else return Promise.resolve()
    }
    render() {
        if (this.state.loading) return (<div />)
        return (
            <Route {...this.props}/>
        )
    }
}

const mapStateToprops = function(state) {
    return {
        authentication: state.authentication
    }
}

export default compose(
    withRouter,
    connect(mapStateToprops)
)(IsAuth);