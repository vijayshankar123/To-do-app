import { combineReducers } from "redux";
import alert from "./alertReducer";
import auth from "./authReducer";
import todo from "./todoReducer";
export default combineReducers({
  alert,
  auth,
  todo
});
