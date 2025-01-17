import { combineReducers } from "redux";

import Auth from "./auth/reducer";
import Notification from "./notification/reducer";



const rootReducer = combineReducers({
  Auth,
  Notification,
});

export default rootReducer;
