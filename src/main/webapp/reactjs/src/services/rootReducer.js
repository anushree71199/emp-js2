import { combineReducers } from "redux";
import userReducer from "./user/userReducer";
import authReducer from "./user/auth/authReducer";
import empReducer from "./emp/empReducer";

const rootReducer = combineReducers({
  user: userReducer,
  emp: empReducer,
  auth: authReducer,
});

export default rootReducer;
