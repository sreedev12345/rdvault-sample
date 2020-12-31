import { combineReducers } from "redux";


import companyReducer from "./CompanyReducer";
import claimReducer from "./ClaimReducer";
import grantPeriod from './GrantPeriod';


const rootreducer = combineReducers({
    companyReducer:companyReducer,
    claimReducer : claimReducer,
    grantPeriod : grantPeriod
})



export default rootreducer