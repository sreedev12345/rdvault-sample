const secondPageReducer = (state={},action)=>{
    console.log("grant-period",action,action.type)
    if(action.type === 'SUCCESS') {
        return Object.assign({},state,{
            status : action.status,
            data : action.secondpage,
        })
    } else {
        return state;
    }
}

export default secondPageReducer;