const secondPageReducer = (state=[],action)=>{
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