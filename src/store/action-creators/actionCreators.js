import axios from "axios";

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

//actions
export const getToUsers = () => {
  return async (dispatch, store) => {
    //dispatch loading in reducer
    dispatch({
      type: GET_TO_USERS_START,
    });

    try {
      const response = await axios.get("http://localhost:8000/Users");

      //save data to reducer
      dispatch({
        type: GET_TO_USERS_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      //handeling error to reducer
      dispatch({
        type: GET_TO_USERS_ERROR,
        payload: error.message,
      });
    }
  };
};

export const deleteUser = (id) => {
  return async (dispatch, store) => {
    //dispatch loading in reducer
    dispatch({
      type: DELETE_USER_START,
    });

    try {
      const response = await axios.delete(`http://localhost:8000/Users/${id}`);

      //save data to reducer
      dispatch({
        type: DELETE_USER_SUCCESS,
        payload: response.data,
      });
      dispatch(getToUsers());
    } catch (error) {
      //handeling error to reducer
      dispatch({
        type: DELETE_USER_ERROR,
        payload: error.message,
      });
    }
  };
};

export const addUser = (data) => {
  return async (dispatch, store) => {
    //dispatch loading in reducer
    dispatch({
      type: ADD_USER_START,
    });

    try {
      const response = await axios.post("http://localhost:8000/Users/", data);

      //save data to reducer
      dispatch({
        type: ADD_USER_SUCCESS,
        payload: response.data,
      });
      dispatch(getToUsers());
    } catch (error) {
      //handeling error to reducer
      dispatch({
        type: ADD_USER_ERROR,
        payload: error.message,
      });
    }
  };
};

export const updateUser = (id, data) => {
  return async (dispatch, store) => {
    //dispatch loading in reducer
    dispatch({
      type: UPDATE_USER_START,
    });

    try {
      const response = await axios.put(
        `http://localhost:8000/Users/${id}`,
        data
      );

      //save data to reducer
      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: response.data,
      });
      dispatch(getToUsers());
    } catch (error) {
      //handeling error to reducer
      dispatch({
        type: UPDATE_USER_ERROR,
        payload: error.message,
      });
    }
  };
};
