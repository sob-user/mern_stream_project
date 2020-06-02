import { 
    PLAYER_LOADING,
    PLAYER_LOADED,
    PLAYER_ON_PLAY,
    PLAYER_ON_PAUSE,
    PLAYER_PLAY_NEXT,
    PLAYER_PLAY_PREVIOUS,
    PLAYER_ON_STOP,
    PLAYER_UNLOAD
    } from  '../actions/types';

    const initialState = {
        tracks: null,
        isLoading: false,
        isOnPlay: false,
        isOnPause: false,
        isOnStop: true,
        isOnNext: false,
        isOnPrevious: false
    };

    export default function(state = initialState, action) {
        switch(action.type) {
            case PLAYER_LOADING:
                return {
                    ...state,
                    isLoading: true
                }
            case PLAYER_LOADED:
                return {
                    ...state,
                    tracks: action.payload
                }
            case PLAYER_ON_PLAY:
                return {
                    ...state,
                    isOnPlay: true,
                    isOnStop: false,
                    isOnPause: false
                }
            case PLAYER_ON_PAUSE:
                return {
                    ...state,
                    isOnPause: true,
                    isOnPlay: false,
                }
            case PLAYER_PLAY_NEXT:
                return {
                    ...state,
                    isOnNext: true,
                    isOnPrevious: false
                }
            case PLAYER_PLAY_PREVIOUS:
                return {
                    ...state,
                    isOnPrevious: true,
                    isOnNext: false
                }
            case PLAYER_ON_STOP:
                return {
                    ...state,
                    isOnStop: true
                }
            case PLAYER_UNLOAD:
                return {
                    ...state,
                    tracks: null,
                    isLoading: false,
                    isOnPlay: false,
                    isOnPause: false,
                    isOnStop: true,
                    isOnNext: false,
                    isOnPrevious: false
                }
        default:
            return state;
        }
    }