import axios from 'axios';
import { returnErrors }  from './errorActions';
import { returnSuccess } from './successAction'

import {
MODIFY_USERNAME_SUCCESS,
MODIFY_USERNAME_FAIL,
MODIFY_MAIL_CONTACT_SUCCESS,
MODIFY_MAIL_CONTACT_FAIL,
MODIFY_PASSWORD_SUCCESS,
MODIFY_PASSWORD_FAIL,
DELETE_USER_ACCOUNT_SUCCESS,
DELETE_USER_ACCOUNT_FAIL,
ADD_TO_FAVORITE_LIST_SUCCESS,
ADD_TO_FAVORITE_LIST_FAIL,
DELETE_TO_FAVORITE_LIST_SUCCESS,
DELETE_TO_FAVORITE_LIST_FAIL
} from './types';

export const modifyUsername = (userId, username) => (dispatch, getState) => {
    const body = JSON.stringify({ username })

    axios.put(`/api/user/updateUsername/${userId}`, body, tokenConfig(getState))
        .then(res => {
            dispatch(
                returnSuccess(res.data, res.status, 'MODIFY_USERNAME_SUCCESS'))
            dispatch({
                type: MODIFY_USERNAME_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch(
            returnErrors(err.response.data, err.response.status, 'MODIFY_USERNAME_FAIL'))
            dispatch({
                type: MODIFY_USERNAME_FAIL
            })
        })
}

export const modifyEmail = (userId, email) => (dispatch, getState) => {
    const body = JSON.stringify({ email })

    axios.put(`/api/user/updateMailContact/${userId}`, body, tokenConfig(getState))
    .then(res => {
        dispatch(
            returnSuccess(res.data, res.status, 'MODIFY_MAIL_CONTACT_SUCCESS'))
        dispatch({
            type: MODIFY_MAIL_CONTACT_SUCCESS,
            payload: res.data
        })
    })
        .catch(err => {
            dispatch(
            returnErrors(err.response.data, err.response.status, 'MODIFY_MAIL_CONTACT_FAIL'))
            dispatch({
                type: MODIFY_MAIL_CONTACT_FAIL
            })
        })
}

export const modifyPassword = (userId, currentPassword, password) => (dispatch, getState) => {
    const body = JSON.stringify({ currentPassword, password })

    axios.put(`/api/user/updatePwd/${userId}`, body, tokenConfig(getState))
    .then(res => {
        dispatch(
            returnSuccess(res.data, res.status, 'MODIFY_PASSWORD_SUCCESS'))
        dispatch({
            type: MODIFY_PASSWORD_SUCCESS,
            payload: res.data
        })
    })
        .catch(err => {
            dispatch(
            returnErrors(err.response.data, err.response.status, 'MODIFY_PASSWORD_FAIL'))
            dispatch({
                type: MODIFY_PASSWORD_FAIL
            })
        })
}

export const deleteUserAccount = (userId, password) => (dispatch, getState) => {
    const body = JSON.stringify({ password })
    axios.delete(`/api/user/deleteAccount/${userId}`, body, tokenConfig(getState))
        .then(res =>
        dispatch({
            type:  DELETE_USER_ACCOUNT_SUCCESS,
            payload: res.data
        }))
        .catch(err => {
            dispatch(
            returnErrors(err.response.data, err.response.status, 'DELETE_USER_ACCOUNT_FAIL'))
            dispatch({
                type: DELETE_USER_ACCOUNT_FAIL
            })
        })
}

export const addToFavorite = (userId, musicId) => (dispatch, getState) => {

    axios.post(`/api/user/addToFavoriteList/${userId}/${musicId}`, null, tokenConfig(getState))
    .then(res => {
        dispatch(
            returnSuccess(res.data, res.status, 'ADD_TO_FAVORITE_LIST_SUCCESS'))
        dispatch({
            type: ADD_TO_FAVORITE_LIST_SUCCESS,
            payload: res.data
        })
    })
        .catch(err => {
            dispatch(
            returnErrors(err.response.data, err.response.status, 'ADD_TO_FAVORITE_LIST_FAIL'))
            dispatch({
                type: ADD_TO_FAVORITE_LIST_FAIL
            })
        })
}

export const deleteToFavorite = (userId, musicId) => (dispatch, getState) => {

    axios.post(`/api/user/removedToFavoriteList/${userId}/${musicId}`, null, tokenConfig(getState))
    .then(res => {
        dispatch(
            returnSuccess(res.data, res.status, 'DELETE_TO_FAVORITE_LIST_SUCCESS'))
        dispatch({
            type: DELETE_TO_FAVORITE_LIST_SUCCESS,
            payload: res.data
        })
    })
        .catch(err => {
            dispatch(
            returnErrors(err.response.data, err.response.status, 'DELETE_TO_FAVORITE_LIST_FAIL'))
            dispatch({
                type: DELETE_TO_FAVORITE_LIST_FAIL
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