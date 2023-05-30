import {
  GET_USER_LIST_REQUEST,
  GET_USER_LIST_SUCCESS,
  GET_USER_LIST_FAIL,
  CREATE_LIST_REQUEST,
  CREATE_LIST_SUCCESS,
  CREATE_LIST_FAIL,
  DELETE_LIST_REQUEST,
  DELETE_LIST_SUCCESS,
  DELETE_LIST_FAIL,
  UPDATE_LIST_REQUEST,
  UPDATE_LIST_SUCCESS,
  UPDATE_LIST_FAIL,
  CLEAR_ERRORS,
  CLEAR_MESSAGE,
} from "../constants/listConstants";

import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/app/v1",
});

// GET ALL USER LISTS

export const getAllUserList = () => async (dispatch) => {
  try {
    dispatch({ type: GET_USER_LIST_REQUEST });

    const config = {
      withCredentials: true,
    };

    const { data } = await API.get(`/list/all-lists`, config);

    dispatch({ type: GET_USER_LIST_SUCCESS, payload: data.lists });
  } catch (error) {
    dispatch({
      type: GET_USER_LIST_FAIL,
      payload: error.response.data.message,
    });
  }
};

// CREATE LIST
export const createNewList = (listname) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_LIST_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };

    const { data } = await API.post(`/list/new-list`, { listname }, config);
    dispatch({ type: CREATE_LIST_SUCCESS, payload: data.list });
  } catch (error) {
    dispatch({
      type: CREATE_LIST_FAIL,
      payload: error.response.data.message,
    });
  }
};

// REMOVE LIST
export const removeList = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_LIST_REQUEST });
    const config = {
      withCredentials: true,
    };

    const { data } = await API.delete(`/list/remove-list/${id}`, config);
    dispatch({ type: DELETE_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DELETE_LIST_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updateListItem = (oldLid, newLid, _id) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_LIST_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const { data } = await API.put(
      `/list/update-list/?lid=${oldLid}&drag_lid=${newLid}`,
      { _id },
      config
    );
 
    dispatch({ type: UPDATE_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: UPDATE_LIST_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

// Clearing Message
export const clearMessage = () => async (dispatch) => {
  dispatch({ type: CLEAR_MESSAGE });
};
