import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import { userReducer } from "../reducers/userReducer";
import { userListReducer } from "../reducers/userListReducer";
import { listReducer } from "../reducers/listReducer";
import { itemReducer } from "../reducers/itemReducer";

const middleware = [thunk];

let initialState = {
  
};

const reducer = combineReducers({
  user: userReducer,
  list: listReducer,
  item: itemReducer,
  userList: userListReducer,
});

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
