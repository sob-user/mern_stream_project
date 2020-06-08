import React, { Component } from 'react'
import Navbar from './Navbar'
import propTypes from 'prop-types'
import { connect } from 'react-redux'
import { 
modifyUsername,
modifyEmail,
modifyPassword,
deleteUserAccount
} from '../../../actions/authModifyAction'
import { loadUserAccount } from '../../../actions/authActions'
import { clearErrors } from '../../../actions/errorActions'
import '../../css/Account.css'

class Account extends Component {
    state = {
        toggleDelete: false,
        verified: false,
        username: '',
        email: '',
        currentPassword: '',
        password: '',
        msgUser: null,
        msgMail: null,
        msgPwd: null,
        msgDrop: null,
        timer: false
    }

    componentDidMount() {
        if(this.props.user.verify === true) {
            this.setState({ verified: true })
        }
        else {
            this.setState({ verified: false })
        }
    }

    componentDidUpdate(prevProps) {
        const { error } =  this.props;
        const { success } = this.props;
        const userId  = this.props.user._id
        const modifyUsernameSuccess = 'MODIFY_USERNAME_SUCCESS'
        const modifyUsernameFail = 'MODIFY_USERNAME_FAIL'
        const modifyMailContactSuccess = 'MODIFY_MAIL_CONTACT_SUCCESS'
        const modifyMailContactFail = 'this address is already taken'
        const modifyPasswordSuccess = 'MODIFY_PASSWORD_SUCCESS'
        const modifyPasswordFail = 'MODIFY_PASSWORD_FAIL'
        const deleteUserAccountFail = 'DELETE_USER_ACCOUNT_FAIL'
        const deleteUserAccountSuccess = 'DELETE_USER_ACCOUNT_SUCCESS'

        if(error !== prevProps.error || success !== prevProps.success) {
            if(success.id === modifyMailContactSuccess) {
                this.setState({ msgMail: success.msg.msg || success.msg.success,
                    timer:true})
                    this.props.loadUserAccount(userId)
            }
            else if(error.msg.msg === modifyMailContactFail) {
                this.setState({ msgMail: error.msg.msg || error.msg.error,
                    timer:true})
            }
            else if(error.id === modifyUsernameFail || success.id === modifyUsernameSuccess) {
                this.setState({ msgUser: error.msg.msg || error.msg.error ||
                    success.msg.msg || success.msg.success,
                    timer: true})
                    this.props.loadUserAccount(userId)
            }
            else if(error.id === modifyPasswordFail || success.id === modifyPasswordSuccess) {
                this.setState({ msgPwd: error.msg.msg || error.msg.error ||
                    success.msg.msg || success.msg.success,
                    timer: true})
            }
            else if(error.id === deleteUserAccountFail) {
                this.setState({ msgDrop: error.msg.msg || error.msg.error,
                                timer: true})
            }
            else if(success.id === modifyUsernameSuccess) {
                this.props.loadUserAccount(this.props.user._id)
            }
            else if(success.id === deleteUserAccountSuccess) {
                this.props.history.push('/accountDeleted')
            }
            else {
                this.setState({ msgUser: null,
                                msgMail: null,
                                msgPwd:null,
                                msgDrop:null
                })
            }
            }

            if(this.state.timer === true) {
                this.timeout = setTimeout(() => {
                    this.setState({ timer: false,
                                    msgUser: null,
                                    msgMail: null,
                                    msgPwd: null,
                                    msgDrop: null})
                }, 2000)
            }
        }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    updateUsername = e => {
        e.preventDefault()
        const userId = this.props.user._id
        const username = this.state.username
        if(username.length === 0) {
            this.setState({ msgUser: 'fill a new username',
                            timer: true})
        }
        else {
        this.props.modifyUsername(userId, username)
        }
    }

    updateEmail = e => {
        e.preventDefault()
        const userId = this.props.user._id
        const email = this.state.email
        if(email.length === 0) {
            this.setState({ msgMail: 'fill a new email',
                            timer: true})
        }
        else {
        this.props.modifyEmail(userId, email)
        }

    }

    updatePassword = e => {
        e.preventDefault()
        const userId = this.props.user._id
        const currentPassword = this.state.currentPassword
        const password = this.state.password
        if(currentPassword.length === 0 || password.length  === 0) {
            this.setState({ msgPwd: 'fill all fields',
                            timer: true})
        }
        else {
        this.props.modifyPassword(userId, currentPassword, password)
        }

    }

    dropUser = e => {
        e.preventDefault()
        const userId = this.props.user._id
        const password = this.state.password
        if(password.length === 0) {
            this.setState({ msgDrop: 'fill your password',
                            timer: true})
        }
        else {
        this.props.deleteUserAccount(userId, password)
        }
    }

    showUserInfo = () => {
        this.setState({toggleDelete: false})
    }

