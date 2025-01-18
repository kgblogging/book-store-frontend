import { combineReducers } from "redux";

import Auth from "./auth/reducer";
import Notification from "./notification/reducer";
import BookReducer from "../pages/allbook/reducer"



const rootReducer = combineReducers({
  Auth,
  Notification,
  BookReducer
});

export default rootReducer;
