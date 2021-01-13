const claimPeriod = (data,startdate,enddate)=>dispatch=>{
    dispatch({
        status : 'PENDING',
        type : 'CLAIM_PERIOD_REQUEST'
    })
    return(
        dispatch({
            status  : 'SUCCESS',
            type : 'CLAIM_PERIOD_SUCCESS',
            claimdata : data,
            startdate : startdate,
            enddate : enddate
        })
    )
}

export {claimPeriod}