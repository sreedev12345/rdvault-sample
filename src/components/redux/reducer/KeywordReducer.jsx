const KeywordReducer = (state={},action)=>{
    console.log("grant-period",action,action.type)
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