    showDeleteBox = () => {
        this.setState({toggleDelete: true})
    }
    render() {
        const user = this.props.user

        const accountIsVerify = (
        <p style={{color:'darkgreen'}}>status: verified <i className="fas fa-check-circle"></i></p>
        )

        const accountNotVerify = (
        <p style={{color:'darkorange'}}>status unverified <i className="fas fa-ban"></i></p>
        )

        const userInfo = (
        <div className="BoxForm">
        <div className='BoxFormTitle'>
        <h3>user information</h3>
        </div>
        <div className='BoxFormInput'>
        <div className='AccountUsername'>
        <p>username: {user.username}</p>
        </div>
        <div className='AccountEmail'>
        <p>email: {user.email}</p>
        </div>
        <div className='AccountVerify'>
        {this.state.verified ? accountIsVerify: accountNotVerify}
        </div>
        <div className='AccountDelete' onClick={this.state.toggleDelete ? null: this.showDeleteBox}>
        <p>delete account</p>
        </div>
        </div>
        </div>
        )

        const deleteUser = (
        <div className='BoxForm'>
        <div className='DeleteAccountMessage'>
        <div onClick={this.state.toggleDelete ? this.showUserInfo: null}
        className='CancelDelete'>
            <i className="fas fa-times"></i>
        </div>
        <p>type your password and submit</p>
        </div>
        <div className='BoxMsg'>
        { this.state.msgDrop ? 
        (<p className='Msg'>
        {this.state.msgDrop }</p>) : null }
        </div>
        <div className='DeleteAccountForm'>
        <form onSubmit={this.dropUser}>
        <input
        type='password'
        name='password'
        placeholder='password'
        id='password'
        onChange={this.onChange}
        />
        <input
        type='submit'
        value='DELETE ACCOUNT'
        />
        </form>
        </div>
        </div>
        )

        return(
            <section className='AccountBody'>
                <Navbar/>
            <article className='AccountContainer'>
                <div className='AccountFormBox'>
                    <div className='AccountBox'>
                        <div className="BoxForm">
                            <div className='BoxFormTitle'>
                                <h3>modify username</h3>
                            </div>
                            <div className='BoxMsg'>
                            { this.state.msgUser ? 
                            (<p className='Msg'>
                            {this.state.msgUser }</p>) : null }
                            </div>
                            <div className='BoxFormInput'>
                            <form onSubmit={this.updateUsername}>
                            <input
                            type='text'
                            name='username'
                            placeholder='username'
                            id='username'
                            onChange={this.onChange}
                            />
                            <input
                            type='submit'
                            value='SUBMIT'
                            />
                            </form>
                            </div>
                        </div>
                    </div>
                    <div className='AccountBox'>
                        <div className="BoxForm">
                            <div className='BoxFormTitle'>
                            <h3>modify email</h3>
                            </div>
                            <div className='BoxMsg'>
                            { this.state.msgMail ? 
                            (<p className='Msg'>
                            {this.state.msgMail }</p>) : null }
                            </div>
                            <div className='BoxFormInput'>
                            <form onSubmit={this.updateEmail}>
                            <input
                            type='email'
                            name='email'
                            placeholder='email'
                            id='email'
                            onChange={this.onChange}
                            />
                            <input
                            type='submit'
                            value='SUBMIT'
                            />
                            </form>
                            </div>
                        </div>
                    </div>
                    <div className='AccountBox'>
                        <div className="BoxForm">
                            <div className='BoxFormTitle'>
                            <h3>modify password</h3>
                            </div>
                            <div className='BoxMsg'>
                            { this.state.msgPwd ? 
                            (<p className='Msg'>
                            {this.state.msgPwd }</p>) : null }
                            </div>
                            <div className='BoxFormInput'>
                            <form onSubmit={this.updatePassword}>
                            <input
                            type='password'
                            name='currentPassword'
                            placeholder='current password'
                            id='currentPassword'
                            onChange={this.onChange}
                            />
                            <input
                            type='password'
                            name='password'
                            placeholder='new password'
                            id='newPassword'
                            onChange={this.onChange}
                            />
                            <input
                            type='submit'
                            value='SUBMIT'
                            />
                            </form>
                            </div>
                        </div>
                    </div>
                    <div className='AccountBox'>
                    {this.state.toggleDelete ? deleteUser : userInfo }
                    </div>
                </div>
            </article>
            </section>
        )
    }
}

Account.propTypes  = {
    modifyUsername: propTypes.func.isRequired,
    modifyEmail: propTypes.func.isRequired,
    modifyPassword: propTypes.func.isRequired,
    deleteUserAccount: propTypes.func.isRequired,
    loadUserAccount: propTypes.func.isRequired,
    clearErrors:  propTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
    error: state.error,
    success : state.success
})

export default connect(
mapStateToProps,
{modifyUsername,
modifyEmail,
modifyPassword,
deleteUserAccount,
loadUserAccount,
clearErrors}
)(Account)