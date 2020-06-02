import axios  from 'axios'
import { 
CONTACT_ADMIN_SUCCESS,
CONTACT_ADMIN_FAIL
} from '../actions/types'
import { returnErrors }  from './errorActions';
import { returnSuccess }  from './successAction';

export const contactAdmin = (userId, object, message) => (dispatch, getState) => {
    const body =  JSON.stringify({
        object: object,
        message: message
    })

    axios.post(`/api/contact/contactAdmin/${userId}`, body, tokenConfig(getState))
        .then(res => {
        dispatch(
            returnSuccess(null, 'mail has sent', 'CONTACT_ADMIN_SUCCESS'))
        dispatch({
            type:  CONTACT_ADMIN_SUCCESS,
            payload: res.data
        })})
        .catch(err => {
            dispatch(
            returnErrors(err.response.data, err.response.status, 'CONTACT_ADMIN_FAIL'))
            dispatch({
                type: CONTACT_ADMIN_FAIL 
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