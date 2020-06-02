import React, { Component } from 'react';
import '../../css/AddContent.css'
import Navbar from '../authComponents/Navbar'
import propTypes from 'prop-types'
import { connect } from 'react-redux'
import { addContent, deleteContent } from '../../../actions/adminActions'
import { getMusicItems } from '../../../actions/musicItemAction'

class manageContent extends Component {
    state= {
        title: '',
        author: '',
        parutionDate: '',
        addImgFile: '',
        addSongFile: '',
        musicStyle: [],
        style: '',
        msg: null,
        timer: false,
        toogle: false,
        toogleUnlock: false
    }

    componentDidMount() {
        this.props.getMusicItems()
    }

    componentDidUpdate(prevProps) {
        const { error } =  this.props;
        const { success } = this.props
        const addContentSuccess = 'ADD_CONTENT_SUCCESS'
        const addContentFail = 'ADD_CONTENT_FAIL'

        if(error !== prevProps.error || success !== prevProps.success) {
            if(error.id === addContentFail || success.id === addContentSuccess) {
                this.setState({ msg: error.msg.msg || error.msg.error ||
                    success.msg.msg || success.msg.success,
                    timer:true})
            }
            else if(success.id === 'DELETE_CONTENT_SUCCESS') {
                this.props.getMusicItems()
            }
            }

            if(this.state.timer === true) {
                this.timeout = setTimeout(() => {
                    this.setState({ msg: null,
                                    timer: false})
                }, 3000)
            }
        }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    onChangeFile = e => {
        this.setState({ [e.target.name]: e.target.files[0] })
    }

    addStyle = () => {
        const newStyle = this.state.style

        if(newStyle.length > 0) {
        this.setState(prevState => ({
            musicStyle: [...prevState.musicStyle, newStyle],
            style: ''
        }))
        }
        else {
            this.setState({ msg: 'please add an no empty style',
                            timer: true})
        }
    }
    
    removeStyle = (index) => {
        this.setState({
            musicStyle: this.state.musicStyle.filter((_, i) => i !== index)
        });
    }

    onSubmit = e => {
        e.preventDefault()
        const user_id = this.props.id
        const title = this.state.title
        const  author = this.state.author
        const style = this.state.musicStyle
        const parution_date = this.state.parutionDate
        const audio = this.state.addSongFile
        const image = this.state.addImgFile

        if(title.length === 0 || author.length === 0 ||
            style.length === 0 || parution_date.length === 0 ||
            audio.length === 0 || image.length === 0) {
                this.setState({ msg: 'fill all fields',
                                timer: true})
        }
        else {
        this.props.addContent(user_id, title, author, style, parution_date, audio, image)
        }
    }

    toogleAdd = () => {
        this.setState({ toogle: false })
    }

    toogleDelete = () => {
        this.setState({ toogle: true })
    }

    toogleLock = () => {
        this.setState({ toogleUnlock: false })
    }

    toogleUnlock = () => {
        this.setState({ toogleUnlock: true })
    }

    deleteItems = (musicId) => {
        const userId = this.props.id
        this.props.deleteContent(userId, musicId)
    }

    render() {
        const itemsMusic = this.props.musicItems.items
        const labelStyle = this.state.musicStyle
        const addMusic = (
            <div className='AddContentBoxTitle'>
            <h3>add music items</h3>
            <p onClick={this.toogleDelete}>delete music items</p>
            </div>
        )
        const lock = <i onClick={this.toogleUnlock} className="fas fa-toggle-off"></i>
        const unlock = <i onClick={this.toogleLock} className="fas fa-toggle-on"></i>
        const deleteMusic = (
            <div className='AddContentBoxTitle'>
            <h3>delete music items</h3>
            <p onClick={this.toogleAdd}>add music items</p>
            {this.state.toogleUnlock ? unlock : lock }
            </div>
        )

        const addContentForm = (
            <div className='AddContentBoxForm'>
                        <form onSubmit={this.onSubmit}>
                            <input
                            type='text'
                            name='title'
                            id='title'
                            placeholder='title'
                            onChange={this.onChange}
                            />
                            <input
                            type='text'
                            name='author'
                            id='author'
                            placeholder='author'
                            onChange={this.onChange}
                            />
                            <input
                            type='text'
                            name='parutionDate'
                            id='parutionDate'
                            placeholder='parution date'
                            onChange={this.onChange}
                            />
                            <p>add image</p>
                            <input
                            type='file'
                            name='addImgFile'
                            id='addImgFile'
                            onChange={this.onChangeFile}
                            />
                            <p>add song</p>
                            <input
                            type='file'
                            name='addSongFile'
                            id='addSongFile'
                            onChange={this.onChangeFile}
                            />
                            <input
                            type='text'
                            name='style'
                            id='style'
                            placeholder='add music style'
                            value={this.state.style}
                            onChange={this.onChange}
                            />
                            <div
                            className='buttonStyleBox'>
                            <div
                            className='buttonAddStyle'
                            onClick={this.addStyle}>
                            ADD STYLE
                            </div>
                            </div>
                            <div className='AddContentMusicStyle'>
                            {labelStyle.map((style, index) => (
                            <div key={index}
                            className='boxStyleAdded'>
                                <div>
                                <p>{style}</p>
                                </div>
                                <div>
                                <i 
                                onClick={this.removeStyle.bind(this, index)}
                                className="far fa-times-circle"></i>
                                </div>
                            </div>
                            ))}
                            </div>
                            <input
                            type='submit'
                            value='ADD CONTENT'
                            />
                        </form>
                    </div>
        )

        const items = (
            <div className='ItemBox'>
                {itemsMusic.map((music) => (
                <div key={music.id} className='ItemBoxItem'>
                <div onClick={this.deleteItems.bind(this, music.id)} 
                className='ItemBoxItemDelete'
                style={{display: `${this.state.toogleUnlock ? 'flex' : 'none'}`}}>
                <i className="fas fa-trash"></i>
                </div>
                    <div className='ItemBoxItemInfo'>
                    <h4>{music.author}</h4>
                    <p>{music.title}</p>
                    <p>id: {music.id}</p>
                    </div>
                </div>
                ))}
            </div>
        )

        return (
            <section className='AddContentBody'>
                <Navbar/>
            <article className='AddContent'>
                <div className='AddContentBox'>
                {this.state.toogle ? deleteMusic : addMusic }
                    <div className='AddContentMsg'>
                    <div>
                    { this.state.msg ? 
                    (<p className='Msg'>
                    {this.state.msg }</p>) : null }
                    </div>
                    </div>
                    {this.state.toogle ? items : addContentForm }
                </div>
            </article>
            </section>
        )
    }
}

manageContent.propTypes  = {
    addContent: propTypes.func.isRequired,
    getMusicItems: propTypes.func.isRequired,
    deleteContent: propTypes.func.isRequired,
    musicItems: propTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    id: state.auth.user._id,
    error: state.error,
    success : state.success,
    musicItems: state.music
})

export default connect(
mapStateToProps,
{addContent,
deleteContent,
getMusicItems}
)(manageContent)
