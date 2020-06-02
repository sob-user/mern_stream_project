import { 
USER_LOADING,
USER_LOADED,
REGISTER_SUCCESS,
LOGIN_SUCCESS,
LOGOUT_SUCCESS,
AUTH_ERROR,
LOGIN_FAIL,
REGISTER_FAIL,
MODIFY_USERNAME_SUCCESS,
MODIFY_USERNAME_FAIL,
MODIFY_MAIL_CONTACT_SUCCESS,
MODIFY_MAIL_CONTACT_FAIL,
MODIFY_PASSWORD_SUCCESS,
MODIFY_PASSWORD_FAIL,
IS_ADMIN,
NOT_ADMIN,
} from  '../actions/types';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthentificated: null,
    isAdmin: null,
    isLoading: false,
    user: null
};


export default function(state = initialState, action) {
    switch(action.type) {
        case USER_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case USER_LOADED:
            return {
                ...state,
                isAuthentificated: true,
                isLoading: false,
                user: action.payload
            }
        case IS_ADMIN:
            return {
                ...state,
                isAuthentificated: true,
                isLoading: false,
                isAdmin: true
            }
        case REGISTER_SUCCESS:
            return {
                ...state,
                isAuthentificated: false,
                isLoading: false
            }
        case LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                ...action.payload,
                isAuthentificated: true,
                isLoading: false,
                user: action.payload
            }
        case MODIFY_USERNAME_SUCCESS:
        case MODIFY_MAIL_CONTACT_SUCCESS:
        case MODIFY_PASSWORD_SUCCESS:
            return {
                ...state,
                ...action.payload
            }
        case LOGOUT_SUCCESS:
            localStorage.removeItem('token')
            window.location = '/'
            return {
                ...state,
                token: null,
                user: null,
                isAuthentificated: false,
                isLoading: false,
                isAdmin: null
            }
        case AUTH_ERROR:
        case NOT_ADMIN:
        case LOGIN_FAIL:
        case REGISTER_FAIL:
        case MODIFY_USERNAME_FAIL:
        case MODIFY_MAIL_CONTACT_FAIL:
        case MODIFY_PASSWORD_FAIL:
    default:
        return state;
    }
}