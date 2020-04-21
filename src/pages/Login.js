import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import {setAuthenticationUsername} from '../stores/actions/authentication';
import {compose, bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import _ from 'lodash'

class Login extends Component {
    state = {
        username: '',
        password: ''
    }

    constructor(){
        super()
        this.handleName = this.handleName.bind(this)
        this.handlePassword = this.handlePassword.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleName(e) {
        this.setState({
            username: e.target.value
        })
    }

    handlePassword(e) {
        this.setState({
            password: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault()
        let err = [];
        if(this.state.username !== 'admin') {
            err.push('Username Anda Salah')
        }

        if(this.state.password !== 'admin123') {
            err.push('Password Anda Salah');
        }

        if(!_.isEmpty(err)) {
            return alert(err.join(' '));
        }

        this.props.authenticationDis.setUsername(this.state.username)
        this.props.history.push('/')
    }

    render() {
        let {username, password} = this.state
        return (
            <div className="container">
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="exampleUserName"> UserName </Label>
                        <Input
                            type="text"
                            name="username"
                            id="exampleUserName"
                            placeholder="username"
                            value={username}
                            onChange={this.handleName}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="examplePassword"> Password </Label>
                        <Input
                            type="password"
                            name="password"
                            id="examplePassword"
                            placeholder="password"
                            value={password}
                            onChange={this.handlePassword}
                        />
                    </FormGroup>
                    <Button type="submit"> Login </Button>
                </Form>
            </div>
        );
    }
}

const mapDispatchToprops = function (dispatch) {
    return {
        authenticationDis: bindActionCreators({
            setUsername: setAuthenticationUsername
        }, dispatch)
    }
}

export default compose(
    connect(null, mapDispatchToprops)
)(Login);
