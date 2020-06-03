import React, { Component } from 'react'
import '../../css/Player.css'
import propTypes from 'prop-types'
import { connect } from 'react-redux'
import { 
unloadPlayer, 
playerPlay,
playerPause, 
playerStop, 
playerNext, 
playerPrevious 
} from '../../../actions/playerActions'
import { addToFavorite } from '../../../actions/authModifyAction'
import { getUserFavoriteList } from '../../../actions/favoriteActions'

class Player extends Component {
    _componentIsMounted =  false

    state = {
        onPlay: false,
        onStop: true,
        duration: null,
        currentTime: null,
        showMenu: false,
        mute: false,
        id: null,
        title: null,
        author: null,
        cover: null,
        audio: null,
        position: 0,
        maxPosistion: null,
        alreadyAdded: false,
        addSuccess: false,
        timer: false
    }

    componentDidMount() {
        this._componentIsMounted =  true

        const userId = this.props.user._id
        this.props.getUserFavoriteList(userId)
        
        const { success } = this.props
        const tracks  = this.props.player.tracks[this.state.position]
        const tracksLength = this.props.player.tracks.length

        
        this.setState({
            id: tracks.id,
            title: tracks.title,
            author: tracks.author,
            audio: tracks.audioSource,
            cover: tracks.imageSource,
            maxPosistion: tracksLength - 1
        })
            
        if(success.id === 'PLAYER_LOADED') {
                this.setState({
                onPlay: true, 
                onStop: false
                })
                this.props.playerPlay()
            }

            
            this.TracksLoaded.addEventListener("timeupdate", e => {
                if(this._componentIsMounted) {
                this.setState({
                    duration: e.target.duration,
                    currentTime: e.target.currentTime
                })
            }
            })
            
    }

    componentWillUnmount() {
        this._componentIsMounted = false
        this.TracksLoaded.removeEventListener("timeupdate", () => {});
        this.timeout = clearTimeout(() => {})
    }

    componentDidUpdate(prevProps) {
        const { success } = this.props
        const userId = this.props.user._id
        const tracks  = this.props.player.tracks

        if(success !== prevProps.success) {
            if(success.id === 'PLAYER_LOADED') {
                
            }
            else if(success.id === 'PLAYER_ON_PLAY') {
                this.TracksLoaded.play()
                this.playMusic()
            }
            else if(success.id === 'PLAYER_ON_PAUSE') {
                this.TracksLoaded.pause()
                this.pauseMusic()
            }
            else if(success.id === 'PLAYER_ON_STOP') {
                this.unloadTrack()
            }
            else if(success.id === 'ADD_TO_FAVORITE_LIST_SUCCESS') {
                this.props.getUserFavoriteList(userId)
                this.setState({ addSuccess: true,
                                timer: true})
            }
            else if(success.id === 'PLAYER_PLAY_NEXT') {
                this.setState({ 
                    id: tracks[this.state.position].id,
                    title: tracks[this.state.position].title,
                    author: tracks[this.state.position].author,
                    audio: tracks[this.state.position].audioSource,
                    cover: tracks[this.state.position].imageSource
                })
                this.props.playerPlay()
            }
            else if(success.id === 'PLAYER_PLAY_PREVIOUS') {
                this.setState({ 
                    id: tracks[this.state.position].id,
                    title: tracks[this.state.position].title,
                    author: tracks[this.state.position].author,
                    audio: tracks[this.state.position].audioSource,
                    cover: tracks[this.state.position].imageSource
                })
                this.props.playerPlay()
            }
        }

        if(this.props.player.isLoading !== false) {
            if(this.state.id !== null) {
            if(this.state.alreadyAdded !==  true) {
                const favorites = this.props.favorite

                favorites.map(this.checkIfExistInPlaylist)
            }
            }
        }

        if(this.state.timer !== false) {
            this.timeout = setTimeout(() => {
                if(this._componentIsMounted) {
                this.setState({ timer: false,
                                addSuccess: false
                })}
                }, 3000)
                
        }

        if(this.state.duration === this.state.currentTime) {
            if(this.state.duration !== null && this.state.currentTime !== null) {
                if(this._componentIsMounted) {
                    this.nextMusic()
                }
            } 
        }

            
        if(this._componentIsMounted) {
            if(this.state.onPlay === true) {
            const favoriteLength = this.state.maxPosistion
            const lastMusicId = this.props.favorite[favoriteLength].id
            const currentId = this.state.id
            console.log(lastMusicId, currentId)
        }}
    }

    checkIfExistInPlaylist = (favorite) => {
        const currentId = this.state.id
        if(favorite.id === currentId) {
            this.setState({ alreadyAdded: true })
        }
    }

    playMusic  = () => {
        this.setState({ onPlay: true })
        if(this.state.onPlay !== true) {
            this.props.playerPlay()
        }
    }

    pauseMusic  = () => {
        this.setState({ onPlay: false })
        if(this.state.onPlay !== false) {
            this.props.playerPause()
        }
    }

    nextMusic  = () => {
        const maxPosition = this.state.maxPosistion
        const currentPosition = this.state.position
        if(maxPosition !== 0) {
            if(currentPosition !== maxPosition) {
                this.setState({ position: currentPosition + 1 })
                this.props.playerNext()
            }
        }
        
    }

