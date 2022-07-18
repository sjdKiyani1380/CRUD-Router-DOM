import { combineReducers } from "redux";

import {
  GET_TO_USERS_START,
  GET_TO_USERS_SUCCESS,
  GET_TO_USERS_ERROR,
  DELETE_USER_ERROR,
  DELETE_USER_SUCCESS,
  DELETE_USER_START,
  ADD_USER_START,
  ADD_USER_SUCCESS,
  ADD_USER_ERROR,
  UPDATE_USER_START,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
} from "../action-types/types";

//initional state
const initState = { loading: false, users: [], error: null };

//reducer for get to users
const usersReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_TO_USERS_START:
    case DELETE_USER_START:
    case ADD_USER_START:
    case UPDATE_USER_START:
      return { loading: true, users: [], error: null };
    case GET_TO_USERS_SUCCESS:
      return { loading: false, users: action.payload, error: null };
    case DELETE_USER_SUCCESS:
    case ADD_USER_SUCCESS:
    case UPDATE_USER_SUCCESS:
      return { ...state, loading: false };
    case GET_TO_USERS_ERROR:
    case DELETE_USER_ERROR:
    case ADD_USER_ERROR:
    case UPDATE_USER_ERROR:
      return { loading: false, users: [], error: action.payload };
    default:
      return state;
  }
};

export default combineReducers({
  users: usersReducer,
});
