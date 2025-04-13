import { RESET_USER_PASSWORD, RESET_USER_PASSWORD_SUCCESSFUL, RESET_USER_PASSWORD_API_FAILED } from './actionTypes';

const initialState = {
    forgetError: null, message: null, loading: false
}

const resetPwd = (state = initialState, action) => {
    switch (action.type) {
        case RESET_USER_PASSWORD:
            state = {
                ...state,
                user: null,
                loading: true,
                forgetError: null
            }
            break;
        case RESET_USER_PASSWORD_SUCCESSFUL:
            state = {
                ...state,
                loading: false,
                message: action.payload
            }
            break;
        case RESET_USER_PASSWORD_API_FAILED:
            state = {
                ...state,
                loading: false,
                forgetError: action.payload
            }
            break;
        default:
            state = { ...state };
            break;
    }
    return state;
}

export default resetPwd;