    previousMusic  = () => {
        const maxPosition = this.state.maxPosistion
        const currentPosition = this.state.position
        if(maxPosition !== 0) {
            if(currentPosition !== 0) {
                this.setState({ position: currentPosition - 1 })
                this.props.playerPrevious()
            }
        }
    }

    muteMusic = () => {
        this.TracksLoaded.muted = true
        this.setState({ mute: true })
    }

    unMuteMusic = () => {
        this.TracksLoaded.muted = false
        this.setState({ mute: false })
    }

    unloadTrack  = () => {
        this.setState({ 
            onStop: true,
            onPlay: false})
    }

    structureAndConvertTime = (time) => {
        if(!isNaN(time)) {
            return Math.floor(time / 60) + ':' + ('0' + Math.floor(time % 60)).slice(-2)
        }
    }

    closePlayer = () => {
        this.props.unloadPlayer()
        this.setState({ onStop: true })
    }

    openMenu = () => {
        this.setState({ showMenu: true })
    }

    closeMenu = () => {
        this.setState({ showMenu: false })
    }

    FavoriteListAdded = (musicId) => {
        const user = this.props.user
        const userId = user._id
        this.props.addToFavorite(userId, musicId)
    }

    render() {
        const duration = this.structureAndConvertTime(this.state.duration)
        const currentTime = this.structureAndConvertTime(this.state.currentTime)
        const progressBar = this.state.currentTime / this.state.duration * 100

        const playButton = (
            <i onClick={this.playMusic} className="far fa-play-circle"></i>
        )
        const pauseButton = (
            <i onClick={this.pauseMusic} className="far fa-pause-circle"></i>
        )

        const controller = (
            <div className='PlayerBoxController'>
            <i onClick={this.previousMusic} className="fas fa-arrow-left"></i>
            {this.state.onPlay ? pauseButton : playButton }
            <i onClick={this.nextMusic} className="fas fa-arrow-right"></i>
            </div> 
        )
        const mute = (<p onClick={this.muteMusic}>mute <i className="fas fa-volume-mute"></i></p>)
        const unMute = (<p onClick={this.unMuteMusic}>unmute <i className="fas fa-volume-off"></i></p>)
        const menu = (
        <div className='PlayerBoxMenuOptions'>
            <div className='PlayerBoxOptions'>
                <div className='PlayerAddFavorite'>
                {this.state.alreadyAdded ? null : 
                    <p onClick={this.FavoriteListAdded.bind(this, this.state.id)}>add to favorite <i className="fas fa-heart"></i></p>}
                </div>
                <div className='PlayerMuteSong'>
                    {this.state.mute ? unMute : mute }
                </div>
            </div>
        </div>
        )

        const ellipsisH = (
            <i onClick={this.openMenu} className="fas fa-ellipsis-h"></i>
        )
        const ellipsisV = (
            <i onClick={this.closeMenu} className="fas fa-ellipsis-v"></i>
        )
        const displayAddSuccess = (
            <div className='DisplayAddSuccess'>
                <p>add with  success</p>
            </div>
        )

        return(
            <section className='PlayerBoxBody'>
            <article className='PlayerBox'>
                <div className='PlayerBoxClose'>
                    <i onClick={this.closePlayer} className="fas fa-times"></i>
                </div>
                <div className='PlayerBoxContent'>
                    <div className='PlayerBoxCover'>
                    {this.state.addSuccess ? displayAddSuccess : <img src={this.state.cover} alt={this.state.author}/> }
                    </div>
                    {this.state.showMenu ? menu : controller }
                    <div className='PlayerBoxMenu'>
                    {this.state.showMenu ? ellipsisV : ellipsisH }
                    </div>
                    <div className='PlayerBoxInfo'>
                        <div className='PlayerBoxInfoAuthor'>
                            <h4>{this.state.author}</h4>
                        </div>
                        <div className='PlayerBoxInfoTitle'>
                            <h4>{this.state.title}</h4>
                        </div>
                        <div className='PlayerBoxInfoTimeProgress'>
                            <div className='PlayerBoxProgressBar'>
                                <div className='PlayerBoxProgression' 
                                style={{
                                    width:`${this._componentIsMounted ? progressBar : 0 }%`
                                }}>
                                </div>
                            </div>
                            <div className='PlayerBoxTimeProgression'>
                                <p>{currentTime} | {duration}</p>
                            </div>
                        </div>
                    </div> 
                </div>
                <audio
                ref={ref => (this.TracksLoaded = ref)}
                src={this.state.audio}
                id={this.state.id}
                />
            </article>
            </section>
        )
    }
}

Player.propTypes  = {
    unloadPlayer: propTypes.func.isRequired,
    playerPlay: propTypes.func.isRequired,
    playerPause: propTypes.func.isRequired,
    playerStop: propTypes.func.isRequired,
    playerPrevious: propTypes.func.isRequired,
    playerNext: propTypes.func.isRequired,
    addToFavorite: propTypes.func.isRequired,
    getUserFavoriteList: propTypes.func.isRequired,
    player: propTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    player: state.player,
    success : state.success,
    user: state.auth.user,
    favorite: state.favoriteList.favoriteList
})

export default connect(
mapStateToProps,
{unloadPlayer,
playerPlay,
playerPause,
playerStop,
addToFavorite,
getUserFavoriteList,
playerNext,
playerPrevious}
)(Player)