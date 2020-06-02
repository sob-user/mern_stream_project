import {
GET_MUSIC_ITEMS,
ITEMS_LOADING,
GET_MUSIC_ITEMS_FAIL,
LOGOUT_SUCCESS
} from '../actions/types'

const initialState = {
    items: [],
    loading: false
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_MUSIC_ITEMS:
            return {
                ...state,
                items: action.payload,
                loading:false
            }
        case ITEMS_LOADING:
            return {
                ...state,
                loading: true
            }
        case LOGOUT_SUCCESS:
            return {
                ...state,
                items: [],
                loading: false
            }
        case GET_MUSIC_ITEMS_FAIL:
        default:
            return state
    }
}