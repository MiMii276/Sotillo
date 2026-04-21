import { call, put, takeEvery } from 'redux-saga/effects';
import { authLogin, fetchProfile } from '../api/auth';

import {
  USER_LOGIN,
  USER_LOGIN_COMPLETED,
  USER_LOGIN_ERROR,
  USER_LOGIN_REQUEST,
} from '../actions';

export function* userLoginAsync(action) {
  yield put({ type: USER_LOGIN_REQUEST });
  try {
    // Step 1: login and get token
    const response = yield call(authLogin, action.payload);
    const token = response.token;

    // Step 2: use token to fetch user profile
    const user = yield call(fetchProfile, token);

    // Step 3: save both token + user into Redux
    yield put({
      type: USER_LOGIN_COMPLETED,
      payload: { token, user },
    });

  } catch (error) {
    yield put({ type: USER_LOGIN_ERROR, payload: error.message });
  }
}

export function* userLogin() {
  yield takeEvery(USER_LOGIN, userLoginAsync);
}