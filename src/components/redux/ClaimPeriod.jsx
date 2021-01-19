const CLAIM_PERIOD_SUCCESS = 'CLAIM_PERIOD_SUCCESS'
export const claimPeriod = (data,startdate,enddate)=>dispatch=>{
    dispatch({
        status : 'PENDING',
        type : 'CLAIM_PERIOD_REQUEST'
    })
    return(
        dispatch({
            status  : 'SUCCESS',
            type : CLAIM_PERIOD_SUCCESS,
            claimdata : data,
            startdate : startdate,
            enddate : enddate
        })
    )
}


const claimReducer = (state = {}, action) => {
    if(action.type === CLAIM_PERIOD_SUCCESS) {
        return Object.assign({},state,{
            status : action.status,
            claimdata : action.claimdata,
            enddate : action.enddate,
            startdate : action.startdate
        })
    } else {
        return state;
    }
}

export default claimReducer;





