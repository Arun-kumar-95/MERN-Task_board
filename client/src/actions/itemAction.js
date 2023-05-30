import {
  NEW_ITEM_REQUEST,
  NEW_ITEM_SUCCESS,
  NEW_ITEM_FAIL,
  DELETE_ITEM_REQUEST,
  DELETE_ITEM_SUCCESS,
  DELETE_ITEM_FAIL,
  ITEM_COMPLETE_REQUEST,
  ITEM_COMPLETE_SUCCESS,
  ITEM_COMPLETE_FAIL,
  CLEAR_ERRORS,
  CLEAR_MESSAGE,
} from "../constants/itemConstants";

import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/app/v1",
});

export const addItemToList = (item, listId) => async (dispatch) => {
  try {
    dispatch({ type: NEW_ITEM_REQUEST });
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };

    const { data } = await API.post(
      `/list/add-item?list_id=${listId}`,
      { item },
      config
    );

    dispatch({ type: NEW_ITEM_SUCCESS, payload: data.newItem });
  } catch (error) {
    dispatch({
      type: NEW_ITEM_FAIL,
      payload: error.response.data.message,
    });
  }
};

// UPDATE ITEM
export const updateItemToList = (id, listId) => async (dispatch) => {
  try {
    dispatch({ type: ITEM_COMPLETE_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
      credentials: "include",
    };

    const { data } = await API.put(
      `/list/update-item/${id}`,
      {
        listId,
      },
      config
    );

    dispatch({ type: ITEM_COMPLETE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ITEM_COMPLETE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// DELETE ITEM
export const deleteItemFromList = (id, listId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_ITEM_REQUEST });
    const config = {
      withCredentials: true,
      credentials: "include",
    };

    const { data } = await API.delete(
      `/list/remove-item/?item_id=${id}&list_id=${listId}`,
      config
    );

    dispatch({ type: DELETE_ITEM_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DELETE_ITEM_FAIL,
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
