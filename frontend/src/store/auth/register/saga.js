import { takeEvery, fork, put, all, call } from 'redux-saga/effects';

//Account Redux states
import { REGISTER_USER } from './actionTypes';
import { registerUserSuccessful, registerUserFailed } from './actions';

//AUTH related methods
import { postRegister } from '../../../helpers/backend_helper';
// import { getFirebaseBackend } from '../../../helpers/firebase_helper';

// // initialize firebase Auth
// const fireBaseBackend = getFirebaseBackend();

// Is user register successfull then direct plot user in redux.
function* registerUser({ payload: { user } }) {
    try {
            const response = yield call(postRegister, '/auth/register', user);
            console.log("registerUser response");
            console.log(response);
            yield put(registerUserSuccessful(response));
    } catch (error) {
        console.log("registerUser error");
        console.log(error);
        yield put(registerUserFailed(error));
    }
}

export function* watchUserRegister() {
    yield takeEvery(REGISTER_USER, registerUser)
}

function* accountSaga() {
    yield all([fork(watchUserRegister)]);
}

export default accountSaga;