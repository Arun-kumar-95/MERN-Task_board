import {
  CREATE_LIST_REQUEST,
  CREATE_LIST_SUCCESS,
  CREATE_LIST_FAIL,
  DELETE_LIST_REQUEST,
  DELETE_LIST_SUCCESS,
  DELETE_LIST_FAIL,
  UPDATE_LIST_REQUEST,
  UPDATE_LIST_SUCCESS,
  CLEAR_ERRORS,
  CLEAR_MESSAGE,
  UPDATE_LIST_FAIL,
} from "../constants/listConstants";

export const listReducer = (state = { list: [] }, action) => {
  switch (action.type) {
    case CREATE_LIST_REQUEST:
    case DELETE_LIST_REQUEST:
    case UPDATE_LIST_REQUEST:
      return {
        loading: true,
      };
    case CREATE_LIST_SUCCESS:
    case DELETE_LIST_SUCCESS:
    case UPDATE_LIST_SUCCESS:
      return {
        loading: false,
        list: action.payload,
        message: action.payload.message,
      };

    case CREATE_LIST_FAIL:
    case DELETE_LIST_FAIL:
    case UPDATE_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    case CLEAR_MESSAGE:
      return {
        ...state,
        message: null,
      };
    default:
      return state;
  }
};
