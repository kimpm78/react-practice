import { all, fork } from 'redux-saga/effects';
import axios from 'axios';
import { 
  LOG_IN_SUCCESS, LOG_OUT_SUCCESS, LOG_OUT_REQUEST, 
  LOG_IN_FAILURE, LOG_IN_REQUEST, LOG_OUT_FAILURE,
  SIGN_UP_FAILURE, SIGN_UP_REQUEST, SIGN_UP_SUCCESS,
} from '../reducers/user';

//제너레이터 안이라서 * 넣으면 안됨 (실제로 서버에 요청)
function logInAPI() {
  return axios.post('/api/login');
}

//결과 값을 받을 수 있다.
function* logIn(action) {
  try {
    // const result = yield call(logInAPI);
    yield delay(1000);
    yield put({
      type: LOG_IN_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: LOG_IN_FAILURE,
      error: err.response.data,
    });
  }
}

function logOutAPI() {
  return axios.post('/api/logout');
}

function* logOut() {
  try {
    // const result = yield call(logOutAPI); 
    yield delay(1000);
    yield put({
      type: LOG_OUT_SUCCESS,
      data: result.data, //결과 데이터 
    });
  } catch (err) {
    yield put({
      type: LOG_OUT_FAILURE,
      error: err.response.data,
    });
  }
}

function signUpAPI() {
  return axios.post('/api/signUp');
}

function* signUp() {
  try {
    // const result = yield call(signUpAPI); 
    yield delay(1000);
    yield put({
      type: SIGN_UP_SUCCESS,
    });
  } catch (err) {
    yield put({
      type: SIGN_UP_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchLogIn() { 
  yield takeLatest(LOG_IN_REQUEST, logIn); //while 문을 대체 할 수 있음
}

function* watchLogOut() {
  yield takeLatest(LOG_OUT_REQUEST,logOut);
}

function* watchSignUp() {
  yield takeLatest(SIGN_UP_REQUEST, signUp);
}

export default function* userSaga() {
  yield all([
    fork(watchLogIn),
    fork(watchLogOut),
    fork(watchSignUp),
  ])
}