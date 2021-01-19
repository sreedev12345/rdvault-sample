const WAITING = 'WAITING';
const SUCCESS = 'SUCCESS'
export const secondPageAction = (data)=>dispatch=>{
    console.log("data---------------------",data)
    dispatch({
        status : "PENDING",
        type : WAITING
    })
    return(
        dispatch({
            status : "SUCCESS",
            type : SUCCESS,
            secondpage : data
        })
    )
}

const secondPageReducer = (state=[],action)=>{
    if(action.type === SUCCESS) {
        return {
            status : action.status,
            ...state,data : action.secondpage,
        }
    } else {
        return state;
    }
}

export default secondPageReducer;

