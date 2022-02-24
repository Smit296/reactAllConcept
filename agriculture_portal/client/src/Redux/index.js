import { combineReducers } from "redux";
import ping from "./notification";
import user from "./userInfo";
import productList from "./productlist";
import error from "./formValidation";
import blogState from "./blogredux";
import bankState from "./bankloan";
const rootReducer = combineReducers({
  notify: ping,
  user: user,
  productList: productList,
  formError: error,
  blogState: blogState,
  bankState: bankState,
});

export default rootReducer;
