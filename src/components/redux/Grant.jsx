const GRANT_PENDING = 'GRANT_PENDING';
const GRANT_SUCCESS = 'GRANT_SUCCESS';

export const grant = (yes,data)=>dispatch=>{
    dispatch({
        status : 'PENDING',
        type : GRANT_PENDING
    })
    return(
        dispatch({
            status : 'SUCCESS',
            type : GRANT_SUCCESS,
            data : data,
            yes:yes
        })
    )
}

const grantPeriod = (state={},action)=>{
    if(action.type === GRANT_SUCCESS) {
        return Object.assign({},state,{
            status : action.status,
            data : action.data,
            yes:action.yes
        })
    } else {
        return state;
    }
}

export default grantPeriod;

