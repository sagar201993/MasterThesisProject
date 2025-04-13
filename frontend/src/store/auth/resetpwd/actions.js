import { RESET_USER_PASSWORD, RESET_USER_PASSWORD_SUCCESSFUL, RESET_USER_PASSWORD_API_FAILED } from './actionTypes';

export const resetPwdUser = (user, history) => {
  
    return {
        type: RESET_USER_PASSWORD,
        payload: { user, history }
    }
}

export const resetPwdUserSuccessful = (message) => {
    return {
        type: RESET_USER_PASSWORD_SUCCESSFUL,
        payload: message
    }
}

export const userResetPasswordError = (error) => {
    return {
        type: RESET_USER_PASSWORD_API_FAILED,
        payload: error
    }
}