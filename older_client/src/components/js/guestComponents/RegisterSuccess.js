import React, { Component } from 'react';
import olderHomeLogo from '../../img/logo-older-home.png' 
import propTypes from 'prop-types'
import { connect } from 'react-redux'
import { clearErrors } from '../../../actions/errorActions';
import '../../css/RegisterSuccess.css';

class RegisterSuccess extends Component {
    componentDidMount() {
        this.props.clearErrors()
        this.timeout = setTimeout(() => {
        this.props.history.push('/')
        }, 5000)
    }

    static propTypes = {
        error: propTypes.object.isRequired,
        clearErrors: propTypes.func.isRequired
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
                    <p>your account was created with success, thanks and enjoy us</p>
                </article>
                <article className='RegisterSuccessHandYes'>
                    <i className="fas fa-thumbs-up"></i>
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
    {clearErrors}
)
(RegisterSuccess)