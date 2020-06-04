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
import history from '../../history'

class SwitchMan extends Component {

    componentDidUpdate(prevProps) {
        const { error } =  this.props
        const errorMsg = 'No token, authorization denied'
        const History = history.location.pathname
        const home = '/'

        if(error !== prevProps.error) {
            if(error.msg.msg === errorMsg) {
                if(History !== home) {
                    window.location = '/'
                }
            }}

        if(this.props.auth.isLoading === '') {
            window.location = '/'
        }
    }

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