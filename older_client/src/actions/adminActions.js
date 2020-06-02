import axios from 'axios';
import { returnErrors }  from './errorActions'
import { returnSuccess } from './successAction'

import {
ADD_CONTENT_SUCCESS,
ADD_CONTENT_FAIL,
DELETE_CONTENT_SUCCESS,
DELETE_CONTENT_FAIL
} from './types';

export const addContent = (userId, title, author, style, parution_date, audio, image) => (dispatch, getState) => {
    const styles = style
    const formdata = new FormData()
    formdata.append('title', title)
    formdata.append('author', author)
    formdata.append('parution_date' ,parution_date)
    styles.forEach((style) => {
        formdata.append('style[]', style);
    });
    formdata.append('audio',  audio)
    formdata.append('image', image)

    axios.post(`/api/music/addMusicItems/${userId}`, formdata,tokenConfig(getState))
        .then(res => {
            dispatch(
                returnSuccess(res.data, res.status, 'ADD_CONTENT_SUCCESS'))
            dispatch({
                type: ADD_CONTENT_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch(
            returnErrors(err.response.data, err.response.status, 'ADD_CONTENT_FAIL'))
            dispatch({
                type: ADD_CONTENT_FAIL
            })
        })
}

export const deleteContent = (userId, musicId) => (dispatch, getState) => {

    axios.delete(`/api/music/deleteMusicItems/${userId}/${musicId}`, tokenConfig(getState))
        .then(res => {
            dispatch(
                returnSuccess(res.data, res.status, 'DELETE_CONTENT_SUCCESS')) 
            dispatch({
                type: DELETE_CONTENT_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch(
            returnErrors(err.response.data, err.response.status, 'DELETE_CONTENT_FAIL'))
            dispatch({
                type: DELETE_CONTENT_FAIL
            })
        })
}

export const tokenConfig = getState => {
    const token = getState().auth.token

    const config = {
        headers: {
            'Content-type': 'multipart/form-data'
        }
    }

    if(token) {
        config.headers['x-auth-token'] = token;
    }
    return config
}