import { combineReducers } from 'redux';
import errorReducer  from './errorReducer'
import authReducer from './authReducer';
import musicReducer from './musicReducer'
import favoriteReducer from './favoriteReducer'
import successRedducer from './successReducer'
import  playerReducer from  './playerReducer'

export default combineReducers({
    auth: authReducer,
    music: musicReducer,
    favoriteList: favoriteReducer,
    error: errorReducer,
    success: successRedducer,
    player:  playerReducer
})