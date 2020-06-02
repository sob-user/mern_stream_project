import { returnSuccess } from './successAction'
import {
PLAYER_LOADING,
PLAYER_LOADED,
PLAYER_ON_PLAY,
PLAYER_ON_PAUSE,
PLAYER_ON_STOP,
PLAYER_PLAY_NEXT,
PLAYER_PLAY_PREVIOUS,
PLAYER_UNLOAD
} from './types';

export const loadingPlayer = () => {
    return {
        type: PLAYER_LOADING
    }
};

export const playerLoaded = (music) => (dispatch) => {
    dispatch(
        returnSuccess(null, 'readyToPlay', 'PLAYER_LOADED'))
    dispatch({
        type: PLAYER_LOADED,
        payload: music
    })
}

export const playerPlay = () => (dispatch) => {
    dispatch(
        returnSuccess(null, 'onPlay', 'PLAYER_ON_PLAY'))
    dispatch({
        type: PLAYER_ON_PLAY
    })
}

export const playerPause = () => (dispatch) => {
    dispatch(
        returnSuccess(null, 'onPause', 'PLAYER_ON_PAUSE'))
    dispatch({
        type: PLAYER_ON_PAUSE
    })
}

export const playerNext = () => (dispatch) => {
    dispatch(
        returnSuccess(null, 'onNext', 'PLAYER_PLAY_NEXT'))
    dispatch({
        type: PLAYER_PLAY_NEXT
    })
}

export const playerPrevious = () => (dispatch) => {
    dispatch(
        returnSuccess(null, 'onPrevious', 'PLAYER_PLAY_PREVIOUS'))
    dispatch({
        type: PLAYER_PLAY_PREVIOUS
    })
}

export const playerStop = () => (dispatch) => {
    dispatch(
        returnSuccess(null, 'onStop', 'PLAYER_ON_STOP'))
    dispatch({
        type: PLAYER_ON_STOP
    })
}

export const unloadPlayer = () => {
    return {
        type: PLAYER_UNLOAD
    }
};