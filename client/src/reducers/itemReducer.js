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

export const itemReducer = (state = { item: {} }, action) => {
  switch (action.type) {
    case NEW_ITEM_REQUEST:
    case DELETE_ITEM_REQUEST:
    case ITEM_COMPLETE_REQUEST:
      return {
        loading: true,
      };

    case NEW_ITEM_SUCCESS:
    case DELETE_ITEM_SUCCESS:
    case ITEM_COMPLETE_SUCCESS:
      return {
        loading: false,
        item: action.payload,
        message: action.payload.message,
      };

    case NEW_ITEM_FAIL:
    case DELETE_ITEM_FAIL:
    case ITEM_COMPLETE_FAIL:
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
