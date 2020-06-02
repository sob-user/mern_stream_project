import axios  from 'axios'
import { 
GET_MUSIC_ITEMS, 
ITEMS_LOADING,
GET_MUSIC_ITEMS_FAIL 
} from '../actions/types'
import { returnErrors }  from './errorActions';

export const getMusicItems = () => (dispatch, getState) => {
    dispatch(setItemsLoading())
    axios.get('/api/music/getMusicItems', tokenConfig(getState))
        .then(res =>
        dispatch({
            type:  GET_MUSIC_ITEMS,
            payload: res.data
        }))
        .catch(err => {
            dispatch(
            returnErrors(err.response.data, err.response.status, 'GET_MUSIC_ITEMS_FAIL'))
            dispatch({
                type: GET_MUSIC_ITEMS_FAIL 
            })
        })
}

export const setItemsLoading = () => {
    return {
        type: ITEMS_LOADING
    }
}

export const tokenConfig = getState => {
    const token = getState().auth.token

    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }

    if(token) {
        config.headers['x-auth-token'] = token;
    }
    return config
}