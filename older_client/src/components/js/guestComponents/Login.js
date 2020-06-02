import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import olderLogo from '../../img/logo_older.png'
import { loginUser } from '../../../actions/authActions'
import '../../css/Login.css';

class Login extends Component {
    state= {
        email: '',
        password: '',
        msg: null
    }

    componentDidUpdate(prevProps) {
        const { error } =  this.props;
        if(error !== prevProps.error) {
            if(error.id === 'LOGIN_FAIL') {
                this.setState({ msg: error.msg.msg || error.msg.error })
            }
            else {
                this.setState({ msg: null })
            }
        }
    }


    static propTypes = {
        error: propTypes.object.isRequired,
        loginUser: propTypes.func.isRequired
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit = e => {
        e.preventDefault()
        const { email, password } = this.state
        const user = {  email, password }
        if(email.length === 0 || password.length === 0) {
            this.setState({ msg: 'please fill all fields' })
        }
        else {
        this.props.loginUser(user)
        }
    }

    render() {
        return(
            <section className='LoginPageBody'>
                <article className='LoginPageLogo'>
                    <img src={olderLogo} alt='older stream logo'/>
                </article>
                <article className='LoginPageForm'>
                    <form onSubmit={this.onSubmit}>
                        <h3>LOGIN</h3>
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
                        type='password'
                        name='password'
                        id='password'
                        placeholder='password'
                        onChange={this.onChange}
                        />
                        <input
                        type='submit'
                        value='LOGIN'
                        />
                        <p>If you don't have an account, <Link to={'/register'}>register</Link></p>
                    </form>
                </article>
                <article className='LoginPageFooter'>
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
    error: state.error
})

export default connect(
    mapStateToProps,
    { loginUser }
    )(Login)