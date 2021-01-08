const secondPageAction = (data)=>dispatch=>{
    console.log("data---------------------",data)
    dispatch({
        status : "PENDING",
        type : "WAITING"
    })
    return(
        dispatch({
            status : "SUCCESS",
            type : "SUCCESS",
            secondpage : data
        })
    )
}

export { secondPageAction }