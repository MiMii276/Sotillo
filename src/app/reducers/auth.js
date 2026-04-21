import {
  USER_LOGIN,
  USER_LOGIN_COMPLETED,
  USER_LOGIN_ERROR,
  USER_LOGIN_REQUEST,
  USER_LOGIN_RESET,
} from '../actions';

const INITIAL_STATE = {
  data: null,
  token: null,       // ADD THIS
  isLoading: false,
  isError: false,
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return {
        ...state,
        data: null,
        token: null,
        isLoading: true,
        isError: false,
      };

    case USER_LOGIN_COMPLETED:
      return {
        ...state,
        data: action.payload.user,     // user profile data
        token: action.payload.token,   // JWT token
        isLoading: false,
        isError: false,
      };

    case USER_LOGIN_ERROR:
      return {
        data: null,
        token: null,
        isLoading: false,
        isError: true,
      };

    case USER_LOGIN_RESET:
      return INITIAL_STATE;

    default:
      return state;
  }
}

export const userLogin = payload => ({
  type: USER_LOGIN,
  payload,
});

export const resetLogin = () => ({
  type: USER_LOGIN_RESET,
});