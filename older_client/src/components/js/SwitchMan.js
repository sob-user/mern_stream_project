import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from '../js/guestComponents/Login'
import Register from '../js/guestComponents/Register'
import RegisterSuccess from '../js/guestComponents/RegisterSuccess'
import Home from '../js/authComponents/Home'
import Playlist from '../js/authComponents/Playlist'
import Contact from '../js/authComponents/Contact'
import Account from '../js/authComponents/Account'
import manageContent from '../js/adminComponents/manageContent'

class SwitchMan extends Component {

    render() {
    const { isAuthentificated } = this.props.auth;
    const { isAdmin } = this.props.auth

    const adminLinks = (
        <Route path='/manageContent' component={manageContent}/>
    )
    
    const authLinks = (
        <Fragment>
            <Route exact path='/' component={Home}/>
            <Route path='/playlist' component={Playlist}/>
            <Route path='/contact' component={Contact}/>
            <Route path='/account' component={Account}/>
            { isAdmin ? adminLinks: null }
        </Fragment>
    );

    const guestLinks = (
        <Fragment>
            <Route exact path='/' component={Login}/>
            <Route path='/register' component={Register}/>
            <Route path='/registerSuccess' component={RegisterSuccess}/>
        </Fragment>
    );

        return(
            <div>
                <BrowserRouter>
                <Switch>
                { isAuthentificated ? authLinks: guestLinks }
                </Switch>
                </BrowserRouter>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    error: state.error
});

export default connect(mapStateToProps, null)(SwitchMan);