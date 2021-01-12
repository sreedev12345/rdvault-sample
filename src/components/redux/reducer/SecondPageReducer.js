const secondPageReducer = (state=[],action)=>{
    console.log("grant-period",action,action.type)
    if(action.type === 'SUCCESS') {
        return {
            status : action.status,
            ...state,data : action.secondpage,
        }
    } else {
        return state;
    }
}

export default secondPageReducer;