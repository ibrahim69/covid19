import React, { Component } from 'react';
import { compose, bindActionCreators } from "redux";
import { connect } from "react-redux";
import {removeAuthenticationUsername} from '../stores/actions/authentication';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
} from 'reactstrap';
import {withRouter} from 'react-router-dom'
// import history from './history'

class Header extends Component {
    state = {
        isOpen: false,
        username: '',
        isActive: 0
    };

    constructor(props) {
        super(props);
        this.toggleOpen = this.toggleOpen.bind(this)
        this.handleLogout = this.handleLogout.bind(this)
    }

    toggleOpen() {
        let {isOpen} = this.state
        this.setState({
            isOpen: !isOpen
        })
    }

    handleLogout(e) {
        e.preventDefault();
        let { logoutDis, history } = this.props
        logoutDis.removeUsername(this.state.username)
        history.push('/login')
    }

    render() {
        let { loading, isOpen } = this.state;
        if (loading) {
            return <div />;
        }

        return (
            <div className="container">
                <Navbar color="light" light expand="md">
                    <NavbarBrand>Covid 19</NavbarBrand>
                    <NavbarToggler onClick={this.toggleOpen} />
                    <Collapse isOpen={isOpen} navbar>
                        <Nav className="mr-auto" navbar></Nav>
                        <Nav navbar>
                            <NavItem>
                                <NavLink>Home</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink onClick={this.handleLogout}>Logout</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}

const mapDispatchToprops = function (dispatch) {
    return {
        logoutDis: bindActionCreators({
            removeUsername: removeAuthenticationUsername
        }, dispatch)
    };
};

export default compose(withRouter, connect(null, mapDispatchToprops))(Header);
