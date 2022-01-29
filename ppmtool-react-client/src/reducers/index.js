import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import projectReducer from "./projectReducer";

export default combineReducers({
  //contains all reducers we are creating as we move forward...
  errors: errorReducer,
  project: projectReducer,
});
