import { createStore,applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import   rootreducer  from "../reducer/index";
let middleware = [thunkMiddleware];

const Store = createStore(rootreducer,{},applyMiddleware(...middleware));

export default Store;