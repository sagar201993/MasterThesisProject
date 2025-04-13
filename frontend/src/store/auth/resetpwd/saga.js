import { takeEvery, fork, put, all, call } from 'redux-saga/effects';

// Login Redux States
import { RESET_USER_PASSWORD } from './actionTypes';
import { resetPwdUserSuccessful, userResetPasswordError } from './actions';

// AUTH related methods
import { postResetPwd } from '../../../helpers/backend_helper';


//If user is login then dispatch redux action's are directly from here.
function* resetUserPwd({ payload: { user, history } }) {
  try {
    console.log(user)
    const response = yield call(postResetPwd, '/auth/reset-pwd', { password: user.password });
    if (response) {
      yield put(
        resetPwdUserSuccessful(
          "Password Reseted"
        )
      );
      history.push('/login');
    }

  } catch (error) {
    yield put(userResetPasswordError(error));
  }
}

export function* watchUserResetPassword() {
  yield takeEvery(RESET_USER_PASSWORD, resetUserPwd)
}

function* resetPwdSaga() {
  yield all([fork(watchUserResetPassword)]);
}

export default resetPwdSaga;