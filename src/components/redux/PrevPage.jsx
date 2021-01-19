const PREVIOUS_PAGE_PENDING = 'PREVIOUS_PAGE_PENDING';
const PREVIOUS_PAGE_SUCCESS = 'PREVIOUS_PAGE_SUCCESS';
export const prevPage = (data)=>dispatch=>{
    dispatch({
        status : 'PENDING',
        type : PREVIOUS_PAGE_PENDING
    })
    return(
        dispatch({
            status : 'SUCCESS',
            type : PREVIOUS_PAGE_SUCCESS,
            data : data
        })
    )
}



const prevPageReducer = (state={},action)=>{
    if(action.type === PREVIOUS_PAGE_SUCCESS) {
        return Object.assign({},state,{
            status : action.status,
            data : action.data
        })
    } else {
        return state;
    }
}

export default prevPageReducer;