const claimPeriod = (data)=>dispatch=>{
    console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaa",data)
    dispatch({
        status : 'PENDING',
        type : 'CLAIM_PERIOD_REQUEST'
    })
    return(
        dispatch({
            status  : 'SUCCESS',
            type : 'CLAIM_PERIOD_SUCCESS',
            claimdata : data
        })
    )
}

export {claimPeriod}