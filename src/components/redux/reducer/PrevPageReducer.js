const prevPageReducer = (state={},action)=>{
    if(action.type === 'PREVIOUS_PAGE_SUCCESS') {
        return Object.assign({},state,{
            status : action.status,
            data : action.data
        })
    } else {
        return state;
    }
}

export default prevPageReducer;