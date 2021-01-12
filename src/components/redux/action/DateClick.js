const dateClick = (data)=>dispatch=>{
    console.log("dispatch",data)
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