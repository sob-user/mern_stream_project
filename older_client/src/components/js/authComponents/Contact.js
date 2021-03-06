import React, { Component } from 'react'
import { contactAdmin } from '../../../actions/mailActions'
import propTypes from 'prop-types'
import { connect } from 'react-redux'
import Navbar from './Navbar'
import '../../css/Contact.css'

class Contact extends Component {
    state= {
        object: '',
        message: '',
        msg: null,
        timer: false
    }

    componentDidUpdate(prevProps) {
        const { error } =  this.props;
        const { success } = this.props
        if(error !== prevProps.error || success !== prevProps.success) {
            if(error.id === 'CONTACT_ADMIN_FAIL') {
                this.setState({ msg: error.msg.msg || error.msg.error, timer: true })
            }
            else if (success.id === 'CONTACT_ADMIN_SUCCESS'){
                this.setState({ msg: 'mail has sent',
                                timer: true})
            }
        }

        if(this.state.timer === true) {
            this.timeout = setTimeout(() => {
                this.setState({ timer: false,
                                msg: null})
            }, 3000)
        }
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit = e => {
        e.preventDefault()
        const object = this.state.object
        const  message = this.state.message
        const userId = this.props.id
        if(object.length === 0 || message.length === 0) {
            this.setState({ msg: 'you nedd to fill all fields',
                            timer: true})
        }
        else {
        this.props.contactAdmin(userId, object, message)
        }
    }

    render() {
        return(
            <section className='ContactBody'>
                <Navbar/>
            <article className='ContactContent'>
                <div className='ContactPitch'>
                    <div className='ContactPitchOne'>
                        <p><i className="fas fa-quote-left"></i> And if we made an audio streaming site. 
                        Hmm yes it's cool but it's already seen! If this
                        site offers music that we are no longer used to listening. 
                        Not bad. And if it's free and without ads. Here we have something <i className="fas fa-quote-right"></i></p>
                    </div>
                    <div className='ContactPitchLink'>
                    <a href='https://www.linkedin.com/in/salem-o-9730b418a/' target='_blank' rel='noopener noreferrer'><i className="fab fa-linkedin"></i></a>
                    <a href='https://github.com/sob-user/mern_stream_project' target='_blank' rel='noopener noreferrer'><i className="fab fa-github-square"></i></a>
                    </div>
                </div>
                <div className='ContactFormContainer'>
                    <div className='ContactForm'>
                        <div className='ContactFormHeader'>
                            <h4>contact</h4>
                        </div>
                        { this.state.msg ? 
                        (<p style={{color: 'darkred', fontSize: '0.7em', fontFamily: 'Fjalla One'}}>
                        {this.state.msg }</p>) : null }
                        <div className='ContactFormBody'>
                            <form onSubmit={this.onSubmit}>
                                <input
                                type='object'
                                name='object'
                                id='object'
                                placeholder='object'
                                onChange={this.onChange}
                                />
                                <textarea
                                type='message'
                                name='message'
                                id='message'
                                placeholder='message'
                                onChange={this.onChange}
                                />
                                <input
                                type='submit'
                                value='send message'
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </article>
            </section>
        )
    }
}

Contact.propTypes  = {
    contactAdmin: propTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    id: state.auth.user._id,
    error: state.error,
    success: state.success
})

export default connect(
    mapStateToProps,
    {contactAdmin}
)(Contact)