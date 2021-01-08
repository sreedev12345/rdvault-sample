const keyword = (data)=>dispatch=>{
    console.log("data",data)
    dispatch({
        status : 'PENDING',
        type : 'KEYWORD_PENDING'
    })
    return(
        dispatch({
            status : 'SUCCESS',
            type : 'KEYWORD_SUCCESS',
            data : data
        })
    )
}

export { keyword }