const claimReducer = (state={},action)=>{
    console.log("aaaaaaction",action)
    if(action.type === 'CLAIM_PERIOD_SUCCESS') {
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