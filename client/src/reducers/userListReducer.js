import {
  GET_USER_LIST_REQUEST,
  GET_USER_LIST_SUCCESS,
  GET_USER_LIST_FAIL,
  CLEAR_ERRORS,
} from "../constants/listConstants";

export const userListReducer = (state = { userList: [] }, action) => {
  switch (action.type) {
    case GET_USER_LIST_REQUEST:
      return {
        loading: true,
      };
    case GET_USER_LIST_SUCCESS:
      return {
        loading: false,
        lists: action.payload,
      };

    case GET_USER_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
