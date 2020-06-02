import React, { Component } from 'react'
import { getUserFavoriteList } from '../../../actions/favoriteActions'
import { deleteToFavorite } from '../../../actions/authModifyAction'
import { playerLoaded } from '../../../actions/playerActions'
import { loadingPlayer } from '../../../actions/playerActions'
import Player from './Player'
import propTypes from 'prop-types'
import { connect } from 'react-redux'
import Navbar from './Navbar'
import '../../css/Playlist.css'

class Playlist extends Component {
    state= {
        editOrDone: false,
        isOpen: false
    }

    componentDidMount() {
        const userId = this.props.id
        this.props.getUserFavoriteList(userId)
    }

    componentDidUpdate(prevProps) {
        const { success } = this.props
        const userId = this.props.id
        const isLoading = this.props.player.isLoading
        const { player } = this.props

        if(player !== prevProps.player) {
            if(isLoading === true) {
                this.setState({ isOpen: true })
            }
            else {
                this.setState({ isOpen: false })
            }
        }

        if(success !== prevProps.success) {
            if(success.id === 'DELETE_TO_FAVORITE_LIST_SUCCESS') {
                this.props.getUserFavoriteList(userId)
            }
        }

        if(this.props.favorite.length !== 0) {
            if(this.state.notEmpty !== true) {
                this.setState({ notEmpty: true })
            }
        }
    }

    loadPlayer = () => {
        const music = this.props.favorite
        if(music.length > 0) {
        this.props.loadingPlayer()
        this.loadMusic(music)
        }
    }

    loadMusic = (music) => {
        this.props.playerLoaded(music) 
    }

    edit = () => {
        this.setState({editOrDone: false})
    }

    done = () => {
        this.setState({editOrDone: true})
    }

    deleteFavorite = (musicId) => {
        const userId = this.props.id
        this.props.deleteToFavorite(userId, musicId)
    }

    render() {
        const player = ( <Player/> )
        const favorites = this.props.favorite
        const edit  = ( <i className="fas fa-unlock"></i> )
        const done  = ( <i className="fas fa-lock"></i> )
        return(
            <section className='PlaylistBody'>
                <Navbar/>
            <article className='PlaylistControl'>
                <div className='PlaylistButton' onClick={this.loadPlayer}>
                    <i className="fas fa-play"></i>
                </div>
                <div onClick={this.state.editOrDone ? this.edit: this.done} 
                className='PlaylistButton'>
                    {this.state.editOrDone ? done : edit }
                </div>
            </article>
            <article className='PlaylistList'>
                <div className='PlaylistContainer'>
                {favorites.map((favorite) => (
                    <div key={favorite.id} className='PlaylistItem'>
                        <div className='PlaylistImg' 
                        style={{background:`url(${favorite.imageSource})`,
                        backgroundSize: 'cover'}}>
                        <div className='PlaylistDelete'
                        style={{display: this.state.editOrDone ? 'flex' : 'none' }}
                        onClick={this.deleteFavorite.bind(this, favorite.id)}>
                            <i className="fas fa-trash-alt"></i>
                        </div>
                        </div>
                        <div className='PlaylistMusicInfo'>
                            <div className='PlaylistAuthor'>
                                <h3>{favorite.author}</h3>
                            </div>
                            <div className='PlaylistTitle'>
                                <h3>{favorite.title}</h3>
                            </div>
                            <div className='PlaylistParutionDate'>
                                <p>{favorite.parutionDate}</p>
                            </div>
                            <div className ='PlaylistStyle'>
                            {favorite.style.map((style, index) => (
                                <div key={index} className='PlayListItemStyle'>
                                    <p>{style}</p>
                                </div>
                            ))}
                            </div>
                        </div>
                    </div>
                    ))}
                </div>
            </article>
            {this.state.isOpen ? player : null }
            </section>
        )
    }
}

Playlist.propTypes  = {
    getUserFavoriteList: propTypes.func.isRequired,
    deleteToFavorite: propTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    id: state.auth.user._id,
    favorite: state.favoriteList.favoriteList,
    success : state.success,
    player: state.player,
    loadingPlayer: propTypes.func.isRequired,
    playerLoaded: propTypes.func.isRequired
})

export default connect(
mapStateToProps,
{getUserFavoriteList,
deleteToFavorite,
loadingPlayer,
playerLoaded}
)(Playlist)