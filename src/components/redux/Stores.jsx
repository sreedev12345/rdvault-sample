import { combineReducers } from "redux";
import { createStore,applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import claimReducer from './ClaimPeriod';
import companyReducer from './CompanyDetails';
import dateClickReducer from './Date';
import grantPeriod from './Grant';
import KeywordReducer from './KeyWord';
import prevPageReducer from './PrevPage';
import secondPageReducer from './SecondPage';

let middleware = [thunkMiddleware];

const rootreducer = combineReducers({
    claimReducer : claimReducer,
    companyReducer : companyReducer,
    dateClickReducer : dateClickReducer,
    grantPeriod : grantPeriod,
    KeywordReducer : KeywordReducer,
    prevPageReducer : prevPageReducer,
    secondPageReducer : secondPageReducer
})

const Stores = createStore(rootreducer,{},applyMiddleware(...middleware));

export default Stores;