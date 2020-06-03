import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { registerNewUser } from '../../../actions/authActions';
import { clearErrors } from '../../../actions/errorActions';
import olderHomeLogo from '../../img/logo-older-home.png'
import { Link } from 'react-router-dom';
import '../../css/Register.css';

class Register extends Component {
    state= {
        username: '',
        email: '',
        password: '',
        msg: null
    }

    componentDidUpdate(prevProps) {
        const { error } = this.props
        const { success } = this.props

        if(error !== prevProps.error || success !== prevProps.success) {
            if(error.id  === 'REGISTER_FAIL') {
                this.setState({ msg: error.msg.msg || error.msg.error })
            }
            else {
                this.setState({  msg: null })
            }
        }
        
        if(success.id  === 'REGISTER_SUCCESS') {
            this.props.history.push('/registerSuccess')
        }
    }

    static propTypes = {
        error:  propTypes.object.isRequired,
        registerNewUser: propTypes.func.isRequired,
        clearErrors: propTypes.func.isRequired
    }

    onChange  = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit = e => {
        e.preventDefault()

        const { username, email, password } = this.state
        const newUser = { username, email, password }
        if(username.length ===0 || email.length === 0 || password.length ===0) {
            this.setState({ msg: 'please fill all fields' })
        }
        else {
        this.props.registerNewUser(newUser)
        }
    }

    render() {
        return(
            <section className='RegisterPageBody'>
                <article className='RegisterPageLogo'>
                    <img src={olderHomeLogo} alt='stream older logo'/>
                </article>
                <article className='RegisterPageForm'>
                    <form onSubmit={this.onSubmit}>
                        <h3>REGISTER</h3>
                        { this.state.msg ? 
                        (<p style={{color: 'darkred', fontSize:'0.8em'}}>
                        {this.state.msg }</p>) : null }
                        <input
                        type='text'
                        name='username'
                        placeholder='username'
                        id='username'
                        onChange={this.onChange}
                        />
                        <input
                        type='email'
                        name='email'
                        placeholder='email'
                        id='email'
                        onChange={this.onChange}
                        />
                        <input
                        type='password'
                        name='password'
                        placeholder='password'
                        id='password'
                        onChange={this.onChange}
                        />
                        <input
                        type='submit'
                        value='REGISTER'
                        />
                        <p><i className="fas fa-laugh-wink"></i> we are almost there <i className="fas fa-arrow-right"></i> <Link to={'/'}>login here</Link></p>
                    </form>
                </article>
                <article className='RegisterPageFooter'>
                    <p>The goal of this site is to <br></br>
                    rediscovered music of <br></br>
                    yesteryear.
                    </p>
                </article>
            </section>
        )
    }
}

const mapStateToProps = state => ({
    error: state.error,
    success: state.success
})

export default connect(
    mapStateToProps,
    {registerNewUser,
    clearErrors}
    )(Register)