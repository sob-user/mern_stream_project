import {
    GET_SUCCESS,
    CLEAR_SUCCESSS 
    } from '../actions/types';
    
    const initialState = {
        msg: {},
        status: null,
        id: null
    }
    
    export default function(state = initialState, action) {
        switch(action.type) {
            case GET_SUCCESS:
                return {
                    msg: action.payload.msg,
                    status: action.payload.status,
                    id: action.payload.id
                }
            case CLEAR_SUCCESSS:
                return {
                    msg: {},
                    status: null,
                    id: null
                }
            default:
                return state;
        }
    }