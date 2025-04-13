import { takeEvery, fork, put, all, call } from 'redux-saga/effects';

// Login Redux States
import { CHECK_LOGIN, LOGOUT_USER,VALIDATE_AUTH } from './actionTypes';
import { apiError, loginUserSuccessful, logoutUserSuccess } from './actions';

// AUTH related methods
import { postLogin,postLoginCheck } from '../../../helpers/backend_helper';
// import { getFirebaseBackend } from '../../../helpers/firebase_helper';

// //Initilize firebase
// const fireBaseBackend = getFirebaseBackend();

//If user is login then dispatch redux action's are directly from here.
function* loginUser({ payload: { user, history } }) {
    try {
        const response = yield call(postLogin, '/auth/login', { email: user.username, password: user.password });
        localStorage.setItem("authUser", JSON.stringify(response));
        yield put(loginUserSuccessful(response));
        console.log(response)
        console.log(response.user.is_recovery_requested)
        if(response.user.is_recovery_requested){         
            history.push('/reset-password');
        }else{
            history.push('/dashboard');
        }

        
    } catch (error) {
        yield put(apiError(error));
    }
}

function* checkUserAuth({ payload: { history } }) {
    try {
        const response = yield call(postLoginCheck, '/auth/validate-user');
        yield put(loginUserSuccessful(response));
        console.log(response)
        console.log(response.user.is_recovery_requested)

        
    } catch (error) {
        yield put(apiError(error));
        history.push('/login');
    }
}


function* logoutUser({ payload: { history } }) {
    try {
        localStorage.removeItem("authUser");
        history.push('/login');
    } catch (error) {
        yield put(apiError(error));
    }
}

export function* watchUserLogin() {
    yield takeEvery(CHECK_LOGIN, loginUser)
}

export function* watchUserLogout() {
    yield takeEvery(LOGOUT_USER, logoutUser)
}

export function* watchUserValidateAuth() {
    yield takeEvery(VALIDATE_AUTH, checkUserAuth)
}

function* loginSaga() {
    yield all([
        fork(watchUserLogin),
        fork(watchUserLogout),
        fork(watchUserValidateAuth),
    ]);
}

export default loginSaga;