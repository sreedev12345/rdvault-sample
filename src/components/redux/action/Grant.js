const grant = (yes,data)=>dispatch=>{
    console.log("yexs",yes,data)
    dispatch({
        status : 'PENDING',
        type : 'GRANT_PENDING'
    })
    return(
        dispatch({
            status : 'SUCCESS',
            type : 'GRANT_SUCCESS',
            data : data,
            yes:yes
        })
    )
}

export { grant }