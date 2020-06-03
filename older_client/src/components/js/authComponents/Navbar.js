import React, { Component } from 'react'
import { logoutUser } from  '../../../actions/authActions'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import olderLogo from '../../img/logo_older.png'
import '../../css/Navbar.css'
import propTypes from 'prop-types'
import { getUserFavoriteList } from '../../../actions/favoriteActions'


export class Navbar extends Component {
    state = {
        isVisible: false,
        isAdmin: false
    }

    componentDidMount() {
        const userId = this.props.user._id
        this.props.getUserFavoriteList(userId)
        
        const isVerify = this.props.user.verify
        const isAdmin = this.props.user.status
        if(isVerify === true && isAdmin === true) {
            this.setState({ isAdmin: true })
        }
        else {
            this.setState({ isAdmin: false })
        }
    }

    hideMenu = () => {
        this.setState({isVisible: false})
    }

    showMenu = () => {
        this.setState({isVisible: true})
    }

    static propTypes = {
        logoutUser: propTypes.func.isRequired
    }

    render() {
    const name = this.props.user.username
    const authLinks = (
    <Link to ={'/'}>
    <img src={olderLogo} alt='older stream logo'/>
    </Link>
    )

    const adminLinks = (
    <Link to ={'/manageContent'}>
    <img src={olderLogo} alt='older stream logo'/>
    </Link>
    )

    const mobileMenu  = (
        <article className='NavbarMenuResponsive'>
            <div className='NavbarHome'>
                <p><Link to ={'/'}>home</Link></p>
            </div>
            <div className='NavbarPlaylist'>
                <p><Link to ={'/playlist'}>playlist</Link></p>
            </div>
            <div className='NavbarContact'>
                <p><Link to ={'/contact'}>contact</Link></p>
            </div>
            <div className='NavbarAccount'>
                <p><Link to ={'/account'}>account</Link></p>
            </div>
            <div className='NavbarLogout'>
                <p onClick={this.props.logoutUser}>logout</p>
            </div>
        </article>
        )
        const favorites = this.props.favorite
        return (
            <section className='NavbarBody'>
                <article className='NavbarLogo'>
                    {this.state.isAdmin ? adminLinks: authLinks}
                </article>
                <article className='NavbarLink'>
                    <ul className='NavbarLi'>
                        <li><Link to ={'/'}>home</Link></li>
                        <li><Link to ={'/playlist'}>playlist</Link><div className='NewAdded'>{favorites.length}</div></li>
                        <li><Link to ={'/contact'}>contact</Link></li>
                        <li><Link to ={'/account'}>account</Link></li>
                        <li onClick={this.props.logoutUser}><i className="fas fa-sign-out-alt"></i></li>
                    </ul>
                    <ul className='NavbarBurgerNav'>
                        <li className="BurgerNav">
                            <i 
                            onClick={this.state.isVisible ? this.hideMenu: this.showMenu} 
                            className={this.state.isVisible ? "far fa-window-close" : "fas fa-bars" }>
                            </i>
                        </li>
                    </ul>
                    <ul className='NavbarSayHi'>
                        <li>welcome {name}</li>
                    </ul>
                </article>
                {this.state.isVisible ? mobileMenu : null }
            </section>
        )
    }
}

Navbar.propTypes  = {
    user: propTypes.object.isRequired,
    getUserFavoriteList: propTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
    favorite: state.favoriteList.favoriteList
})

export default connect(
    mapStateToProps,
    {logoutUser,
    getUserFavoriteList}
    )(Navbar)