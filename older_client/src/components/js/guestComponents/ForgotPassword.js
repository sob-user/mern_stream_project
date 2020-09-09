import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import olderHomeLogo from '../../img/logo_older.png';
import { resetPassword } from '../../../actions/resetPasswordAction';
import '../../css/ForgotPassword.css';

class ForgotPassword extends Component {
    state= {
        username: '',
        email: '',
        msg: null
    }

    componentDidUpdate(prevProps) {
        const { error } =  this.props;
        const { success } = this.props;

        if(error !== prevProps.error || success !== prevProps.success) {
            if(error.id === 'RESET_PASSWORD_FAIL') {
                this.setState({ msg: error.msg.msg || error.msg.error })
            }
            else if (success.status === 200){
                this.setState({ msg: 'reset mail sent' })
            }
        }
    }


    static propTypes = {
        error: propTypes.object.isRequired,
        success: propTypes.object.isRequired,
        resetPassword: propTypes.func.isRequired
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit = e => {
        e.preventDefault()
        const username = this.state.username;
        const email = this.state.email;

        if(username.length === 0 || email.length === 0) {
            this.setState({ msg: 'please fill all fields' });
        }
        else {
        this.props.resetPassword(username, email);
        }
    }

    render() {
        return(
            <section className='ForgotPasswordBody'>
                <article className='ForgotPasswordLogo'>
                    <img src={olderHomeLogo} alt='older stream logo'/>
                </article>
                <article className='ForgotPasswordForm'>
                    <form onSubmit={this.onSubmit}>
                        <h3>FORGOT PASSWORD</h3>
                        { this.state.msg ? 
                        (<p style={{color: 'darkred', fontSize: '0.8em'}}>
                        {this.state.msg }</p>) : null }
                        <input
                        type='email'
                        name='email'
                        id='email'
                        placeholder='email'
                        onChange={this.onChange}
                        />
                        <input
                        type='text'
                        name='username'
                        id='username'
                        placeholder='username'
                        onChange={this.onChange}
                        />
                        <input
                        type='submit'
                        value='SUBMIT'
                        />
                        <p><Link to={'/register'}>Dont't have an account? Create one now</Link></p>
                        <p><Link to={'/'}>If you have an account! Login here</Link></p>
                    </form>
                </article>
                <article className='ForgotPasswordFooter'>
                    <p>The goal of this site is to <br></br>
                    rediscovered music of <br></br>
                    yesteryear.
                    </p>
                </article>
            </section>
        )
    }
}

const mapStateToProps = state =>  ({
    error: state.error,
    success: state.success
})

export default connect(
    mapStateToProps,
    { resetPassword }
    )(ForgotPassword)