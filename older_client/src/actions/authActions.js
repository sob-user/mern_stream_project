import axios from 'axios';
import { returnErrors }  from './errorActions';
import { returnSuccess } from './successAction'

import {
USER_LOADING,
USER_LOADED,
AUTH_ERROR,
REGISTER_SUCCESS,
REGISTER_FAIL,
LOGIN_SUCCESS,
LOGIN_FAIL,
LOGOUT_SUCCESS,
IS_ADMIN
} from './types';


export const loadUserAccount  = () => (dispatch, getState) => {
    dispatch({ type: USER_LOADING });

    axios.get('/api/user/getUserData', tokenConfig(getState))
        .then(res => { 
            dispatch({
            type: USER_LOADED,
            payload: res.data
        })
        const status = res.data.status
        if(status === true) {
            dispatch({
                type: IS_ADMIN
            })
        }
        })
        .catch(err => {
            dispatch(
            returnErrors(err.response.data, err.response.status))
            dispatch({
                type: AUTH_ERROR
            })
        })
};


export const registerNewUser = ({ username, email, password }) => dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ username, email, password })

    axios.post('/api/user/register', body, config)
        .then(res => {
            dispatch(
                returnSuccess(res.data, res.status, 'REGISTER_SUCCESS'))
            dispatch ({
            type: REGISTER_SUCCESS,
            payload: res.data
        })
    })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'))
            dispatch({
                type: REGISTER_FAIL
            })
        })
};


export const loginUser  = ({ email, password }) => dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ email, password })

    axios.post('/api/user/login', body,  config)
        .then(res => dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'))
            dispatch({
                type: LOGIN_FAIL
            })
        })
};


export const logoutUser = () => {
    return {
        type: LOGOUT_SUCCESS
    }
};

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