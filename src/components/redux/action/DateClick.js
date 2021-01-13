const dateClick = (data)=>dispatch=>{
    dispatch({
        status : "PENDING",
        type : "WAITING"
    })
    return(
        dispatch({
            status : "SUCCESS",
            type : "RECEIVED",
            data : data
        })
    )
}

export { dateClick }