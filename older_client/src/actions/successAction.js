import { GET_SUCCESS, CLEAR_SUCCESSS } from './types';

export const returnSuccess = (msg, status, id = null) => {
    return {
        type: GET_SUCCESS,
        payload: { msg, status, id }
    }
};

export const clearSuccess = () => {
    return {
        type: CLEAR_SUCCESSS
    }
};