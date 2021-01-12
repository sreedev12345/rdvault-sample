import { combineReducers } from "redux";


import companyReducer from "./CompanyReducer";
import claimReducer from "./ClaimReducer";
import grantPeriod from './GrantPeriod';
import KeywordReducer from './KeywordReducer';
import secondPageReducer from './SecondPageReducer';
import dateClickReducer from './DateClickReducer'


const rootreducer = combineReducers({
    companyReducer:companyReducer,
    claimReducer : claimReducer,
    grantPeriod : grantPeriod,
    KeywordReducer : KeywordReducer,
    secondPageReducer : secondPageReducer,
    dateClickReducer : dateClickReducer
})



export default rootreducer