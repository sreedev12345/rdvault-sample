const KEYWORD_PENDING = 'KEYWORD_PENDING';
const KEYWORD_SUCCESS = 'KEYWORD_SUCCESS'
export const keyword = (data)=>dispatch=>{
    dispatch({
        status : 'PENDING',
        type : KEYWORD_PENDING
    })
    return(
        dispatch({
            status : 'SUCCESS',
            type : KEYWORD_SUCCESS,
            data : data
        })
    )
}

const KeywordReducer = (state={},action)=>{
    if(action.type === KEYWORD_SUCCESS) {
        return Object.assign({},state,{
            status : action.status,
            data : action.data,
        })
    } else {
        return state;
    }
}

export default KeywordReducer;

