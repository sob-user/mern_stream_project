import React, { Component } from 'react';
import olderHomeLogo from '../../img/logo-older-home.png' 
import propTypes from 'prop-types'
import { connect } from 'react-redux'
import { clearErrors } from '../../../actions/errorActions';
import { logoutUser } from '../../../actions/authActions'
import '../../css/RegisterSuccess.css';

class DeleteAccountSuccess extends Component {
    componentDidMount() {
        this.props.clearErrors()
        this.timeout = setTimeout(() => {
        this.props.logoutUser()
        }, 5000)
    }

    static propTypes = {
        error: propTypes.object.isRequired,
        clearErrors: propTypes.func.isRequired,
        logoutUser: propTypes.func.isRequired
    }

    componentWillUnmount() {
        clearTimeout(this.timeout)
    }
    render() {
        return(
            <section className='RegisterSuccessBody'>
                <article className='RegisterSuccessLogo'>
                    <img src={olderHomeLogo} alt='logo older stream'/>
                </article>
                <article className='RegisterSuccessMessage'>
                    <p>your account was deleted with success, bye</p>
                </article>
                <article className='RegisterSuccessHandYes'>
                    <i className="fas fa-hand-spock"></i>
                </article>
            </section>
        )
    }
}

const mapStateToProps = state =>  ({
    error: state.error
})

export default 
connect(
mapStateToProps,
{clearErrors,
logoutUser}
)
(DeleteAccountSuccess)