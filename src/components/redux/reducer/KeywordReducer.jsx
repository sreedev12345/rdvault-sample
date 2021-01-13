const KeywordReducer = (state={},action)=>{
    if(action.type === 'KEYWORD_SUCCESS') {
        return Object.assign({},state,{
            status : action.status,
            data : action.data,
        })
    } else {
        return state;
    }
}

export default KeywordReducer;