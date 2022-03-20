import { all, fork } from 'redux-saga/effects'; //Saga의 이펙트

import postSaga from './post';
import userSaga from './user';

export default function* rootSaga() {
  yield all([
    fork(postSaga), //call 동기 함수호출 //fork 비동기 함수호출
    fork(userSaga),
  ]);
}
