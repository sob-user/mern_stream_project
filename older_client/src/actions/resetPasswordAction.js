import axios  from 'axios'
import { 
RESET_PASSWORD_SUCCESS,
RESET_PASSWORD_FAIL
} from '../actions/types'
import { returnErrors }  from './errorActions';
import { returnSuccess }  from './successAction';

export const resetPassword = (username, email) => (dispatch, getState) => {
    const body =  JSON.stringify({ username, email })

    axios.post('/api/reset', body, tokenConfig(getState))
        .then(res => {
        dispatch(
            returnSuccess(res.data, res.status, 'RESET_PASSWORD_SUCCESS'))
        dispatch({
            type:  RESET_PASSWORD_SUCCESS,
            payload: res.data
        })})
        .catch(err => {
            dispatch(
            returnErrors(err.response.data, err.response.status, 'RESET_PASSWORD_FAIL'))
            dispatch({
                type: RESET_PASSWORD_FAIL 
            })
        })
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