const WAITING = 'WAITING';
const RECEIVED = 'RECEIVED'
export const dateClick = (data)=>dispatch=>{
    dispatch({
        status : "PENDING",
        type : WAITING
    })
    return(
        dispatch({
            status : "SUCCESS",
            type : RECEIVED,
            data : data
        })
    )
}

const dateClickReducer = (state={},action)=>{
    if(action.type === RECEIVED) {
        return (
            Object.assign({},{
                status : "SUCCESS",
                data : action.data
            })
        )
    } else {
        return state;
    }
}

export default dateClickReducer;

