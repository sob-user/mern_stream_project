import React, { Component } from 'react';
import { loadUserAccount } from '../../../actions/authActions'
import { getMusicItems } from '../../../actions/musicItemAction'
import { playerLoaded } from '../../../actions/playerActions'
import { loadingPlayer } from '../../../actions/playerActions'
import { clearErrors } from '../../../actions/errorActions'
import propTypes from 'prop-types'
import { connect } from 'react-redux'
import '../../css/Home.css'
import Navbar from './Navbar'
import Player from './Player'


class Home extends Component {
    state={
        isOpen: false
    }
    componentDidMount() {
        this.props.loadUserAccount();
        this.props.getMusicItems()
        this.props.clearErrors()
    }

    componentDidUpdate(prevProps) {
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
    }

    loadPlayer = (music) => {
        this.props.loadingPlayer()
        this.loadMusic([music])
    }

    loadMusic = (music) => {
        this.props.playerLoaded(music) 
    }

    render() {
    const player = ( <Player/> )
    const { items } = this.props.musicItems
        return (
            <section className='HomeBody'>
                <Navbar/>
            <article className='HomeMusicList'>
                <div className='HomeMusicListContainer'>
                    {items.map((music) => (
                    <div key={music.id} className='HomeMusicItem'>
                    <div className='HomeMusicItemAuthor'>
                        <h3>{music.author} - {music.parutionDate}</h3>
                    </div>
                    <div className='HomeMusicItemImg'>
                        <img src={music.imageSource} alt={music.author}/>
                    </div>
                    <div className='HomeMusicItemFooter'>
                        <div className='HomeMusicItemTitle'>
                            <p>{music.title}</p>
                        </div>
                        <div className='HomeMusicItemPlay'>
                        <i onClick={this.loadPlayer.bind(this, music)} className="far fa-play-circle"></i>
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

Home.propTypes  = {
    loadUserAccount: propTypes.func.isRequired,
    getMusicItems: propTypes.func.isRequired,
    musicItems: propTypes.object.isRequired,
    clearErrors: propTypes.func.isRequired,
    loadingPlayer: propTypes.func.isRequired,
    playerLoaded: propTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
    musicItems: state.music,
    player: state.player
})

export default connect(
    mapStateToProps,
    {loadUserAccount,
    getMusicItems,
    clearErrors,
    loadingPlayer,
    playerLoaded}
)(Home)