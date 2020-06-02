import {
GET_FAVORITE_MUSIC_LIST_LOADED,
GET_FAVORITE_MUSIC_LIST_SUCCESS,
GET_FAVORITE_MUSIC_LIST_FAIL,
LOGOUT_SUCCESS
} from '../actions/types'
    
const initialState = {
    favoriteList: [],
    loading: false
}
    
export default function(state = initialState, action) {
    switch(action.type) {
        case GET_FAVORITE_MUSIC_LIST_SUCCESS:
            return {
                ...state,
                favoriteList: action.payload,
                loading:false
            }
        case GET_FAVORITE_MUSIC_LIST_LOADED:
            return {
                ...state,
                loading: true
            }
        case LOGOUT_SUCCESS:
            return {
                ...state,
                favoriteList: [],
                loading: false
            }
        case GET_FAVORITE_MUSIC_LIST_FAIL:
        default:
            return state
    }
}