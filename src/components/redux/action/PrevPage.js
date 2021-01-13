const prevPage = (data)=>dispatch=>{
    dispatch({
        status : 'PENDING',
        type : 'PREVIOUS_PAGE_PENDING'
    })
    return(
        dispatch({
            status : 'SUCCESS',
            type : 'PREVIOUS_PAGE_SUCCESS',
            data : data
        })
    )
}

export { prevPage }