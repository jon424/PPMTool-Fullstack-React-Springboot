import { combineReducers } from "redux";
import errorReducer from "./errorReducer";

export default combineReducers({
  //contains all reducers we are creating as we move forward...
  errors: errorReducer,
});
