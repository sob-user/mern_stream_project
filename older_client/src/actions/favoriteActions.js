import axios from 'axios'
import { returnErrors } from './errorActions'
import { returnSuccess } from './successAction'
import {
GET_FAVORITE_MUSIC_LIST_LOADED,
GET_FAVORITE_MUSIC_LIST_SUCCESS,
GET_FAVORITE_MUSIC_LIST_FAIL,
ADD_TO_FAVORITE_LIST_SUCCESS,
ADD_TO_FAVORITE_LIST_FAIL,
DELETE_TO_FAVORITE_LIST_SUCCESS,
DELETE_TO_FAVORITE_LIST_FAIL
} from './types'

export const getUserFavoriteList = (userId) => (dispatch, getState) => {
    dispatch(setFavoriteLoading())
    axios.get(`/api/user/getUserFavoriteList/${userId}`, tokenConfig(getState))
        .then(res =>
        dispatch({
            type:  GET_FAVORITE_MUSIC_LIST_SUCCESS,
            payload: res.data
        }))
        .catch(err => {
            dispatch(
            returnErrors(err.response.data, err.response.status, 'GET_FAVORITE_MUSIC_LIST_FAIL'))
            dispatch({
                type: GET_FAVORITE_MUSIC_LIST_FAIL 
            })
        })
}

export const setFavoriteLoading = () => {
    return {
        type: GET_FAVORITE_MUSIC_LIST_LOADED
    }
}

export const addToUserFavoriteList = (userId, musicId) => (dispatch, getState) => {
    axios.post(`/api/user/addToFavoriteList/${userId}/${musicId}`, tokenConfig(getState))
        .then(res => {
        dispatch(
            returnSuccess(null, 'add to favorite', 'ADD_TO_FAVORITE_LIST_SUCCESS'))
        dispatch({
            type:  ADD_TO_FAVORITE_LIST_SUCCESS,
            payload: res.data
        })})
        .catch(err => {
            dispatch(
            returnErrors(err.response.data, err.response.status, 'ADD_TO_FAVORITE_LIST_FAIL'))
            dispatch({
                type: ADD_TO_FAVORITE_LIST_FAIL
            })
        })
}

export const deleteToUserFavoriteList = (userId, musicId) => (dispatch, getState) => {
    axios.post(`/api/user/removedToFavoriteList/${userId}/${musicId}`, tokenConfig(getState))
        .then(res => {
        dispatch(
            returnSuccess(null, 'delete to favorite', 'DELETE_TO_FAVORITE_LIST_SUCCESS'))
        dispatch({
            type:  DELETE_TO_FAVORITE_LIST_SUCCESS,
            payload: res.data
        })})
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